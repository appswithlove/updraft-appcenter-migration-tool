# updraft-appcenter-migration-tool
The App Center Migration Tool is a command-line interface (CLI) designed to help App Center organizations seamlessly migrate their apps and releases to [Updraft](https://getupdraft.com)  . This tool streamlines the migration process, ensuring a smooth and efficient transition from Microsoft App Center to the Updraft app distribution platform.

## Precondition
Before using the migration tool, please ensure the following:

✅ You are registered with Updraft

✅ You’ve created your projects and apps in Updraft

🔹 Updraft Project Hierarchy:
Updraft organizes apps using a **project-based hierarchy**:

- Each **project** can include multiple **apps**
- Apps can belong to **different operating systems** (iOS, Android, Windows)
- Apps can be grouped by **deployment environments** (e.g., staging, QA, production)

This structure helps you manage complex delivery pipelines and keep platform- and environment-specific builds cleanly organized within a single project.

✅ You have your Microsoft App Center API key

✅ You have your Updraft API key

✅ You have your App Keys from Updraft

## 🚀 Releases: From App Center to Updraft

In **Microsoft App Center**, a *release* refers to a distributed app version.

In **Updraft**, this is called a **build**, and distribution is handled through creating a **release**. So builds can be uploaded first, but there is no need to distribute it already at the same time.

### Here's how it works in Updraft:

1. A **build version** is uploaded or migrated to your app in Updraft.
2. You create a **release** by selecting:
   - The **app**
   - The **deployment environment**
   - The **build version**
   - Target **distribution groups** or specific **tester email addresses**
3. After configuration, you **send** the release.
4. Testers receive an **email notification** with an **installation link** to access the release.

### 📦 Distribution Options:

- **Public link**: anyone with the link can install
- **Managed release**: only specified testers or groups receive the release
- **Managed permission groups**: you can create permission groups, assign permission groups to projects and set the user-role each group

This allows for structured, controlled, and trackable app distribution—perfect for beta testing, QA, or internal deployments.

# Installation

Node version v23.0.0 or higher is required.

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
- `profileName`
    - App Center app name for migration to an Updraft
    - **IMPORTANT** - app name, not app display name - you can find app name by using previous two commands for listing apps
- `owner` - App Center application owner name
- `updraftAppKey` - Your Updraft app key/token. You find it in 'Edit App'.
- `updraftApiKey` - Your Updraft api key/token. You find it in 'Profile > Tokens'.
- `ignoreDisabled` - Optional parameter. If set to true, the tool will ignore disabled releases in App Center. Default value is false.

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


# Clear cache

Configuration values like api hostnames are cached. In case you change those values, you'll want to clear the cache. You can do that by running:

```bash
chmod +x ./bin/clear-cache
./bin/clear-cache
```
