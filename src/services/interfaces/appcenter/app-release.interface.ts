interface Destination {
    id: string;
    name: string;
    destination_type: string;
}

interface DistributionGroup {
    id: string;
    name: string;
}

export interface AppRelease {
    origin: string;
    id: number;
    short_version: string;
    version: string;
    uploaded_at: string;
    enabled: boolean;
    is_external_build: boolean;
    file_extension: string;
    destinations: Destination[];
    distribution_groups: DistributionGroup[];
}
