export interface ManyChatUserDataResponse {
    id: number;
    phone: string,
    status: string,
    first_name: string,
    last_name: string,
    name: string,
    custom_fields: Array<CustomFieldsResponse>;
}

export interface ManyChatUserNameDataResponse {
    status: string,
    data: Array<ManyChatUserDataResponse>
}

interface CustomFieldsResponse {
    id: number,
    name: string,
    type: string,
    description: string,
    value: number | string | Array<number | string>
}