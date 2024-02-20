import {NextFunction, Request, Response} from "express";
import {HTTP_CODES_RESPONSE} from "../../types/common";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization']
    if(!auth) {
        res.sendStatus(HTTP_CODES_RESPONSE.NO_AUTH)
        return
    }

    const [basic, token] = auth.split(' ')
    if(basic !== 'Basic') {
        res.sendStatus(HTTP_CODES_RESPONSE.NO_AUTH)
        return
    }

    const decodeData = Buffer.from(token, 'base64').toString()
    const [decodesLogin,decodedPwd] = decodeData.split(':')

    if(decodesLogin !== process.env.LOGIN || process.env.PWD) {
        res.sendStatus(HTTP_CODES_RESPONSE.NO_AUTH)
        return
    }

    return next()
}