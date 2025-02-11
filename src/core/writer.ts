import { getConsoleOutputType } from '../config';
import { PROGRAM_NAME } from '../constant';
import { CommandTypes } from './commands';
import chalk from 'chalk';

const writersMap: { [key in CommandTypes]: (data: any) => void } = {
    [CommandTypes.LOGIN]: (data: any) => {
        if (data.fullCommandName === `${PROGRAM_NAME}-login-appcenter`) {
            console.log(chalk.italic(`Logged in into App Center account as ${data.data.email}\n`));
        } else if (data.fullCommandName === `${PROGRAM_NAME}-login-updraft`) {
            console.log(chalk.italic(`Logged in into Updraft account as ${data.data}\n`));
        }
    },

    [CommandTypes.ORGANIZATIONS]: (data: any) => {
        console.table(
            data?.data?.map((org: any) => ({
                ID: org?.id,
                Name: org?.name,
                'Display Name': org?.display_name,
            })),
        );
    },

    [CommandTypes.APPS]: (data: any) => {
        console.table(
            data?.data?.map((app: any) => ({
                ID: app?.id,
                Name: app?.name,
                'Display Name': app?.display_name,
                'Owner Organization': app?.owner.name,
            })),
        );
    },

    [CommandTypes.DISTRIBUTION_GROUPS]: (data: any) => {
        console.table(
            data?.data?.map((distGroup: any) => ({
                ID: distGroup.id,
                'Distribution Group Name': distGroup.name,
                'Organization Name': distGroup.organization_name,
            })),
        );
    },
};

export const commandWriter = (command: CommandTypes, data: any) => {
    if (getConsoleOutputType() === 'json') {
        console.log('json output....');
        console.log(JSON.stringify(data.data || data));
    } else {
        const writer = writersMap[command];
        if (writer) {
            writer(data);
        }
    }
};
