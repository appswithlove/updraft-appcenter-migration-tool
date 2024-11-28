import { CommandTypes } from '../commands';
import { ProgramCommand } from '../../program';
import { PROGRAM_NAME } from '../../constant';
import { getAppCenterUser } from '../../services';
import { EnvironmentVariables, writeEnviromentConfigVariable } from '../../config';
import { commandWriter } from '../writer';
import { noCommandFound } from './index';

const handleLogin = async (command: ProgramCommand, params: any) => {
    if (command.fullCommandName === `${PROGRAM_NAME}-login-appcenter`) {
        const response = await getAppCenterUser(params.appcenterToken);
        writeEnviromentConfigVariable(EnvironmentVariables.APPCENTER_TOKEN, params.appcenterToken);
        commandWriter(CommandTypes.LOGIN, { fullCommandName: command.fullCommandName, data: response });
    } else {
        noCommandFound(command);
    }
};

export default handleLogin;
