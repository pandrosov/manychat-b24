import {Router, Response} from "express";
import {HTTP_CODES_RESPONSE, RequestWithBody, RequestWithBodyAndParams} from "../../types/common";
import {DealListParams, DealListReq, ManychatDealData} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrix-service";
import {BitrixRelation} from "../../types/bitrix/common";
import {MessageBuilder} from "../../helpers/manychat-messages";
import {IButton} from "../../types/manychat/input/input";
import * as dotenv from "dotenv";
import {BITRIX_DEAL_STATUS, DEAL_WIN_STATUSES} from "../../helpers/constants";
import {getDealFlow} from "../../helpers/helper";
import {DealsListResult} from "../../types/bitrix/output/bitrix-response";
dotenv.config();

export const dealRouter = Router({})
dealRouter.get('/:page_id/:id/all', async (req: RequestWithBodyAndParams<DealListParams, DealListReq>, res: Response) => {
    try {
        const id = req.params.id
        const pageId = req.params.page_id
        const buttonFlow = getDealFlow(pageId)
        const bitrix = new Bitrix24()
        const dealButtonFlow : string = buttonFlow
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
        const activeDeals = dealsList.result.filter((deal: DealsListResult) => {
            return !DEAL_WIN_STATUSES.includes(deal.STAGE_ID.split(":")[1]) && deal[BitrixRelation.DEAL_POST_ID]
        })

        if(activeDeals.length === 0) {
            const mcMessage = messageBuilder.addTextMessage("У тебя нет актуальных заданий.").build()
            res.status(HTTP_CODES_RESPONSE.SUCCESS).send(mcMessage)
        } else {
            const dealButton:IButton[] = [
                {
                    "type": "flow",
                    "caption": `Отправить отчет`,
                    "target": dealButtonFlow,
                    "actions": []
                }
            ]
            let textMessage = "";
            activeDeals.forEach(deal => {
                textMessage = `${textMessage} #Рассылка${deal[BitrixRelation.DEAL_POST_ID]} \n`
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