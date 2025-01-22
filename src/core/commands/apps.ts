import { noCommandFound } from './index';
import { PROGRAM_NAME } from '../../constant';
import { ProgramCommand } from '../../program';
import {getAllAppCenterApps, getOrgApps} from '../../services';
import { createOra } from '../../utils/oraHelper';
import { CommandTypes } from '../commands';
import { commandWriter } from '../writer';
import { migrateAllAppReleasesToUpdraft } from '../../services/updraftApi';

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

            const appCenterAppOwner: string = params.owner;
            const appCenterAppName: string = params.profileName;
            const appKey: string = params.updraftAppKey;
            const apiKey: string = params.updraftApiKey;
            const ignoreDisabledReleases = params.ignoreDisabled === 'true' || params.ignoreDisabled === true;

            await migrateAllAppReleasesToUpdraft(appCenterAppOwner, appCenterAppName, appKey, apiKey, ignoreDisabledReleases);

            spinner.succeed('App Migrated successfully');

            break;

        default:
            noCommandFound(command);
    }
};

export default handleApps;
