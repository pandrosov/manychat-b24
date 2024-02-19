import {BitrixRelation} from "../bitrix/common";

export interface ManyChatFields {
    [BitrixRelation.CONTACT_CATEGORY]: 10490344,
    [BitrixRelation.CONTACT_REGION]: 10400656,
    [BitrixRelation.CONTACT_NAME]: 10396726,
    [BitrixRelation.CONTACT_ADDRESS]: 10396767,
    [BitrixRelation.CONTACT_OTH_ADDRESS]: 10396767,
    [BitrixRelation.CONTACT_CARD_NUMBER]: 10396778,
    [BitrixRelation.CONTACT_SOCIALS]: 10396779,
    CONTACT_ACTIVE_DEALS: 10490344,
    CONTACT_CLOSED_DEALS: 10497488
}

export interface IManyChatField {
    subscriber_id: number,
    field_name: string,
    field_value: string | number | Array<number>
}