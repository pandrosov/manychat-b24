import axios, {AxiosResponse} from 'axios';
import {BitrixRelation} from "../types/bitrix/common";
import {BitrixResponse} from "../types/bitrix/output/bitrix-response";
import {LeadRequest, ManychatDealData, ManychatUserData} from "../types/bitrix/input/input";
import e from "express";
import {bitrixContactConvert, bitrixDealConvert, bitrixLeadConvert} from "../helpers/bitrix-convert";
import ManychatService from "./manychat-service";

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

    async createContact(contactData: ManychatUserData): Promise<number> {
        try {
            const userData = bitrixContactConvert(contactData)
            const response:AxiosResponse<BitrixResponse, any> = await axios.post(`${this.webhookUrlProd}crm.contact.add`, { fields: userData });

            return response.data.result
        } catch (error) {
            console.error('Error creating contact:', error);
            throw error;
        }
    }

    async updateContact(contactId: number, updateData: ManychatUserData): Promise<void> {
        try {
            const response = await axios.post(`${this.webhookUrl}crm.contact.update`, { id: contactId, fields: updateData });
            console.log('Contact updated:', response);
        } catch (error) {
            console.error('Error updating contact:', error);
            throw error;
        }
    }

    async createLead(leadData: LeadRequest): Promise<number> {
        try {
            const convertedLeadData = bitrixLeadConvert(leadData)

            const response = await axios.post(`${this.webhookUrlProd}crm.lead.add`, {fields: convertedLeadData})
            return response.data.result
        } catch (error) {
            throw error;
        }
    }

    async createDeal(dealData: ManychatDealData): Promise<number> {
        try {
            const mappingBitrixDeal = bitrixDealConvert(dealData)
            console.log(mappingBitrixDeal)
            const response = await axios.post(`${this.webhookUrlProd}crm.deal.add`, {fields: mappingBitrixDeal});
            console.log(response.data)
            return response.data.result;
        } catch (error) {
            throw error;
        }
    }

    async updateDeal(contactId: number, updateData: ManychatUserData): Promise<void> {
        try {
            const response = await axios.post(`${this.webhookUrl}crm.deal.update`, { id: contactId, fields: updateData });
            console.log('Contact updated:', response);
        } catch (error) {
            console.error('Error updating contact:', error);
            throw error;
        }
    }
}