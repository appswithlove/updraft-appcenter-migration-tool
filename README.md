# updraft-appcenter-migration-tool
The App Center Migration Tool is a CLI designed to help App Center Organizations seamlessly transfer their apps and app releases to Updraft (getupdraft.com). This tool will help to streamlin the app center migration process, ensuring a smooth transition between App Center and Updraft App Distribution platform.

## Precondition
- For a smooth transfer, it is important that you have already registered with Updraft.
- You have also already created your projects and apps. Since Updraft has a project hierarchy and several apps for iOS, Android and Windows come together in one project, this step is required.
- You need your API key from Microsoft App Center
- You need your API key from Updraft
- You need your APP keys from Updraft

## Installation


### Local Installation

1. Clone repository
2. Navigate to project folder where you want to use the tool
3. Run `npm install <path-to-repo>`
4. Run `npm run build`

Run it like this:
```bash
npx appcenter-migration-tool <command> <options> 
```

### Global Installation

1. Clone repository
2. Navigate to project folder
3. Run `npm install -g .`
4. Run `npm run build`

Run it like this:
```bash
appcenter-migration-tool <command> <options> 
```


### Notes

One file should be executable on Unix-like systems

```bash
chmod +x ./bin/appcenter-migration-tool
```

# Usage

```bash
./bin/appcenter-migration-tool --help
```

## Login

```bash
./bin/appcenter-migration-tool login appcenter --appcenterToken <token>
```

This command is used for getting and storing updraft authorization token that will be used for other updraft API calls.
```bash
./bin/appcenter-migration-tool login updraft --username <username> --password <password>
```

## Apps

Listing all apps from App Center:
```bash
./bin/appcenter-migration-tool apps list-all-apps
```

List the available apps in the specified App Center organization

**NOTE: app center user API token with Full Access required**
```bash
./bin/appcenter-migration-tool apps list-org-apps --organizationName <organization-name>
```

Migrate the specified app from App Center to existing app in Updraft. This will migrate all app releases from App Center
to Updraft. Each app release in App Center will correspond to app build in Updraft app. Command parameters:
- `profileName` - App Center app name for migration to an Updraft
- `owner` - App Center application owner name
- `updraftAppKey` - Your Updraft app key/token. You find it in 'Edit App'.
- `updraftApiKey` - Your Updraft api key/token. You find it in 'Profile > Tokens'.

```bash
./bin/appcenter-migration-tool apps migrate-profile --profileName="<app-name>" --owner="<owner-name>" --updraftAppKey="<app-key>" --updraftApiKey="<api-key>"
```

## Organizations

```bash
./bin/appcenter-migration-tool organizations list-appcenter-orgs
```

## Distribution Groups

List distribution groups in specified App Center organization

**NOTE: app center user API token with Full Access required**
```bash
appcenter-migration-tool distribution-groups list-org-distgroups --organizationName <organization-name>
```

List distribution groups in specified App Center app

```bash
./bin/appcenter-migration-tool distribution-groups list-app-distgroups --appName <app-name> --organizationName <organization-name>
```

# Interactive mode

You can run interactive mode like this:

```bash
./bin/appcenter-migration-tool -i
```

Or if you installed package locally:

```bash
npx appcenter-migration-tool -i
```

Or if you installed package globally:

```bash
appcenter-migration-tool -i
```
