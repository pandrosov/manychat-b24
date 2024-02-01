import axios, { AxiosInstance } from 'axios';

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

    async getUserData(userId: string): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`subscriber/getInfo?subscriber_id=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }

    async updateUserData(userId: string, data: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`subscriber/updateData?subscriber_id=${userId}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating user data:', error);
            throw error;
        }
    }
}

export default ManyChatService;
