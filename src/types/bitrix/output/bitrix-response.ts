import {BitrixMultiplyField} from "../common";
import {IManychatMessage} from "../../manychat/input/input";

export type BitrixResponse = {
    result: number,
    time?: TimeResponse
}

export interface DealCreatedResponse {
    result: number | string,
    message: IManychatMessage
}

export interface DealsListResult {
    ID: string;
    TITLE: string;
    TYPE_ID: string;
    STAGE_ID: string;
    PROBABILITY: null | number;
    CURRENCY_ID: string;
    OPPORTUNITY: null | number;
    IS_MANUAL_OPPORTUNITY: string;
    TAX_VALUE: null | number;
    LEAD_ID: null | string;
    COMPANY_ID: string;
    CONTACT_ID: string;
    QUOTE_ID: null | string;
    BEGINDATE: string;
    CLOSEDATE: string;
    ASSIGNED_BY_ID: string;
    CREATED_BY_ID: string;
    MODIFY_BY_ID: string;
    DATE_CREATE: string;
    DATE_MODIFY: string;
    OPENED: string;
    CLOSED: string;
    COMMENTS: null | string;
    ADDITIONAL_INFO: null | string;
    LOCATION_ID: null | string;
    CATEGORY_ID: number;
    STAGE_SEMANTIC_ID: string;
    IS_NEW: string;
    IS_RECURRING: string;
    IS_RETURN_CUSTOMER: string;
    IS_REPEATED_APPROACH: string;
    SOURCE_ID: null | string;
    SOURCE_DESCRIPTION: null | string;
    ORIGINATOR_ID: null | string;
    ORIGIN_ID: null | string;
    MOVED_BY_ID: string;
    MOVED_TIME: string;
    LAST_ACTIVITY_TIME: string;
    UTM_SOURCE: null | string;
    UTM_MEDIUM: null | string;
    UTM_CAMPAIGN: null | string;
    UTM_CONTENT: null | string;
    UTM_TERM: null | string;
    LAST_ACTIVITY_BY: string;
    UF_CRM_1706873714861: string;
}

export type DealsList = {
    result: Array<DealsListResult>,
    total: number
}

export type DealResponse = {
    result: DealResult,
    time: TimeResponse
}

