export interface DealData {
    NAME: string;
    LAST_NAME: string;
    EMAIL?: string;
    PHONE?: string;
}

export interface LeadRequest {
    data: LeadData;
}

interface LeadData {
    records: RecordEntry[];
    email: string;
    phone: string;
    fullname: string;
}

export interface RecordEntry {
    type: string;
    value: string;
    idx: string;
    title: string;
}

export interface ManychatUserData {
    id: string;
    phone: string,
    custom_fields: CustomFields;
}

export interface ManychatDealData {
    id: number,
    bitrix_id: number,
    profile_name: string,
    post_id: string,
    delivery: boolean,
    payment: boolean,
    cost: string,
    currency: string,
    products: string
}

interface CustomFields {
    bitrix_id: string | null;
    bitrix_user_category: string;
    bitrix_user_region: string;
    bitrix_active_deals: Array<number | string>,
    bitrix_closed_deals: Array<number | string>,
    profile_category: string;
    profile_email: string | null;
    profile_name: string;
    profile_region: string;
    profile_address: string;
    profile_card: string;
    profile_socials: string;
}