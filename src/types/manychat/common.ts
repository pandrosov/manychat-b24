export enum ManyChatFields {
    MANYCHAT_ACTIVE_DEALS = "10490344"
}

export interface IManyChatField {
    subscriber_id: number,
    field_name: string,
    field_value: string | number | Array<number>
}