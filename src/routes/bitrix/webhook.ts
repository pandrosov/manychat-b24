import {Router, Request, Response} from "express";
import {HTTP_CODES_RESPONSE, RequestWithBody} from "../../types/common";
import {WebhookBody} from "../../types/webhook";
import {Bitrix24} from "../../services/bitrix-service";
import ManychatService from "../../services/manychat-service";
import {BitrixRelation} from "../../types/bitrix/common";
import {BITRIX_DEAL_STATUS} from "../../helpers/constants";

export const webhookRouter = Router({})

webhookRouter.post('/', async(req: RequestWithBody<WebhookBody>, res: Response) => {
    try {
        const bitrix = new Bitrix24()
        const manyChat = new ManychatService()
        const {event, data: reqData, auth} = req.body
        console.log(`${event} with id ${reqData.FIELDS.ID} and auth token ${auth}`)
        // switch (event) {
        //     case "ONCRMDEALDELETE": {
        //         const deal = await bitrix.getDeal(reqData.FIELDS.ID)
        //         const {CATEGORY_ID: tunnelId, CONTACT_ID: bitrixId, STAGE_ID: status} = deal.result
        //         if(tunnelId === 35) {
        //             const bitrixUser = await bitrix.getUserById(bitrixId)
        //             const manyChatUser = await manyChat.getUserDataById(bitrixUser.result[BitrixRelation.CONTACT_TELEGRAM_ID])
        //             const {custom_fields} = manyChatUser
        //             const bitrixActiveDeals = custom_fields.find(item => item.name === "bitrix_active_deals")?.value as Array<number | string> || [];
        //             const bitrixClosedDeals = custom_fields.find(item => item.name === "bitrix_closed_deals")?.value as Array<number | string> || [];
        //             let filteredActiveDeals: (string|number)[] = []
        //             let filteredClosedDeals: (string|number)[] = []
        //
        //
        //             if(bitrixActiveDeals.includes(reqData.FIELDS.ID) || bitrixClosedDeals.includes(reqData.FIELDS.ID)) {
        //                 filteredActiveDeals = bitrixActiveDeals.filter(deal => deal === reqData.FIELDS.ID)
        //                 filteredClosedDeals = bitrixClosedDeals.filter(deal => deal === reqData.FIELDS.ID)
        //             }
        //
        //             const updManyChatUser = await manyChat.setCustomFieldsForUser({
        //                 subscriber_id: manyChatUser.id,
        //                 fields: [
        //                     {
        //                         field_name: 'bitrix_active_deals',
        //                         field_value: filteredActiveDeals
        //                     },
        //                     {
        //                         field_name: 'bitrix_closed_deals',
        //                         field_value: filteredClosedDeals
        //                     }
        //                 ]
        //             })
        //
        //             if(updManyChatUser.status === "success") {
        //                 res.sendStatus(HTTP_CODES_RESPONSE.SUCCESS)
        //                 break;
        //             } else {
        //                 res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
        //                     status: "error",
        //                     message: "bad request during updating manychat user"
        //                 })
        //             }
        //
        //         }
        //         break;
        //     }
        //     case "ONCRMDEALUPDATE": {
        //         // !TODO
        //         // [+] - получаем сделку
        //         // [+] - проверяем воронку
        //         // [+] - проверяем статус сделки (если статус сделки изменился на положительный - перекидываем сделки в bitrix_closed deals)
        //         // [+] - отправляем данные в мэничат
        //         const deal = await bitrix.getDeal(reqData.FIELDS.ID)
        //         const {CATEGORY_ID: tunnelId, CONTACT_ID: bitrixId, STAGE_ID: status} = deal.result
        //         if(tunnelId === 35) {
        //             const bitrixUser = await bitrix.getUserById(bitrixId)
        //             const manyChatUser = await manyChat.getUserDataById(bitrixUser.result[BitrixRelation.CONTACT_TELEGRAM_ID])
        //             const {custom_fields} = manyChatUser
        //             const bitrixActiveDeals = custom_fields.find(item => item.name === "bitrix_active_deals")?.value as Array<number | string> || [];
        //             const bitrixClosedDeals = custom_fields.find(item => item.name === "bitrix_closed_deals")?.value as Array<number | string> || [];
        //
        //             // если сделка не имеет положительного статуса
        //             if(status !== BITRIX_DEAL_STATUS.checked || status !== BITRIX_DEAL_STATUS.success || status !== BITRIX_DEAL_STATUS.failed) {
        //                 if(bitrixClosedDeals.includes(reqData.FIELDS.ID)) {
        //                     // то возвращаем closed в active
        //                     const filteredClosedDeals = bitrixClosedDeals.filter(item => {
        //                         if(item === reqData.FIELDS.ID) {
        //                             bitrixActiveDeals.push(item)
        //                             return false
        //                         }
        //
        //                         return true
        //                     })
        //                 }
        //             } else {
        //                 // если сделка закрыта или проверен отчет
        //                 if(bitrixActiveDeals.includes(reqData.FIELDS.ID)) {
        //                     // то мы меняем статус на
        //                     const filteredClosedDeals = bitrixActiveDeals.filter(item => {
        //                         if(item === reqData.FIELDS.ID) {
        //                             bitrixClosedDeals.push(item)
        //                             return false
        //                         }
        //
        //                         return true
        //                     })
        //                 }
        //             }
        //
        //             const updManyChatUser = await manyChat.setCustomFieldsForUser({
        //                 subscriber_id: manyChatUser.id,
        //                 fields: [
        //                     {
        //                         field_name: 'bitrix_active_deals',
        //                         field_value: bitrixActiveDeals
        //                     },
        //                     {
        //                         field_name: 'bitrix_closed_deals',
        //                         field_value: bitrixClosedDeals
        //                     }
        //                 ]
        //             })
        //
        //             if(updManyChatUser.status === "success") {
        //                 res.sendStatus(HTTP_CODES_RESPONSE.SUCCESS)
        //                 break;
        //             } else {
        //                 res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
        //                     status: "error",
        //                     message: "bad request during updating manychat user"
        //                 })
        //             }
        //
        //         }
        //
        //         break;
        //     }
        //     case "ONCRMCONTACTUPDATE":
        //         // !TODO
        //         // [+] - проверяем является ли контрагент амбассадором
        //         // [+] - получаем все необходимые данные из битры
        //         // [+] - получаем все кастомные поля из мэничат
        //         // [+] - получаем идентификаторы кастомных полей
        //         // [+] - формируем массив и отправляем исправленные данные в мэничат
        //         const bitrixUser = await bitrix.getUserById(req.body.data.FIELDS.ID)
        //         if(bitrixUser.result[BitrixRelation.CONTACT_TYPE_ID] === "UC_2HCWL8") {
        //             const manyChatUserId = +bitrixUser.result[BitrixRelation.CONTACT_TELEGRAM_ID]
        //             const socials = bitrixUser.result[BitrixRelation.CONTACT_SOCIALS].map(item => item.VALUE).join(',')
        //             const address = `${bitrixUser.result[BitrixRelation.CONTACT_ADDRESS]}/${bitrixUser.result[BitrixRelation.CONTACT_OTH_ADDRESS]}`
        //
        //             const updManyChatUser = await manyChat.setCustomFieldsForUser({
        //                 subscriber_id: manyChatUserId,
        //                 fields: [
        //                     {
        //                         field_name: 'profile_name',
        //                         field_value: bitrixUser.result[BitrixRelation.CONTACT_NAME]
        //                     },
        //                     {
        //                         field_name: 'profile_address',
        //                         field_value: address
        //                     },
        //                     {
        //                         field_name: 'profile_socials',
        //                         field_value: socials
        //                     },
        //                     {
        //                         field_name: 'profile_card',
        //                         field_value: bitrixUser.result[BitrixRelation.CONTACT_CARD_NUMBER]
        //                     }
        //                 ]
        //             })
        //
        //             if(updManyChatUser.status === "success") {
        //                 res.sendStatus(HTTP_CODES_RESPONSE.SUCCESS)
        //                 break;
        //             } else {
        //                 res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
        //                     status: "error",
        //                     message: "bad request during updating manychat user"
        //                 })
        //             }
        //         }
        //         break;
        // }
    } catch (error) {
        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
            status: "error",
            message: "bitrix hook troubles"
        })
    }
})