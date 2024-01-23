import {Router, Request, Response} from "express";
import {HttpCodes, RequestWithBody} from "../../types/common";
import {BitrixContact, BitrixRelation} from "../../types/bitrix/common";
import {Bitrix24} from "../../services/bitrixService";

export const contactRoute = Router({})

contactRoute.get('/', (req: Request, res: Response) => {
    // res.sendStatus(200)
    res.status(200).send({"hello": "world"})
})

contactRoute.post('/add', async (req: RequestWithBody<BitrixContact>, res: Response) => {
    try {
        const {
            fio,
            phone,
            address,
            socials,
            card_number
        } = req.body

        const bitrix = new Bitrix24()
        const response = await bitrix.createContact({NAME: fio, LAST_NAME: phone})

        res.status(HttpCodes.CREATED).send({result: response})
    } catch(error) {
        res.status(404).send({error: error})
    }
})
contactRoute.post('/update', (req: Request, res: Response) => {
    res.sendStatus(200)
})

contactRoute.put('/delete', (req: Request, res: Response) => {
    res.sendStatus(200)
})

