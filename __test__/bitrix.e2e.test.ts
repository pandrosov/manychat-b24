import request from "supertest"
import {app} from "../src/settings"
import {describe} from "node:test";

describe('/bitrix', () => {
    it('test', async () => {
        const res = await request(app).get('/bitrix/');
        expect(res.status).toBe(200)
    })
})