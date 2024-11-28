# updraft-appcenter-migration-tool

### Notes

One file should be executable on Unix-like systems

```bash
chmod +x ./bin/appcenter-migration-tool
```

### Usage

_Later: install globally, install locally - [like appcenter tool](https://github.com/appcircleio/appcenter-migration-tool?tab=readme-ov-file#installation-instructions)_

```bash
./bin/appcenter-migration-tool --help
```

```bash
./bin/appcenter-migration-tool login appcenter --appcenterToken <token>
```

```bash
./bin/appcenter-migration-tool organizations list-appcenter-orgs
```

Listing all apps from App Center:
```bash
./bin/appcenter-migration-tool apps list-appcenter-apps
```

List the available apps in the specified App Center organization
```bash
./bin/appcenter-migration-tool apps list-org-apps --organizationName <organization-name>
```

List distribution groups in specified App Center organization
```bash
appcenter-migration-tool distribution-groups list-org-distgroups --organizationName <organization-name>
```
