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
        // [+] - получить данные юзера
        // [+] - проверить есть ли открытый отчет для заполнения
        // [+] - если нет - пишем в карточку КА, если есть - пишем в сделку активную
        const chatId = msg.chat.id;
        const manyChatService = new ManyChatService()
        const bitrixService = new Bitrix24()

        const manyChatUser = await manyChatService.getUserDataById(chatId)
        const activeReportId: string = manyChatUser.custom_fields.find(item => item.name === 'profile_report_deal')?.value as ""
        const bitrixId = manyChatUser.custom_fields.find(item => item.name === 'bitrix_id')?.value as ""

        let comment = ""

        if (msg.text) {
            comment = msg.text
        }

        if (msg.photo) {
            const photoId = msg.photo[msg.photo.length - 1].file_id;
            comment = await bot.getFileLink(photoId);
        }

        const newCommentLine = await bitrixService.addEntityComment(activeReportId ? "deal" : "contact", activeReportId ? activeReportId : bitrixId, comment)
        console.log("New timeline comment ", newCommentLine)
    } catch (error) {
        console.error(error)
    }

});