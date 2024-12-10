export interface AppCenterApp {
    id: number;
    app_name: string;
    app_display_name: string;
    app_os: string;
    version: string;
    origin: string;
    short_version: string;
    release_notes: string;
    provisioning_profile_name: string;
    provisioning_profile_type: string;
    provisioning_profile_expiry_date: string;
    is_provisioning_profile_syncing: boolean;
    size: number;
    min_os: string;
    device_family: string;
    android_min_api_level: string;
    bundle_identifier: string;
    package_hashes: string[];
    fingerprint: string;
    uploaded_at: string;
    download_url: string;
    secondary_download_url: string;
    app_icon_url: string;
    install_url: string;
    destination_type: string;
    distribution_groups: DistributionGroup[];
    distribution_stores: DistributionStore[];
    destinations: Destination[];
    is_udid_provisioned: boolean;
    can_resign: boolean;
    build: Build;
    enabled: boolean;
    status: string;
    is_external_build: boolean;
}

interface DistributionGroup {
    id: string;
    name: string;
}

interface DistributionStore {
    id: string;
    name: string;
    type: string;
    publishing_status: string;
}

interface Destination {
    id: string;
    name: string;
    is_latest: boolean;
    type: string;
    publishing_status: string;
    destination_type: string;
    display_name: string;
}

interface Build {
    branch_name: string;
    commit_hash: string;
    commit_message: string;
}
