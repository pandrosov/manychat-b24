import express from "express"
import {contactRoute} from "./routes/bitrix/contact-route"
import {dealRouter} from "./routes/bitrix/deal-route";
import {leadRoute} from "./routes/bitrix/lead-route";
import {webhookRouter} from "./routes/bitrix/webhook";

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/contact", contactRoute)
app.use("/deal", dealRouter)
app.use("/lead", leadRoute)
app.use("/webhook", webhookRouter)