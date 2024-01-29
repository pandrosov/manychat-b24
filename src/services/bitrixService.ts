import axios, {AxiosResponse} from 'axios';
import {BitrixRelation} from "../types/bitrix/common";
import {BitrixResponse} from "../types/bitrix/output/bitrix-response";
import {ContactData, LeadData} from "../types/bitrix/input/input";

export class Bitrix24 {
    private readonly webhookUrl: string;
    private readonly webhookUrlProd: string;

    constructor() {
        this.webhookUrl = process.env.BITRIX_WEBHOOK_URL || '';
        this.webhookUrlProd = process.env.BITRIX_WEBHOOK_URL_PROD || '';
        if (!this.webhookUrl) {
            throw new Error('Bitrix webhook URL not provided in environment variables');
        }
    }

    async createContact(contactData: ContactData): Promise<number> {
        try {
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

    async createLead(leadData: LeadData): Promise<number> {
        try {
            const {records, phone, fullname, email} = leadData
            const response:AxiosResponse<BitrixResponse, any> = await axios.post(`${this.webhookUrl}crm.lead.add`, {
                NAME: fullname,
                EMAIL: email,
                TITLE: 'Tap link lead'
            })
            return response.data.result
        } catch (error) {
            console.error('Error during create lead: ', error)
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