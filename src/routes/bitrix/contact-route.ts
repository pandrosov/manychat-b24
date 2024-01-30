import {Router, Request, Response} from "express";
import {HttpCodes, RequestWithBody} from "../../types/common";
import {ManychatUserData} from "../../types/bitrix/input/input";
import {Bitrix24} from "../../services/bitrixService";
import {type} from "os";

export const contactRoute = Router({})

// contactRoute.get('/', (req: Request, res: Response) => {
//     // res.sendStatus(200)
//     res.status(200).send({"hello": "world"})
// })

contactRoute.post('/add', async (req: RequestWithBody<ManychatUserData>, res: Response) => {
    try {
        const bitrix = new Bitrix24()
        const response = await bitrix.createContact(req.body)

        if(response !== 0) {
            res.status(HttpCodes.CREATED).send({response})
        } else {
            res.status(HttpCodes.BAD_REQUEST).send({response})
        }

    } catch(error) {
        res.status(HttpCodes.BAD_REQUEST).send({error: error})
    }
})

contactRoute.post('/update', (req: Request, res: Response) => {
    res.sendStatus(200)
})

contactRoute.put('/delete', (req: Request, res: Response) => {
    res.sendStatus(200)
})

