export interface ManyChatUserDataResponse {
    id: number;
    phone: string,
    custom_fields: Array<CustomFieldsResponse>;
}

interface CustomFieldsResponse {
    id: number,
    name: string,
    type: string,
    description: string,
    value: number | string | Array<number | string>
}