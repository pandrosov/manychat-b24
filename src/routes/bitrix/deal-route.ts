import {Router, Request, Response} from "express";
import {HTTP_CODES_RESPONSE, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../../types/common";
import {DealListParams, DealListReq, ManychatDealData} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrix-service";
import {BitrixRelation} from "../../types/bitrix/common";

export const dealRouter = Router({})
dealRouter.get('/all', async (req: RequestWithBodyAndParams<DealListParams, DealListReq>, res: Response) => {
    try {
        const id = req.params.id
        const {bitrix_id: bitrixId} = req.body
        const bitrix = new Bitrix24()
        const filter = {
            ["=" + BitrixRelation.DEAL_CONTACT_ID]: bitrixId
        }
        console.log(filter)
        const dealList = await bitrix.getUserDeals(filter)


        res.status(200).send({result: dealList.result})
    } catch (error) {
        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
            status: "error",
            message: "Get user deal error request"
        })
    }
})
dealRouter.post('/add', async (req: RequestWithBody<ManychatDealData>, res: Response) => {
    try {
        const bitrixService = new Bitrix24()
        const dealResponse = await bitrixService.createDeal(req.body)
        const message = dealResponse.message

        if(dealResponse.result) {
            res.status(HTTP_CODES_RESPONSE.CREATED).send({message})
        } else {
            res.status(HTTP_CODES_RESPONSE.BAD_REQUEST)
        }
    } catch (error) {
        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST)
    }
})