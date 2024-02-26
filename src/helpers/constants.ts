import {Mapping} from "../types/common";
import {BitrixMultiplyField} from "../types/bitrix/common";

export const SOCIAL_TYPE = {
    INSTAGRAM: "INSTAGRAM",
    TELEGRAM: "TELEGRAM",
};

export const bitrixValues: Mapping = {
    common: "3705",
    animal: "3707",
    ru: "3709",
    by: "3713",
    kz: "3711"
}

export const BITRIX_DEAL_STATUS = {
    todo: "C35:NEW",
    prepare: "C35:PREPARATION",
    payed: "C35:PREPAYMENT_INVOIC",
    delivired: "C35:UC_931N70",
    inReporting: "C35:EXECUTING",
    checked: "C35:UC_UIJBGH",
    success: "C35:WON",
    failed: "C35:LOSE"
}

export const DEAL_WIN_STATUSES:string[] = [
    BITRIX_DEAL_STATUS.checked,
    BITRIX_DEAL_STATUS.failed,
    BITRIX_DEAL_STATUS.success
]

export const BITRIX_CONST = {
    CONTACT_TYPE: "UC_2HCWL8",
    CONTACT_ASSIGNED: 27377, // Gleb
    DEAL_ASSIGNED: 27377, // Gleb
    DEAL_TYPE: 1,
    DEAL_CATEGORY: 35
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