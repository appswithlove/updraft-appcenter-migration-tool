import axios from 'axios';
import { EnvironmentVariables, readEnviromentConfigVariable } from '../config';
import { UpdraftAppDetails } from './interfaces/updraft/app.interface';
import { createReadStream } from 'fs';
import FormData from "form-data";
import { appcenterApi} from "./appcenterApi";
import {AppRelease} from "./interfaces/appcenter/app-release.interface";
import { readdirSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import {AppCenterApp} from "./interfaces/appcenter/app.interface";
import { getSingleAppReleaseFromAppCenterApp } from "./index";

export const UPDRAFT_API_HOSTNAME = readEnviromentConfigVariable(EnvironmentVariables.UPDRAFT_API_HOSTNAME);
export const UPDRAFT_AUTHORIZATION_TOKEN = readEnviromentConfigVariable(EnvironmentVariables.UPDRAFT_AUTHORIZATION_TOKEN);

export const updraftApi = axios.create({
    baseURL: UPDRAFT_API_HOSTNAME,
    headers: {
        'Content-Type': 'application/json',
        'X-API-Token': UPDRAFT_AUTHORIZATION_TOKEN,
    },
});

export const getAllUpdraftApps = async (): Promise<UpdraftAppDetails[]> => {
    const response = await updraftApi.get(
        '/api/applications',
        {
            headers: {
                'Authorization': 'Token ' + UPDRAFT_AUTHORIZATION_TOKEN,
            },
        }
    );

    return response.data;
};

export const uploadAppReleaseToUpdraft = async (appKey: string, apiKey: string, filePath: string, fileExtension: string) => {
    const api = axios.create({
        baseURL: UPDRAFT_API_HOSTNAME,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    });

    console.log('\nUploading app to Updraft...');

    const formData = new FormData();
    formData.append('app', createReadStream(filePath), `file.${fileExtension}`);

    const response = await api.put(
        `/api/app_upload/${appKey}/${apiKey}/`,
        formData,
        {
            headers: {
                ...formData.getHeaders(),
            },
        }
    );

    if (response.status !== 202 && response.status !== 200) {
        throw new Error('Could not upload the app to Updraft');
    }

    // handle async processing
    if (response.status === 202) {
        const buildProcessingUrl: string = `${UPDRAFT_API_HOSTNAME}/api/app_upload/${appKey}/${apiKey}/${response.data.task_id}/`;
        const isUploadedSuccessfully: boolean = await checkProcessingStatus(buildProcessingUrl);

        if (!isUploadedSuccessfully) {
            throw new Error('Could not upload the app to Updraft');
        }
    }

    console.log('\nApp uploaded to Updraft successfully.');
    console.log('\nResponse: ', response.data);
};

async function checkProcessingStatus(buildProcessingUrl: string): Promise<boolean> {
    const waitTimeInMs: number = 10000;

    while (true) {
        try {
            const response = await fetch(buildProcessingUrl, {
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error while checking for processing status! Status: ${response.status}`);
            }

            await response.json();

            if (response.status === 201) {
                return true;
            } else if (response.status !== 202) {
                return false;
            }

            console.log(`Processing still in progress, checking again in ${waitTimeInMs / 1000}s...`);
        } catch (error) {
            console.error('\nError while checking processing status:', error);
            return false;
        }

        await new Promise(resolve => setTimeout(resolve, waitTimeInMs));
    }
}

export const migrateAllAppReleasesToUpdraft = async (owner: string, appName: string, updraftAppKey: string, updraftApiKey: string, ignoreDisabledReleases: boolean) => {
    cleanTmpFolder();

    const response = await appcenterApi(`/apps/${owner}/${appName}/releases`);
    const appReleases: AppRelease[] = response.data;

    for (const release of appReleases) {

        if (ignoreDisabledReleases && !release.enabled) {
            console.log(`\n Release ${release.id} is disabled. Skipping...`);
            continue;
        }

        const response = await appcenterApi(`/apps/${owner}/${appName}/releases/${release.id}`);
        const appRelease: AppRelease = response.data;

        const appCenterApp: AppCenterApp = await getSingleAppReleaseFromAppCenterApp(owner, appName, appRelease.id);

        const binaryFileResponse = await axios.get(appCenterApp.download_url, {
            responseType: 'arraybuffer',
        });
        const binaryFile = binaryFileResponse.data;

        // temporary store binary file
        const filePath = resolve(join(__dirname, '..', '..', 'tmp', 'binary.' + release.file_extension));
        writeFileSync(filePath, binaryFile);

        await uploadAppReleaseToUpdraft(updraftAppKey, updraftApiKey, filePath, release.file_extension);

        unlinkSync(filePath);
    }
}

const cleanTmpFolder = () => {
    const path = resolve(join(__dirname, '..', '..', 'tmp'));

    if (! existsSync(path)) {
        throw new Error('tmp folder does not exist');
    }

    try {
        const files = readdirSync(path);

        for (const file of files) {
            if (file === '.gitignore') {
                continue;
            }

            const filePath = join(path, file);
            unlinkSync(filePath); // Delete the file
        }

        console.log('\ntmp folder cleaned successfully.');
    } catch (error) {
        console.error('Error while cleaning tmp folder:', error);
    }
}
