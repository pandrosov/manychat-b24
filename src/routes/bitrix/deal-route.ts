import {Router, Request, Response} from "express";
import {HTTP_CODES_RESPONSE, RequestWithBody} from "../../types/common";
import {ManychatDealData} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrix-service";

export const dealRouter = Router({})
dealRouter.get('/all', (req: Request, res: Response) => {
    // res.sendStatus(200)
})
dealRouter.post('/add', async (req: RequestWithBody<ManychatDealData>, res: Response) => {
    try {
        const bitrixService = new Bitrix24()
        const dealResponse = await bitrixService.createDeal(req.body)
        const message = dealResponse.message

        if(dealResponse.result) {
            res.status(HTTP_CODES_RESPONSE.CREATED).send({message})
        }
    } catch (error) {
        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST)
    }
})