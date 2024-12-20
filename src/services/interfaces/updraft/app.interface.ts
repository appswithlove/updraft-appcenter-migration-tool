interface EnvDetail {
    id: number;
    environment: string;
    app_type: number | null;
    title: string;
}

interface UserDetail {
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
}

interface CurrentVersion {
    id: number;
    date: string;
    size: number;
    public_link: string;
    ios_certificate_is_expired: boolean;
    count_downloads: number;
    build_is_available: boolean;
    app: string;
    icon: string;
    title: string;
    display_name: string | null;
    whats_new: string;
    unique_app_id: string;
    ipa_cert: string;
    expiration_date: string | null;
    provisions_all_devices: boolean | null;
    team_identifier: string;
    pl_name: string;
    minimum_os_version: string;
    target_os_version: string;
    maximum_os_version: string;
    minimum_api_version: string;
    target_api_version: string;
    maximum_api_version: string;
    aab: string | null;
    version: string;
    create_at: string;
    custom_data: any | null;
    provisioned_devices_data: any | null;
    type_upload: string | null;
    build_version_number: string;
    build_number: number;
    application: number;
    resign_app: string | null;
}

interface ProjectDetail {
    id: number;
    project_title: string;
}

export interface UpdraftAppDetails {
    id: number;
    user_detail: UserDetail[];
    icon: string | null;
    slackwebhooks: any[];
    webhooks: any[];
    project_detail: ProjectDetail | null;
    current_version: CurrentVersion | null;
    count_versions: number;
    upload_path: string;
    env_details: EnvDetail[];
    slack_id: string;
    public_link: string;
    feedback_count: number;
    feedback_new_count: number;
    feedback_notclosed_count: number;
    unique_app_id: string;
    environment: string;
    project_title: string;
    title: string;
    uuid: string;
    icon_app_custom: string | null;
    app_type: number | null;
    description: string;
    slack_webhook: string;
    slack_channel: string;
    app: any | null;
    autocleanup_builds_time: string;
    autocleanup_builds_number: number | null;
    is_delete_by_number: boolean;
    is_default_app: boolean;
    is_public_app: boolean;
    is_autoupdate_enabled: boolean;
    is_feedback_enabled: boolean;
    is_notifications_enabled: boolean;
    is_notifications_project_members_enabled: boolean;
    ready_to_sale: boolean;
    offline: boolean;
    is_default_key_aab: boolean;
    organization: number;
    base_app: any | null;
    project_app: number | null;
    other_platform: any | null;
    distribution: any[];
    users: number[];
    ipa_app: number;
    apk_app: number;
    first_app_id: number;
}
