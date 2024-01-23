import express from "express"
import {contactRoute} from "./routes/bitrix/contact-route"
import {dealRouter} from "./routes/bitrix/deal-route";

export const app = express()
app.use(express.json())

app.use("/contact", contactRoute)
app.use("/deal", dealRouter)