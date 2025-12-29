import {Mapping} from "../types/common";
import {BitrixMultiplyField} from "../types/bitrix/common";

export const SOCIAL_TYPE = {
    INSTAGRAM: "INSTAGRAM",
    TELEGRAM: "TELEGRAM",
    OTHER: "OTHER"
};

export const bitrixValues: Mapping = {
    common: "3705",
    animal: "3707",
    ru: "3709",
    by: "3713",
    kz: "3711",
    oae: "5773"
}

export const BITRIX_DEAL_STATUS = {
    todo: "NEW",
    success: "WON",
    failed: "LOSE"
}

export const DEAL_WIN_STATUSES:string[] = [
    BITRIX_DEAL_STATUS.failed,
    BITRIX_DEAL_STATUS.success
]

export const BITRIX_CONST = {
    CONTACT_TYPE: {
        "170554202811478":"UC_2HCWL8",
        "507065399154270": "UC_R3ZZDK"
    } as Record<string, string>,
    CONTACT_ASSIGNED: 27377, // Gleb
    DEAL_ASSIGNED: 27377, // Gleb
    DEAL_TYPE: 1,
    DEAL_CATEGORY: {
        "170554202811478":"35",
        "507065399154270":"67"
    } as Record<string,string>
}

export const WEBHOOK_CONST = {
    TUNNEL_ID: {
        35: "170554202811478",
        67: "507065399154270"
    } as Record<string, string>
}

export const bitrixIMArr: BitrixMultiplyField = {
    ID: "",
    VALUE_TYPE: "OTHER",
    VALUE: "",
    TYPE_ID: "IM"
};
export const bitrixPhoneEmailArr: BitrixMultiplyField = {
    ID: "",
    VALUE_TYPE: "WORK",
    VALUE: "",
    TYPE_ID: "IM"
};