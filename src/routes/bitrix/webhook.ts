import {Router, Request, Response} from "express";
import {HTTP_CODES_RESPONSE, RequestWithBody} from "../../types/common";
import {WebhookBody} from "../../types/webhook";
import {Bitrix24} from "../../services/bitrix-service";
import ManychatService from "../../services/manychat-service";
import {BitrixRelation} from "../../types/bitrix/common";
import {BITRIX_DEAL_STATUS, DEAL_WIN_STATUSES} from "../../helpers/constants";
import * as dotenv from "dotenv";
import ManyChatService from "../../services/manychat-service";
dotenv.config();

export const webhookRouter = Router({})
// const tgToken = process.env.TG_TOKEN

// webhookRouter.post(`/bot${tgToken}`, async(req: Request, res: Response) => {
//     try {
        // !TODO
        // [+] - отлавливаем события по заполнению данных
        // [+] - находим пользователя
        // [] - выставляем chat id в профиль пользователя
        // [] - проверяем есть ли активная сделка
        // [] - отправляем сообщение в битрикс или в сделку
        // console.log(req.body.from)
        // res.status(HTTP_CODES_RESPONSE.SUCCESS).send(req.body)
        // const bitrixService = new Bitrix24()
        // const manyChatService = new ManyChatService()

        // if ('contact' in msg && msg?.contact?.phone_number !== '') {
        //     console.log(msg.contact)
        //     const manyChatUser = await manyChatService.getUserBySystemField(msg?.contact?.phone_number || "")
        //     const {custom_fields} = manyChatUser
        //     const bitrixUserId = custom_fields.find(field => field.name === "bitrix_user_id")
        //
        //     let comment = ""
        //
        //
        //     if (bitrixUserId) {
        //         if (msg.text && msg.from) {
        //             comment = msg.text
        //         }
        //
        //         if (msg.photo && msg.from) {
        //             msg.photo.forEach((photo) => {
        //                 const photoId = photo.file_id;
        //
        //                 bot.getFileLink(photoId).then((link) => {
        //                     comment = comment + link + " "
        //                 });
        //             });
        //         }
        //
        //
        //         const activeReportId = custom_fields.find(field => field.name === "profile_report_deal")?.value as (string | number) || ""
        //         if (activeReportId.toString()) {
        //             const newTimeLineDeal = await bitrixService.addEntityComment("deal", activeReportId, comment)
        //             if (newTimeLineDeal.result) {
        //                 console.log("Add comment to deal")
        //             } else {
        //                 console.log(`Not working bitrixUserId=${bitrixUserId} activeDeal=${activeReportId}`)
        //             }
        //         } else {
        //             const newTimeLineDContact = await bitrixService.addEntityComment("contact", bitrixUserId.toString(), comment)
        //             if (newTimeLineDContact.result) {
        //                 console.log("Add comment to contact")
        //             } else {
        //                 console.log(`Not working bitrixUserId=${bitrixUserId} activeDeal=${activeReportId}`)
        //             }
        //         }
        //     }
        // }
//     } catch (error) {
//         console.error(error)
//         res.status(HTTP_CODES_RESPONSE.BAD_REQUEST)
//     }
// })

