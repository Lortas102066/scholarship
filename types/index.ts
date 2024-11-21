export interface Scholarship {
    _id: string;
    scholarship_name: string;
    provider_name: string;
    capacity: number;
    award_amount: number;
    application_deadline: string;
    education_level: string;
    field_of_study?: string;
}

export interface Filter {
    id: string;
    label: string;
}
