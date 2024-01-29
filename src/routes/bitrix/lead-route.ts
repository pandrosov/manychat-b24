import {Router, Request, Response} from "express";
import {HttpCodes, RequestWithBody} from "../../types/common";
import {LeadRequest} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrixService";

export const leadRoute = Router({})

leadRoute.post('/add', async (req: RequestWithBody<LeadRequest>, res: Response)=> {
    try {
        const bitrix = new Bitrix24()
        const leadResponse = await bitrix.createLead(req.body)

        if(leadResponse) {
            res.status(HttpCodes.CREATED).send({result: leadResponse})
        }
    } catch (error) {
        res.status(HttpCodes.BAD_REQUEST).send({error})
    }
})