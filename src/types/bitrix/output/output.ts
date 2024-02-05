import {IManychatMessage} from "../../manychat/input/input";

export interface DealResponse {
    result: number | string,
    message: IManychatMessage
}