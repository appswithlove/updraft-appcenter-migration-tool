import axios from 'axios';
import chalk from "chalk";
import { noCommandFound } from './index';
import { PROGRAM_NAME } from '../../constant';
import { ProgramCommand } from '../../program';
import {getAllAppCenterApps, getAppCenterApp, getOrgApps} from '../../services';
import { createOra } from '../../utils/oraHelper';
import { CommandTypes } from '../commands';
import { commandWriter } from '../writer';
import { uploadAppToUpdraft } from '../../services/updraftApi';
import {UpdraftAppDetails} from "../../services/interfaces/updraft/app.interface";
import {AppCenterApp} from "../../services/interfaces/appcenter/app.interface";
//import { createDistributionProfile, getAppcircleOrganizations, getDistributionProfiles, getSubOrgToken } from '../../services/appcircleApi';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const FULL_COMMANDS = ['-apps-list-all-apps', '-apps-list-org-apps', '-apps-migrate-profile'];

const handleApps = async (command: ProgramCommand, params: any) => {
    const commandName = command.fullCommandName.split(PROGRAM_NAME).pop();

    const spinner = createOra('');
    switch (commandName) {
        case FULL_COMMANDS[0]:
            spinner.text = 'App Center Apps Fetching';
            spinner.start();
            const appsList = await getAllAppCenterApps();
            spinner.succeed('App Center Apps fetched successfully.');
            commandWriter(CommandTypes.APPS, {
                fullCommandName: command.fullCommandName,
                data: appsList,
            });
            break;

        case FULL_COMMANDS[1]:
            spinner.text = 'Organization Apps Fetching';
            spinner.start();
            const organizationApps = await getOrgApps(params.organizationName);
            spinner.succeed('Organization Apps fetched successfully.');
            commandWriter(CommandTypes.APPS, {
                fullCommandName: command.fullCommandName,
                data: organizationApps,
            });
            break;

        case FULL_COMMANDS[2]:
            spinner.text = 'App Center Apps Profile Migrating';
            spinner.start();

            // needed for this endpoint: https://openapi.appcenter.ms/#/distribute/releases_getLatestByUser
            const appCenterAppOwner: string = params.owner;
            const appCenterAppName: string = params.profileName;
            const appKey: string = params.updraftAppKey;
            const apiKey: string = params.updraftApiKey;

            // migrate here
            let appCenterApp: AppCenterApp = await getAppCenterApp(appCenterAppOwner, appCenterAppName);
            const response = await axios.get(appCenterApp.download_url, {
                responseType: 'arraybuffer',
            });
            const binaryFile = response.data;

            // temporary store binary file
            const tmpFolderPath: string = resolve(__dirname + '/../../../tmp');
            const tempFilePath = join(tmpFolderPath, `temp-${Date.now()}.apk`); // fix: doesn't have to be apk
            writeFileSync(tempFilePath, Buffer.from(binaryFile));

            await uploadAppToUpdraft(appKey, apiKey, tempFilePath);

            if (existsSync(tempFilePath)) {
                unlinkSync(tempFilePath);
            }

            spinner.succeed('App Migrated successfully');

            break;

        default:
            noCommandFound(command);
    }
};

export default handleApps;
