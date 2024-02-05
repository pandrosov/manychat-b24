type BitrixTimeResponse = {
    start: number,
    finish: number,
    duration: number,
    processing: number,
    date_start: string,
    date_finish: string,
    operating_reset_at: number,
    operating: number
}

export type BitrixResponse = {
    result: number,
    time?: BitrixTimeResponse
}

export interface DealsListResult {
    ID: string,
    CONTACT_ID: string
}

export type DealsList = {
    result: DealsListResult,
    total: number
}