export interface WebhookBody {
    event: WebhookEvents,
    data: WebhookData,
    auth: WebhookAuth
}

type WebhookEvents =  "ONCRMDEALUPDATE" | "ONCRMCONTACTUPDATE"

interface WebhookData {
    FIELDS: {
        ID: string
    }
}

interface WebhookAuth {
    domain: string,
    application_token: string
}