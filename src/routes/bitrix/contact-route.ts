import {Router, Request, Response} from "express";
import {HTTP_CODES_RESPONSE, RequestWithBody} from "../../types/common";
import {ManychatUserData} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrix-service";
import {type} from "os";
import {MessageBuilder} from "../../helpers/manychat-messages";

export const contactRoute = Router({})

// contactRoute.get('/', (req: Request, res: Response) => {
//     // res.sendStatus(200)
//     res.status(200).send({"hello": "world"})
// })

contactRoute.post('/add', async (req: RequestWithBody<ManychatUserData>, res: Response) => {
    try {
        const bitrixService = new Bitrix24()
        const response = await bitrixService.createContact(req.body)

        if(response !== 0) {
            const builder = new MessageBuilder();
            const messageJson = builder
                .addTextMessage("Отлично! Мы заполнили профиль Самого лучшего амбассадора. Если какие-то твои контактные данные изменятся, ты всегда можешь обновить информацию нажав на кнопку “Мой профиль”. \n" +
                    "\n" +
                    "Если у тебя появятся какие-либо вопросы, ты можешь задать нам их нажав на кнопку /support")
                .addAction({
                    action: "set_field_value",
                    field_name: "bitrix_user_id",
                    value: response
                })
            res.status(HTTP_CODES_RESPONSE.CREATED).send({...messageJson.message})
        } else {
            res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({contact_id: response})
        }

    } catch(error) {
        res.status(HTTP_CODES_RESPONSE.BAD_REQUEST).send({error: error})
    }
})

contactRoute.post('/update', (req: Request, res: Response) => {
    res.sendStatus(200)
})

contactRoute.put('/delete', (req: Request, res: Response) => {
    res.sendStatus(200)
})

