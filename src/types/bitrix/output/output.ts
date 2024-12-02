import {BitrixMultiplyField, BitrixRelation} from "../common";

export interface ConvertedBitrixContact {
    [BitrixRelation.CONTACT_TYPE_ID]: string,
    [BitrixRelation.CONTACT_NAME]: string,
    [BitrixRelation.CONTACT_PHONE]: BitrixMultiplyField[],
    [BitrixRelation.CONTACT_ADDRESS]: string,
    [BitrixRelation.CONTACT_OTH_ADDRESS]: string,
    [BitrixRelation.CONTACT_CATEGORY]: string | undefined,
    [BitrixRelation.CONTACT_REGION]: string | undefined,
    [BitrixRelation.CONTACT_SOCIALS]: BitrixMultiplyField[],
    [BitrixRelation.CONTACT_CARD_NUMBER]: string,
    [BitrixRelation.CONTACT_TELEGRAM_ID]: string,
    [BitrixRelation.CONTACT_ASSIGNED_ID]: string | number
    [BitrixRelation.CONTACT_DOB]: string,
    [BitrixRelation.CONTACT_FIO_LATIN]: string
}