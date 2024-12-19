import { CommandTypes } from '../commands';
import { ProgramCommand } from '../../program';
import { commandWriter } from '../writer';
import { PROGRAM_NAME } from '../../constant';
import { noCommandFound } from './index';
import { createOra } from '../../utils/oraHelper';
import { getAppDistributionGroups, getOrgDistributionGroups, getOrgUsers, getOrganizations } from '../../services';
//import { createSubOrganization, getAppcircleOrganizations, inviteUserToOrganization } from '../../services/appcircleApi';

const FULL_COMMANDS = ['-organizations-list-appcenter-orgs'];

type RoleMapperReturnType = { [key: string]: string | undefined };
const appCenterTestingGroupMapping = (role: string) => {
    const roleMapping: RoleMapperReturnType = {
        admin: 'manage',
        collaborator: 'manage',
        member: 'view',
    };

    return (roleMapping[role] ?? 'None') + '-distribution-group';
};

const appcenterDistProfileMapping = (role: string) => {
    const roleMapping: RoleMapperReturnType = {
        admin: 'manage',
        collaborator: 'operate',
        member: 'view',
    };

    return (roleMapping[role] ?? 'None') + '-distribution-profile';
};

const handleOrganizations = async (command: ProgramCommand, params: any) => {
    const commandName = command.fullCommandName.split(PROGRAM_NAME).pop();

    const spinner = createOra('');
    switch (commandName) {
        case FULL_COMMANDS[0]:
            spinner.text = 'Fetching App Center Organizations';
            spinner.start();
            const organizationList = await getOrganizations();
            spinner.succeed('App Center Organizations fetched successfully. Here is the list of your App Center account organizations:');
            commandWriter(CommandTypes.ORGANIZATIONS, {
                fullCommandName: command.fullCommandName,
                data: organizationList,
            });
            break;

        default:
            noCommandFound(command);
    }
};

export default handleOrganizations;

/*
    function aims to generate a new unique name by appending a suffix (like -1, -2, etc.)
    to the given orgName if names like it already exist in the nameArray
 */
function addNameWithSuffix(nameArray: any, orgName: string) {
    const regex = /^(.*?)(?:-(\d+))?$/;

    let highestSuffix = -1;
    nameArray.forEach((obj: any) => {
        if (obj.name.startsWith(orgName)) {
            const match = obj.name.match(regex);
            if (match) {
                const suffix = parseInt(match[2] || 0);
                highestSuffix = Math.max(highestSuffix, suffix);
            }
        }
    });

    if (highestSuffix === -1) {
        return orgName;
    }

    const newSuffix = highestSuffix + 1;
    const newNameWithSuffix = `${orgName}-${newSuffix}`;
    return newNameWithSuffix;
}
