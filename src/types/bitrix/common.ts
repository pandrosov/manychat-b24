export enum BitrixRelation {
    CONTACT_NAME = "NAME",
    CONTACT_LAST_NAME = "LAST_NAME",
    CONTACT_PHONE = "PHONE",
    CONTACT_EMAIL = "EMAIL",
    CONTACT_ADDRESS = "ADDRESS",
    CONTACT_OTH_ADDRESS = "UF_CRM_1705935422910",
    CONTACT_TYPE_ID = "TYPE_ID",
    CONTACT_CARD_NUMBER = "UF_CRM_1704978543805",
    DEAL_DELIVERY = "",
    DEAL_PAYMENT = "",
    DEAL_CONTACT_ID = ""
}

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