import {app} from './settings'

import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || "3030";

app.listen(port, async () => {
    console.log(`start server on port cc ${port}`)
})