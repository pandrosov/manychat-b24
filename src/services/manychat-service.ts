import axios, { AxiosInstance } from 'axios';
import {ManychatUserData} from "../types/bitrix/input/input";
import {IManyChatField} from "../types/manychat/common";
import {ManyChatUserDataResponse, ManyChatUserNameDataResponse} from "../types/manychat/output/manychat-respone";
import {ISetCustomFieldsData} from "../types/manychat/input/input";

class ManyChatService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://api.manychat.com/fb/',
            headers: {
                'Authorization': `Bearer ${process.env.MANYCHAT_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async getUserDataById(userId: number | string): Promise<ManyChatUserDataResponse> {
        try {
            const response = await this.axiosInstance.get(`subscriber/getInfo?subscriber_id=${userId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }

    async getUserDataByName(userName: string): Promise<ManyChatUserNameDataResponse> {
        try {
            const {data:response} = await this.axiosInstance.get(`subscriber/findByName?name=${encodeURIComponent(userName)}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }

    async getUserBySystemField(phone:string): Promise<ManyChatUserDataResponse> {
        try {
            const response = await this.axiosInstance.post(`subscriber/setCustomFields?phone=${encodeURIComponent(phone)}`);
            return response.data;
        } catch (error) {
            console.error('Error setting custom fields:', error);
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

    async setCustomFieldsForUser(data:ISetCustomFieldsData): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`subscriber/setCustomFields`, data);
            return response.data;
        } catch (error) {
            console.error('Error setting custom fields:', error);
            throw error;
        }
    }
}

export default ManyChatService;
