export interface WebhookBody {
    event: WebhookEvents,
    data: WebhookData
}

type WebhookEvents =  "ONCRMDEALUPDATE" | "ONCRMCONTACTUPDATE"

interface WebhookData {
    FIELDS: {
        ID: string
    }
}