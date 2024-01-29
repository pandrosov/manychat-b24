import {Router, Request, Response} from "express";
import {HttpCodes, RequestWithBody} from "../../types/common";
import {LeadData} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrixService";

export const LeadRoute = Router({})

LeadRoute.post('/add', async (req: RequestWithBody<LeadData>, res: Response)=> {
    try {
        const bitrix = new Bitrix24()
        const leadResponse = await bitrix.createLead(req.body)
    } catch (error) {
        res.status(HttpCodes.BAD_REQUEST).send({error})
    }
})