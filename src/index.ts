import {app} from './settings'
import * as dotenv from "dotenv";
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const port = process.env.PORT || "3030";
const token = process.env.TG_TOKEN || ""
const bot = new TelegramBot(token, { polling: true });

app.listen(port, async () => {
    console.log(`start server on port ${port}`)
})

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     console.log(msg);
//
//     // Пример отправки ответа
//     if (msg.text?.toLowerCase() === 'hello') {
//         bot.sendMessage(chatId, 'Привет! Как я могу помочь тебе сегодня?');
//     }
// });