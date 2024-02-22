import {app} from './settings'
import * as dotenv from "dotenv";
import TelegramBot from 'node-telegram-bot-api';
import ManyChatService from "./services/manychat-service";
import {Bitrix24} from "./services/bitrix-service";
import axios from "axios";
dotenv.config();

const port = process.env.PORT || "3030";
const token = process.env.TG_TOKEN || ""
const bot = new TelegramBot(token);

app.listen(port, async () => {
    console.log(`start server on port ${port}`)
})

bot.setWebHook(`${process.env.TEST_WEBHOOK_URL}/webhook/bot${process.env.TG_TOKEN}`).then(response => {
    console.log('Webhook is setup')
})