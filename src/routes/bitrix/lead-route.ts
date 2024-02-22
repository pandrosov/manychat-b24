import {Router, Request, Response} from "express";
import {HTTP_CODES_RESPONSE, RequestWithBody} from "../../types/common";
import {LeadRequest} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrix-service";

export const leadRoute = Router({})
leadRoute.post('/add', async (req: RequestWithBody<LeadRequest>, res: Response)=> {
    try {
        const bitrix = new Bitrix24()
        const leadResponse = await bitrix.createLead(req.body)

        if(leadResponse) {
            res.status(HTTP_CODES_RESPONSE.CREATED).send({result: leadResponse})
        }
    } catch (error) {
        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
            status: "error",
            message: "Error catching lead"
        })
    }
})