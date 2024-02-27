import {Router, Response} from "express";
import {HTTP_CODES_RESPONSE, RequestWithBody, RequestWithBodyAndParams} from "../../types/common";
import {DealListParams, DealListReq, ManychatDealData} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrix-service";
import {BitrixRelation} from "../../types/bitrix/common";
import {MessageBuilder} from "../../helpers/manychat-messages";
import {IButton} from "../../types/manychat/input/input";
import * as dotenv from "dotenv";
import {BITRIX_DEAL_STATUS, DEAL_WIN_STATUSES} from "../../helpers/constants";
dotenv.config();

export const dealRouter = Router({})
dealRouter.get('/:id/all', async (req: RequestWithBodyAndParams<DealListParams, DealListReq>, res: Response) => {
    try {
        const id = req.params.id
        const bitrix = new Bitrix24()
        const dealButtonFlow = process.env.MANYCHAT_DEAL_BUTTON_FLOW || "content20240222162533_755256"
        const query = {
            filter: {
                ["=" + BitrixRelation.DEAL_CONTACT_ID]: id
            },
            SELECT: ["*", BitrixRelation.DEAL_POST_ID]
        }
        const messageBuilder = new MessageBuilder()
        // !TODO
        // [] - передать статусы
        const dealsList = await bitrix.getUserDeals(query)
        const activeDeals = dealsList.result.filter(deal => !DEAL_WIN_STATUSES.includes(deal.STAGE_ID))

        if(activeDeals.length === 0) {
            const mcMessage = messageBuilder.addTextMessage("У тебя нет актуальных заданий.").build()
            res.status(HTTP_CODES_RESPONSE.SUCCESS).send(mcMessage)
        } else {
            const dealButton:IButton[] = []
            let textMessage = "";
            activeDeals.forEach(deal => {
                textMessage = `${textMessage} #Рассылка${deal[BitrixRelation.DEAL_POST_ID]} \n`
                dealButton.push({
                    "type": "flow",
                    "caption": `#Рассылка${deal[BitrixRelation.DEAL_POST_ID]}`,
                    "target": dealButtonFlow,
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
                .addTextMessage("Твои актуальные задания \n" + textMessage)
                .addButtonsToTextMessage(dealButton)
                .build()

            res.status(HTTP_CODES_RESPONSE.SUCCESS).send(messageJson)
        }
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