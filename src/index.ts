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
        const {first_name, last_name} = msg.chat;
        const manyChatService = new ManyChatService()
        const bitrixService = new Bitrix24()
        if ('contact' in msg) {
            // Пользователь поделился контактом
            console.log("Пользователь поделился номером телефона:", msg?.contact?.phone_number);
        }
        // let userName = ""
        // if(first_name) {
        //     userName = first_name
        //     if(last_name) {
        //         userName = userName + " " + last_name
        //     }
        // }
        // const {data: manyChatUsers} = await manyChatService.getUserDataByName(userName)
        // const activeUser = manyChatUsers.find(user => user.status === "active" && user.first_name === first_name)
        //
        // let comment = ""
        //
        // if (msg.text) {
        //     comment = msg.text
        // }
        //
        // if (msg.photo) {
        //     const photoId = msg.photo[msg.photo.length - 1].file_id;
        //     comment = await bot.getFileLink(photoId);
        // }
        //
        // const newCommentLine = await bitrixService.addEntityComment(activeReportId ? "deal" : "contact", activeReportId ? activeReportId : bitrixId, comment)
        // console.log("New timeline comment ", newCommentLine)
    } catch (error) {
        console.error(error)
    }

});