import axios, { AxiosInstance } from 'axios';
import {ManychatUserData} from "../types/bitrix/input/input";
import {IManyChatField} from "../types/manychat/common";

class ManyChatService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://api.manychat.com/fb/', // Пример базового URL
            headers: {
                'Authorization': `Bearer ${process.env.MANYCHAT_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async getUserDataById(userId: number): Promise<ManychatUserData> {
        try {
            const response = await this.axiosInstance.get(`subscriber/getInfo?subscriber_id=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }
    async setUserField(fieldData: IManyChatField): Promise<string> {
        try {
            const response = await this.axiosInstance.post(`subscriber/setCustomFieldByName`, fieldData);
            return response.data;
        } catch (error) {
            console.error('Error updating user data:', error);
            throw error;
        }
    }
}

export default ManyChatService;
