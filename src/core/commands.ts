export enum CommandParameterTypes {
    SELECT = 'select',
    BOOLEAN = 'boolean',
    STRING = 'input',
    PASSWORD = 'password',
    MULTIPLE_SELECT = 'multipleSelect',
}

export enum CommandTypes {
    LOGIN = 'login',
    ORGANIZATIONS = 'organizations',
    APPS = 'apps',
    DISTRIBUTION_GROUPS = 'distribution-groups',
}

export type ParamType = {
    name: string;
    description: string;
    longDescription?: string;
    type: CommandParameterTypes;
    valueType?: string;
    required?: boolean;
    params?: any[];
    requriedForInteractiveMode?: boolean;
    skipForInteractiveMode?: boolean;
    paramType?: string;
    defaultValue?: any;
    from?: 'user' | 'default';
};

export type CommandType = {
    command: string;
    description: string;
    longDescription?: string;
    ignore?: boolean;
    subCommands?: CommandType[];
    arguments?: ParamType[];
    params: ParamType[];
};

export const commands: CommandType[] = [
    {
        command: CommandTypes.LOGIN,
        description: 'Login',
        longDescription: 'Log in to connect Updraft or App Center account',
        params: [],
        subCommands: [
            {
                command: 'appcenter',
                description: 'App Center login',
                longDescription: 'Log in to your App Center account',
                params: [
                    {
                        name: 'appcenterToken',
                        description: 'App Center user API token',
                        type: CommandParameterTypes.STRING,
                        valueType: 'string',
                    },
                ],
            },
            {
                command: 'updraft',
                description: 'Updraft login',
                longDescription: 'Log in to your Updraft account',
                params: [
                    {
                        name: 'username',
                        description: 'Updraft username',
                        type: CommandParameterTypes.STRING,
                        valueType: 'string',
                    },
                    {
                        name: 'password',
                        description: 'Updraft password',
                        type: CommandParameterTypes.STRING,
                        valueType: 'string',
                    },
                ],
            },
        ],
    },
    {
        command: CommandTypes.ORGANIZATIONS,
        description: 'Organizations',
        longDescription: 'List and migrate available organizations in App Center',
        params: [],
        subCommands: [
            {
                command: 'list-appcenter-orgs',
                description: 'List App Center organizations',
                longDescription: 'List available organizations in App Center',
                params: [],
            },
        ],
    },
    {
        command: CommandTypes.APPS,
        description: 'App Center apps',
        longDescription: 'List and migrate available apps in App Center',
        params: [],
        subCommands: [
            {
                command: 'list-all-apps',
                description: 'List all App Center apps',
                longDescription: 'List available apps in App Center',
                params: [],
            },
            {
                command: 'list-org-apps',
                description: 'List apps in specified App Center organization',
                longDescription: 'List the available apps in the specified App Center organization',
                params: [
                    {
                        name: 'organizationName',
                        description: 'App Center organization name',
                        type: CommandParameterTypes.SELECT,
                        valueType: 'string',
                    },
                ],
            },
            {
                command: 'migrate-profile',
                description: 'Migrate apps in specified App Center organization',
                longDescription: 'Migrate the specified apps in the specified App Center organization',
                params: [
                    {
                        name: 'profileName',
                        description: 'App Center app name for migration to Updraft app',
                        type: CommandParameterTypes.STRING,
                        valueType: 'string',
                    },
                    {
                        name: 'owner',
                        description: 'App Center Application Owner Name',
                        type: CommandParameterTypes.STRING,
                        valueType: 'string',
                    },
                    {
                        name: 'updraftAppKey',
                        description: 'Your Updraft app key/token.',
                        type: CommandParameterTypes.STRING,
                        valueType: 'string',
                    },
                    {
                        name: 'updraftApiKey',
                        description: 'Your Updraft api key/token. You find it in \'Profile > Tokens\'.',
                        type: CommandParameterTypes.STRING,
                        valueType: 'string',
                    },
                    {
                        name: 'ignoreDisabled',
                        description: 'Ignore disabled app releases in App Center if this flag is set to true',
                        type: CommandParameterTypes.BOOLEAN,
                        required: false,
                    },
                ],
            },
        ],
    },
    {
        command: CommandTypes.DISTRIBUTION_GROUPS,
        description: 'App Center distribution groups',
        longDescription: 'List available distribution groups in App Center',
        params: [],
        subCommands: [
            {
                command: 'list-org-distgroups',
                description: 'List distribution groups in specified App Center organization',
                longDescription: 'List the available distribution groups in the specified App Center organization',
                params: [
                    {
                        name: 'organizationName',
                        description: 'App Center organization name',
                        type: CommandParameterTypes.SELECT,
                        valueType: 'string',
                    },
                ],
            },
            {
                command: 'list-app-distgroups',
                description: 'List distribution groups in specified App Center app',
                longDescription: 'List the available distribution groups in the specified App Center app',
                params: [
                    {
                        name: 'organizationName',
                        description: 'App Center organization name',
                        type: CommandParameterTypes.SELECT,
                        valueType: 'string',
                    },
                    {
                        name: 'appName',
                        description: 'App Center app name',
                        type: CommandParameterTypes.SELECT,
                        valueType: 'string',
                    },
                ],
            },
        ],
    },
];
