import {app} from './settings'
import * as dotenv from "dotenv";
import TelegramBot from 'node-telegram-bot-api';
import ManyChatService from "./services/manychat-service";
import {Bitrix24} from "./services/bitrix-service";
import axios from "axios";

dotenv.config();

const port = process.env.PORT || "3030";
const token = process.env.TG_TOKEN || ""
const bot = new TelegramBot(token, {polling: true});

app.listen(port, async () => {
    console.log(`start server on port ${port}`)
})

bot.on('message', async (msg) => {
    try {
        // !TODO
        // [+] - отлавливаем события по заполнению данных
        // [+] - находим пользователя
        // [] - выставляем chat id в профиль пользователя
        // [] - проверяем есть ли активная сделка
        // [] - отправляем сообщение в битрикс или в сделку
        console.log(msg)
        const bitrixService = new Bitrix24()
        const manyChatService = new ManyChatService()

        if ('contact' in msg && msg?.contact?.phone_number !== '') {
            console.log(msg.contact)
            const manyChatUser = await manyChatService.getUserBySystemField(msg?.contact?.phone_number || "")
            const {custom_fields} = manyChatUser
            const bitrixUserId = custom_fields.find(field => field.name === "bitrix_user_id")

            let comment = ""


            if(bitrixUserId) {
                if(msg.text && msg.from) {
                    comment = msg.text
                }

                if (msg.photo && msg.from) {
                    msg.photo.forEach((photo) => {
                        const photoId = photo.file_id;

                        bot.getFileLink(photoId).then((link) => {
                            comment = comment + link + " "
                        });
                    });
                }


                const activeReportId = custom_fields.find(field => field.name === "profile_report_deal")?.value as (string | number) || ""
                if(activeReportId.toString()) {
                    const newTimeLineDeal = await bitrixService.addEntityComment("deal", activeReportId, comment)
                    if(newTimeLineDeal.result) {
                        console.log("Add comment to deal")
                    } else {
                        console.log(`Not working bitrixUserId=${bitrixUserId} activeDeal=${activeReportId}`)
                    }
                } else {
                    const newTimeLineDContact = await bitrixService.addEntityComment("contact", bitrixUserId.toString(), comment)
                    if(newTimeLineDContact.result) {
                        console.log("Add comment to contact")
                    } else {
                        console.log(`Not working bitrixUserId=${bitrixUserId} activeDeal=${activeReportId}`)
                    }
                }
            }
        }
    } catch (error) {
        console.error(error)
    }

});