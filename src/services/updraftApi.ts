import axios from 'axios';
import { EnvironmentVariables, readEnviromentConfigVariable } from '../config';
import { UpdraftAppDetails } from './interfaces/updraft/app.interface';
import { createReadStream } from 'fs';
import FormData from "form-data";

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

export const uploadAppToUpdraft = async (appKey: string, apiKey: string, filePath: string) => {
    const api = axios.create({
        baseURL: UPDRAFT_API_HOSTNAME,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    });

    console.log('\nUploading app to Updraft...');

    const formData = new FormData();
    formData.append('app', createReadStream(filePath), 'file.apk');

    const response = await api.put(
        `/api/app_upload/${appKey}/${apiKey}/`,
        formData,
        {
            headers: {
                ...formData.getHeaders(),
            },
        }
    );

    if (response.status !== 200) {
        throw new Error('Could not upload the app to Updraft');
    }

    console.log('\nApp uploaded to Updraft successfully.');
    console.log('\nResponse: ', response.data);
};
