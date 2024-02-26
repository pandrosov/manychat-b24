import {Router, Request, Response} from "express";
import {HTTP_CODES_RESPONSE, RequestWithBody} from "../../types/common";
import {ManychatUserData} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrix-service";
import {type} from "os";
import {MessageBuilder} from "../../helpers/manychat-messages";
import {validateAndFormatCardNumber} from "../../helpers/helper";

export const contactRoute = Router({})

contactRoute.post('/validate', (req: RequestWithBody<{last_input: string}>, res: Response) => {
    const lastInputCard = req.body.last_input
    const [isValid, card] = validateAndFormatCardNumber(lastInputCard)
    console.log(isValid, card)
    res.status(HTTP_CODES_RESPONSE.SUCCESS).send({card: card})
})

contactRoute.post('/add', async (req: RequestWithBody<ManychatUserData>, res: Response) => {
    try {
        const bitrixService = new Bitrix24()
        const response = await bitrixService.createContact(req.body)
        const builder = new MessageBuilder();

        if(response === 1) {
            const messageJson = builder
                .addTextMessage("Отлично, Ваши данные были изменены")
                .build()
            res.status(HTTP_CODES_RESPONSE.SUCCESS).send(messageJson)
            return
        } else if (response > 1) {
            const messageJson = builder
                .addTextMessage("Отлично! Мы заполнили профиль Самого лучшего амбассадора. Если какие-то твои контактные данные изменятся, ты всегда можешь обновить информацию нажав на кнопку “Мой профиль”. \n" +
                    "\n" +
                    "Если у тебя появятся какие-либо вопросы, ты можешь задать нам их нажав на кнопку /support")
                .addAction({
                    action: "set_field_value",
                    field_name: "bitrix_user_id",
                    value: response
                })
                .build()
            res.status(HTTP_CODES_RESPONSE.CREATED).send(messageJson)
            return
        } else {
            res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({error: 'contact created error'})
        }
    } catch(error) {
        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({
            status: "error",
            message: "Catch undefined error"
        })
    }
})

