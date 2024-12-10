import axios from 'axios';
import { EnvironmentVariables, readEnviromentConfigVariable } from '../config';
import { UpdraftAppDetails } from './interfaces/updraft/app.interface';

export const UPDRAFT_API_HOSTNAME = readEnviromentConfigVariable(EnvironmentVariables.UPDRAFT_API_HOSTNAME);
export const UPDRAFT_AUTHORIZATION_TOKEN = readEnviromentConfigVariable(EnvironmentVariables.UPDRAFT_AUTHORIZATION_TOKEN);

export const appcenterApi = axios.create({
    baseURL: UPDRAFT_API_HOSTNAME,
    headers: {
        'Content-Type': 'application/json',
        'X-API-Token': UPDRAFT_AUTHORIZATION_TOKEN,
    },
});

export const getAllUpdraftApps = async (): Promise<UpdraftAppDetails[]> => {
    const response = await appcenterApi.get(
        '/api/applications',
        {
            headers: {
                'Authorization': 'Token ' + UPDRAFT_AUTHORIZATION_TOKEN,
            },
        }
    );

    return response.data;
};
