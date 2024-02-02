import {Router, Request, Response} from "express";
import {HTTP_CODES_RESPONSE, RequestWithBody} from "../../types/common";
import {ManychatDealData} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrix-service";
import ManychatService from "../../services/manychat-service";
import {MessageBuilder} from "../../helpers/manychat-messages";

export const dealRouter = Router({})

// dealRouter.post('/test', (req:Request, res:Response) => {
//     res.status(HTTP_CODES_RESPONSE.SUCCESS).send({
//         "version": "v2",
//         "content": {
//             "messages": [
//                 {
//                     "type": "text",
//                     "text": "simple text"
//                 }
//             ]
//         }
//     })
// })
dealRouter.get('/all', (req: Request, res: Response) => {
    // res.sendStatus(200)
})
dealRouter.post('/add', async (req: RequestWithBody<ManychatDealData>, res: Response) => {
    try {
        const bitrixService = new Bitrix24()
        const deal = await bitrixService.createDeal(req.body)
        console.log(deal)
        if(deal) {
            const builder = new MessageBuilder();
            const messageJson = builder
                .addTextMessage("Привет, это тестовое сообщение!")
                .addAction({
                    action: "set_field_value",
                    field_name: "bitrix_user_id",
                    value: [deal]
                })
            res.status(HTTP_CODES_RESPONSE.CREATED).send({...messageJson.message})
        }
    } catch (error) {
        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST)
    }
})