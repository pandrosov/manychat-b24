export enum BitrixRelation {
    CONTACT_TYPE_ID = "TYPE_ID",
    CONTACT_NAME = "NAME",
    CONTACT_PHONE = "PHONE",
    CONTACT_EMAIL = "EMAIL",
    CONTACT_CATEGORY = "UF_CRM_1706524856573",
    CONTACT_REGION = "UF_CRM_1706525027292",
    CONTACT_ADDRESS = "UF_CRM_1706525149808",
    CONTACT_OTH_ADDRESS = "UF_CRM_1706525214126",
    CONTACT_CARD_NUMBER = "UF_CRM_1706525298377",
    CONTACT_TELEGRAM_ID = "UF_CRM_1706525810567",
    CONTACT_SOCIALS = "IM",
    CONTACT_ASSIGNED_ID = "ASSIGNED_BY_ID",
    LEAD_NAME = "NAME",
    LEAD_EMAIL = "EMAIL",
    LEAD_PHONE = "PHONE",
    LEAD_TITLE = "TITLE",
    LEAD_COMMENTS = "COMMENTS",
    LEAD_ASSIGNED_BY_ID = "ASSIGNED_BY_ID"
}

export type BitrixMultiplyField = {
    VALUE_TYPE: string,
    VALUE: string,
    TYPE_ID: string
}

export enum BitrixClientConstData {
}

export enum BitrixDealConstData {

}

export class BitrixContact {
}