export interface DealResult {
    ID: string;
    TITLE: string;
    TYPE_ID: string;
    STAGE_ID: string;
    PROBABILITY: null | number;
    CURRENCY_ID: string;
    OPPORTUNITY: null | number;
    IS_MANUAL_OPPORTUNITY: string;
    TAX_VALUE: null | number;
    LEAD_ID: null | string;
    COMPANY_ID: string;
    CONTACT_ID: string;
    QUOTE_ID: null | string;
    BEGINDATE: string;
    CLOSEDATE: string;
    ASSIGNED_BY_ID: string;
    CREATED_BY_ID: string;
    MODIFY_BY_ID: string;
    DATE_CREATE: string;
    DATE_MODIFY: string;
    OPENED: string;
    CLOSED: string;
    COMMENTS: null | string;
    ADDITIONAL_INFO: null | string;
    LOCATION_ID: null | string;
    CATEGORY_ID: string;
    STAGE_SEMANTIC_ID: string;
    IS_NEW: string;
    IS_RECURRING: string;
    IS_RETURN_CUSTOMER: string;
    IS_REPEATED_APPROACH: string;
    SOURCE_ID: null | string;
    SOURCE_DESCRIPTION: null | string;
    ORIGINATOR_ID: null | string;
    ORIGIN_ID: null | string;
    MOVED_BY_ID: string;
    MOVED_TIME: string;
    LAST_ACTIVITY_TIME: string;
    UTM_SOURCE: null | string;
    UTM_MEDIUM: null | string;
    UTM_CAMPAIGN: null | string;
    UTM_CONTENT: null | string;
    UTM_TERM: null | string;
    LAST_ACTIVITY_BY: string;
}
interface UserProfileResult {
    ID: string;
    NAME: string;
    LEAD_ID: string | null;
    TYPE_ID: string;
    SOURCE_ID: string | null;
    SOURCE_DESCRIPTION: string | null;
    COMPANY_ID: string | null;
    BIRTHDATE: string;
    EXPORT: string;
    HAS_PHONE: string;
    HAS_EMAIL: string;
    HAS_IMOL: string;
    DATE_CREATE: string;
    DATE_MODIFY: string;
    ASSIGNED_BY_ID: string;
    CREATED_BY_ID: string;
    MODIFY_BY_ID: string;
    OPENED: string;
    ORIGINATOR_ID: string | null;
    ORIGIN_ID: string | null;
    ORIGIN_VERSION: string | null;
    FACE_ID: string | null;
    LAST_ACTIVITY_TIME: string;
    ADDRESS: string | null;
    ADDRESS_2: string | null;
    ADDRESS_CITY: string | null;
    ADDRESS_POSTAL_CODE: string | null;
    ADDRESS_REGION: string | null;
    ADDRESS_PROVINCE: string | null;
    ADDRESS_COUNTRY: string | null;
    ADDRESS_LOC_ADDR_ID: string | null;
    UTM_SOURCE: string | null;
    UTM_MEDIUM: string | null;
    UTM_CAMPAIGN: string | null;
    UTM_CONTENT: string | null;
    UTM_TERM: string | null;
    LAST_ACTIVITY_BY: string;
    UF_CRM_LAST_COMM_DT: string;
    UF_CRM_5C6BC842E49ED: string;
    UF_CRM_1554299074643: string[];
    UF_CRM_1555933524897: string;
    UF_CRM_5CF4C8E18693B: string;
    UF_CRM_5D1C90AA82175: string;
    UF_CRM_5D96FD66AC12D: string;
    UF_CRM_5D9ED87F082A9: string;
    UF_CRM_5D9ED87F657E3: string;
    UF_CRM_5E3D4F2BBF247: string;
    UF_CRM_5F0EF5E7013F6: string;
    UF_CRM_5F7B0902AF876: string;
    UF_CRM_5F7B1490580EA: string;
    UF_CRM_5FA1272ED1A52: string;
    UF_CRM_5FA1272F50985: string;
    UF_CRM_1605772433: string[];
    UF_CRM_6061B5BA5CF05: string;
    UF_CRM_6061B5BB0A2E7: string;
    UF_CRM_60AFA6D976D8C: string;
    UF_CRM_614DC08315F25: string;
    UF_CRM_61542A46629F6: string;
    UF_CRM_618B95995B8B5: string;
    UF_CRM_620657D32013E: string;
    UF_CRM_620657D33AFD0: string;
    UF_CRM_620657D34AA48: string;
    UF_CRM_620657D368C7D: string;
    UF_CRM_620657D37C312: string;
    UF_CRM_620657D38BB1F: string;
    UF_CRM_620A0C0E0F636: string;
    UF_CRM_620A0C0E4FFD3: string;
    UF_CRM_620A0C0E6F6E9: string;
    UF_CRM_620A0C0E8EFAB: string;
    UF_CRM_620A0C0ECC16D: string;
    UF_CRM_62A07997719AF: string;
    UF_CRM_63DA53EBD5114: string;
    UF_CRM_63DA53EC0D546: string;
    UF_CRM_63EB7CD1C4276: string[];
    UF_CRM_63ECCC27F2C90: string[];
    UF_CRM_647849569D1A7: string;
    UF_CRM_648991100E853: string;
    UF_CRM_651B18CD0EFE7: string;
    UF_CRM_SEX: string;
    UF_CRM_CITY: string[];
    UF_CRM_SALARY_MAXIMUM: string;
    UF_CRM_SALARY_MINIMUM: string;
    UF_CRM_SOURCE_HIRED_EMPLOYEE: string;
    UF_CRM_HTML_DESCRIPTION: string;
    UF_CRM_COVER_LETTER: string;
    UF_CRM_CITIZENSHIP: string[];
    UF_CRM_WORK_CONDITIONS: string;
    UF_CRM_KEY_SKILLS: string[];
    UF_CRM_WORKEXP: string;
    UF_CRM_EDUCATION: string;
    UF_CRM_DESIRED_SALARY: string[];
    UF_CRM_EXPERIENCE: string;
    UF_CRM_652555BBA6539: string[];
    UF_CRM_6529288A5AA44: string;
    UF_CRM_1699519487: string;
    UF_CRM_1706524856573: string;
    UF_CRM_1706525027292: string;
    UF_CRM_1706525149808: string;
    UF_CRM_1706525214126: string;
    UF_CRM_1706525298377: string;
    UF_CRM_1706525810567: string;
    UF_CRM_65C4BB12F1355: string;
    UF_CRM_CONT_UID: string;
    PHONE: BitrixMultiplyField[];
    IM: BitrixMultiplyField[];
}

interface TimeResponse {
    start: number;
    finish: number;
    duration: number;
    processing: number;
    date_start: string;
    date_finish: string;
    operating_reset_at: number;
    operating: number;
}

export interface BitrixUserResponse {
    result: UserProfileResult;
    time: TimeResponse;
}