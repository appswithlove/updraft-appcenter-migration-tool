import { noCommandFound } from './index';
import { PROGRAM_NAME } from '../../constant';
import { ProgramCommand } from '../../program';
import { getAppDistributionGroups, getOrgDistributionGroups } from '../../services';
import { createOra } from '../../utils/oraHelper';
import { CommandTypes } from '../commands';
import { commandWriter } from '../writer';
import chalk from 'chalk';
import { collectErrorMessageFromData } from '../../main';

const FULL_COMMANDS = [
    '-distribution-groups-list-org-distgroups',
    '-distribution-groups-list-app-distgroups',
];

const handleDistributionGroup = async (command: ProgramCommand, params: any) => {
    const commandName = command.fullCommandName.split(PROGRAM_NAME).pop();

    const spinner = createOra('');
    switch (commandName) {
        case FULL_COMMANDS[0]:
            spinner.text = 'Distribution Groups Fetching';
            spinner.start();
            const distGroupList = await getOrgDistributionGroups(params.organizationName);

            if (distGroupList.length === 0) {
                spinner.fail('No Distribution Groups Found.');
                process.exit(1);
            }

            spinner.succeed('Distribution Groups Fetched successfully.');
            commandWriter(CommandTypes.DISTRIBUTION_GROUPS, {
                fullCommandName: command.fullCommandName,
                data: distGroupList.map((distGroup: any) => ({
                    ...distGroup,
                    organization_name: params.organizationName,
                })),
            });
            break;

        case FULL_COMMANDS[1]:
            spinner.text = `Distribution Groups Fetching for ${params.appName}`;
            spinner.start();
            const appDistGroupList = await getAppDistributionGroups(params.organizationName, params.appName);
            if (appDistGroupList.length === 0) {
                spinner.fail('No Distribution Groups Found.');
                process.exit(1);
            }

            spinner.succeed('Distribution Groups Fetched successfully.');
            commandWriter(CommandTypes.DISTRIBUTION_GROUPS, {
                fullCommandName: command.fullCommandName,
                data: appDistGroupList.map((distGroup: any) => ({
                    ...distGroup,
                    organization_name: params.organizationName,
                })),
            });
            break;

        default:
            noCommandFound(command);
    }
};

export default handleDistributionGroup;
