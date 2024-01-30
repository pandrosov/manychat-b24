import {Router, Request, Response} from "express";
import {HttpCodes} from "../../types/common";

export const dealRouter = Router({})

dealRouter.post('/test', (req:Request, res:Response) => {
    res.status(HttpCodes.SUCCESS).send({
        "version": "v2",
        "content": {
            "messages": [
                {
                    "type": "text",
                    "text": "simple text"
                }
            ]
        }
    })
})
dealRouter.get('/all', (req: Request, res: Response) => {
    // res.sendStatus(200)
})

dealRouter.get('/:id', (req: Request, res: Response) => {

})
dealRouter.post('/add', async (req: Request, res: Response) => {

})

dealRouter.put('/contact', (req: Request, res: Response) => {
    res.sendStatus(200)
})

