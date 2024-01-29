export type BitrixContact = {
    fio: string,
    phone: string,
    address: string,
    socials: string,
    card_number?: string
}

export interface ContactData {
    NAME: string;
    LAST_NAME: string;
    EMAIL?: string;
    PHONE?: string;
}

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