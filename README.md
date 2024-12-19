# updraft-appcenter-migration-tool

## Installation


### Local Installation

1. Clone repository
2. Navigate to project folder where you want to use the tool
3. Run `npm install <path-to-repo>`

Run it like this:
```bash
npx appcenter-migration-tool <command> <options> 
```

### Global Installation

1. Clone repository
2. Navigate to project folder
3. Run `npm install -g .`

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

_Later: install globally, install locally - [like appcenter tool](https://github.com/appcircleio/appcenter-migration-tool?tab=readme-ov-file#installation-instructions)_

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
