import {Router, Request, Response} from "express";

export const dealRouter = Router({})

dealRouter.get('/all', (req: Request, res: Response) => {
    // res.sendStatus(200)
})

dealRouter.get('/:id', (req: Request, res: Response) => {

})
dealRouter.post('/contact', (req: Request, res: Response) => {
    res.sendStatus(200)
})

dealRouter.put('/contact', (req: Request, res: Response) => {
    res.sendStatus(200)
})

