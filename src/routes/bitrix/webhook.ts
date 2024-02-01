import {Router, Request, Response} from "express";
import {RequestWithBody} from "../../types/common";
import {WebhookBody} from "../../types/webhook";

export const webhookRouter = Router({})

webhookRouter.post('/', async(req: RequestWithBody<WebhookBody>, res: Response) => {
    switch (req.body.event) {
        case "ONCRMDEALUPDATE":
            console.log(req.body.data)
            break;
        case "ONCRMCONTACTUPDATE":
            console.log(req.body.data)
            break;
    }
})