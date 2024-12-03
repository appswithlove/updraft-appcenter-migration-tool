import axios from 'axios';
import { EnvironmentVariables, readEnviromentConfigVariable } from '../config';

export const UPDRAFT_API_HOSTNAME = readEnviromentConfigVariable(EnvironmentVariables.UPDRAFT_API_HOSTNAME);
export const UPDRAFT_AUTHORIZATION_TOKEN = readEnviromentConfigVariable(EnvironmentVariables.UPDRAFT_AUTHORIZATION_TOKEN);

export const appcenterApi = axios.create({
    baseURL: UPDRAFT_API_HOSTNAME,
    headers: {
        'Content-Type': 'application/json',
        'X-API-Token': UPDRAFT_AUTHORIZATION_TOKEN,
    },
});
