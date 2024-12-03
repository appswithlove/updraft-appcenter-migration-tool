import { CommandTypes } from '../commands';
import { ProgramCommand } from '../../program';
import { PROGRAM_NAME } from '../../constant';
import { getAppCenterUser, getUpdraftAuthorizationToken } from '../../services';
import { EnvironmentVariables, writeEnviromentConfigVariable, readEnviromentConfigVariable } from '../../config';
import { commandWriter } from '../writer';
import { noCommandFound } from './index';

const handleLogin = async (command: ProgramCommand, params: any) => {
    if (command.fullCommandName === `${PROGRAM_NAME}-login-appcenter`) {
        const response = await getAppCenterUser(params.appcenterToken);
        writeEnviromentConfigVariable(EnvironmentVariables.APPCENTER_TOKEN, params.appcenterToken);
        commandWriter(CommandTypes.LOGIN, { fullCommandName: command.fullCommandName, data: response });
    } else if (command.fullCommandName === `${PROGRAM_NAME}-login-updraft`) {
        const response = await getUpdraftAuthorizationToken(params.username, params.password);
        writeEnviromentConfigVariable(EnvironmentVariables.UPDRAFT_AUTHORIZATION_TOKEN, response.token);
        commandWriter(CommandTypes.LOGIN, { fullCommandName: command.fullCommandName, data: params.username });
    } else {
        noCommandFound(command);
    }
};

export default handleLogin;
