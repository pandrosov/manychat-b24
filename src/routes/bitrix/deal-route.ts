import {Router, Request, Response} from "express";
import {HTTP_CODES_RESPONSE, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../../types/common";
import {DealListParams, DealListReq, ManychatDealData} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrix-service";
import {BitrixRelation} from "../../types/bitrix/common";
import {MessageBuilder} from "../../helpers/manychat-messages";
import {IButton} from "../../types/manychat/input/input";

export const dealRouter = Router({})
dealRouter.get('/:id/all', async (req: RequestWithBodyAndParams<DealListParams, DealListReq>, res: Response) => {
    try {
        const id = req.params.id
        const bitrix = new Bitrix24()
        const filter = {
            filter: {
                ["=" + BitrixRelation.DEAL_CONTACT_ID]: id
            }
        }
        const messageBuilder = new MessageBuilder()
        const dealsList = await bitrix.getUserDeals(filter)
        if(dealsList.total === 0) {
            const mcMessage = messageBuilder.addTextMessage("У вас нет активых сделок для отправки отчета").build()
            res.status(HTTP_CODES_RESPONSE.SUCCESS).send(mcMessage)
        } else {
            const dealButton:IButton[] = []
            dealsList.result.forEach(deal => {
                dealButton.push({
                    "type": "flow",
                    "caption": deal[BitrixRelation.DEAL_ID],
                    "target": "content20240221095701_631322",
                    "actions": [
                        {
                            "action": "set_field_value",
                            "field_name": "profile_report_deal",
                            "value": deal[BitrixRelation.DEAL_ID]
                        }
                    ]
                })
            })

            const messageJson = messageBuilder
                .addTextMessage("Ваши активные заявки")
                .addButtonsToTextMessage(dealButton)
                .build()

            res.status(HTTP_CODES_RESPONSE.SUCCESS).send(messageJson)
        }

        res.status(200).send({result: dealsList.result})
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
            res.status(HTTP_CODES_RESPONSE.CREATED).send(message)
        } else {
            res.status(HTTP_CODES_RESPONSE.BAD_REQUEST)
        }
    } catch (error) {
        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST)
    }
})