webhookRouter.post('/RtOpE49ZjE', async(req: RequestWithBody<WebhookBody>, res: Response) => {
    try {
        const bitrix = new Bitrix24()
        const manyChat = new ManychatService()
        const {event, data: reqData, auth} = req.body
        const reqId = reqData.FIELDS.ID

        console.log(`${event} with id ${reqId} and auth token ${auth}`)
        switch (event) {
            case "ONCRMDEALDELETE": {
                const deal = await bitrix.getDeal(reqId)
                const {CATEGORY_ID: tunnelId, CONTACT_ID: bitrixId, STAGE_ID: status} = deal.result
                if(tunnelId === "35") {
                    const bitrixUser = await bitrix.getUserById(bitrixId)
                    const manyChatUser = await manyChat.getUserDataById(bitrixUser.result[BitrixRelation.CONTACT_TELEGRAM_ID])
                    const {custom_fields} = manyChatUser
                    const bitrixActiveDeals = custom_fields.find(item => item.name === "bitrix_active_deals")?.value as Array<number | string> || [];
                    const bitrixClosedDeals = custom_fields.find(item => item.name === "bitrix_closed_deals")?.value as Array<number | string> || [];
                    let filteredActiveDeals: (string|number)[] = []
                    let filteredClosedDeals: (string|number)[] = []

                    if(bitrixActiveDeals.includes(+reqId) || bitrixClosedDeals.includes(+reqId)) {
                        filteredActiveDeals = bitrixActiveDeals.filter(deal => deal !== +reqId)
                        filteredClosedDeals = bitrixClosedDeals.filter(deal => deal !== +reqId)
                    }

                    const updManyChatUser = await manyChat.setCustomFieldsForUser({
                        subscriber_id: manyChatUser.id,
                        fields: [
                            {
                                field_name: 'bitrix_active_deals',
                                field_value: filteredActiveDeals
                            },
                            {
                                field_name: 'bitrix_closed_deals',
                                field_value: filteredClosedDeals
                            }
                        ]
                    })

                    if(updManyChatUser.status === "success") {
                        res.status(HTTP_CODES_RESPONSE.SUCCESS).send(updManyChatUser.status)
                    } else {
                        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
                            status: "error",
                            message: "bad request during updating manychat user"
                        })
                    }

                } else {
                    res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
                        status: "error",
                        message: "another tunnel for deal"
                    })
                }
                break;
            }
            case "ONCRMDEALUPDATE": {
                // !TODO
                // [+] - получаем сделку
                // [+] - проверяем воронку
                // [+] - проверяем статус сделки (если статус сделки изменился на положительный - перекидываем сделки в bitrix_closed deals)
                // [+] - отправляем данные в мэничат
                const deal = await bitrix.getDeal(reqId)
                const {CATEGORY_ID: tunnelId, CONTACT_ID: bitrixId, STAGE_ID: status} = deal.result
                if(tunnelId === "35") {
                    const bitrixUser = await bitrix.getUserById(bitrixId)
                    const manyChatUser = await manyChat.getUserDataById(bitrixUser.result[BitrixRelation.CONTACT_TELEGRAM_ID])
                    const {custom_fields} = manyChatUser
                    const bitrixActiveDeals = custom_fields.find(item => item.name === "bitrix_active_deals")?.value as Array<number | string> || [];
                    const bitrixClosedDeals = custom_fields.find(item => item.name === "bitrix_closed_deals")?.value as Array<number | string> || [];
                    let filteredActiveDeals: (string | number)[] = bitrixActiveDeals
                    let filteredClosedDeals: (string | number)[] = bitrixClosedDeals

                    // если сделка не имеет положительного статуса
                    if(!DEAL_WIN_STATUSES.includes(reqId)) {
                        if(filteredClosedDeals.includes(+reqId)) {
                            // то возвращаем closed в active
                            filteredClosedDeals = bitrixClosedDeals.filter(item => {
                                if(item === +reqId) {
                                    filteredActiveDeals.push(item)
                                    return false
                                }

                                return true
                            })
                        }
                    } else {
                        // если сделка закрыта или проверен отчет
                        if(filteredActiveDeals.includes(+reqId)) {
                            // то мы меняем статус на
                            filteredActiveDeals = bitrixClosedDeals.filter(item => {
                                if(item === +reqId) {
                                    filteredClosedDeals.push(item)
                                    return false;
                                }

                                return true;
                            })
                        }
                    }

                    const updManyChatUser = await manyChat.setCustomFieldsForUser({
                        subscriber_id: manyChatUser.id,
                        fields: [
                            {
                                field_name: 'bitrix_active_deals',
                                field_value: filteredActiveDeals
                            },
                            {
                                field_name: 'bitrix_closed_deals',
                                field_value: filteredClosedDeals
                            }
                        ]
                    })

                    if(updManyChatUser.status === "success") {
                        res.status(HTTP_CODES_RESPONSE.SUCCESS).send(updManyChatUser.status)
                    } else {
                        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
                            status: "error",
                            message: "bad request during updating manychat user"
                        })
                    }

                } else {
                    res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
                        status: "error",
                        message: "another tunnel for deal"
                    })
                }

                break;
            }
            case "ONCRMCONTACTUPDATE":
                // !TODO
                // [+] - проверяем является ли контрагент амбассадором
                // [+] - получаем все необходимые данные из битры
                // [+] - получаем все кастомные поля из мэничат
                // [+] - получаем идентификаторы кастомных полей
                // [+] - формируем массив и отправляем исправленные данные в мэничат
                const bitrixUser = await bitrix.getUserById(reqId)
                if(bitrixUser.result[BitrixRelation.CONTACT_TYPE_ID] === "UC_2HCWL8") {
                    const manyChatUserId = +bitrixUser.result[BitrixRelation.CONTACT_TELEGRAM_ID]
                    const socials = bitrixUser.result[BitrixRelation.CONTACT_SOCIALS].map(item => item.VALUE).join(',')
                    const address = `${bitrixUser.result[BitrixRelation.CONTACT_ADDRESS]}/${bitrixUser.result[BitrixRelation.CONTACT_OTH_ADDRESS]}`

                    const updManyChatUser = await manyChat.setCustomFieldsForUser({
                        subscriber_id: manyChatUserId,
                        fields: [
                            {
                                field_name: 'profile_name',
                                field_value: bitrixUser.result[BitrixRelation.CONTACT_NAME]
                            },
                            {
                                field_name: 'profile_address',
                                field_value: address
                            },
                            {
                                field_name: 'profile_socials',
                                field_value: socials
                            },
                            {
                                field_name: 'profile_card',
                                field_value: bitrixUser.result[BitrixRelation.CONTACT_CARD_NUMBER]
                            }
                        ]
                    })

                    if(updManyChatUser.status === "success") {
                        res.status(HTTP_CODES_RESPONSE.SUCCESS).send(updManyChatUser.status)
                    } else {
                        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
                            status: "error",
                            message: "bad request during updating manychat user"
                        })
                    }
                } else {
                    res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
                        status: "error",
                        message: "another tunnel for deal"
                    })
                }
                break;
        }
    } catch (error) {
        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
            status: "error",
            message: "bitrix hook troubles"
        })
    }
})