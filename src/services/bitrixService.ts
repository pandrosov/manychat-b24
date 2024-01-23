import axios, {AxiosResponse} from 'axios';
import {ContactData} from "../types/bitrix/common";
import {BitrixResponse} from "../types/bitrix/output/bitrix-response";

export class Bitrix24 {
    private webhookUrl: string;

    constructor() {
        this.webhookUrl = process.env.BITRIX_WEBHOOK_URL || '';
        if (!this.webhookUrl) {
            throw new Error('Bitrix webhook URL not provided in environment variables');
        }
    }

    async createContact(contactData: ContactData): Promise<number> {
        try {
            console.log(process.env.BITRIX_WEBHOOK_URL)
            const response:AxiosResponse<BitrixResponse, any> = await axios.post(`${this.webhookUrl}crm.contact.add`, { fields: contactData });
            return response.data.result
        } catch (error) {
            console.error('Error creating contact:', error);
            throw error;
        }
    }

    async updateContact(contactId: number, updateData: ContactData): Promise<void> {
        try {
            const response = await axios.post(`${this.webhookUrl}crm.contact.update`, { id: contactId, fields: updateData });
            console.log('Contact updated:', response);
        } catch (error) {
            console.error('Error updating contact:', error);
            throw error;
        }
    }

    async createDeal(contactId: number, updateData: ContactData): Promise<void> {
        try {
            const response = await axios.post(`${this.webhookUrl}crm.deal.create`, { id: contactId, fields: updateData });
            console.log('Contact updated:', response);
        } catch (error) {
            console.error('Error updating contact:', error);
            throw error;
        }
    }

    async updateDeal(contactId: number, updateData: ContactData): Promise<void> {
        try {
            const response = await axios.post(`${this.webhookUrl}crm.deal.update`, { id: contactId, fields: updateData });
            console.log('Contact updated:', response);
        } catch (error) {
            console.error('Error updating contact:', error);
            throw error;
        }
    }
}