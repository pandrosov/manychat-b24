import axios, {AxiosResponse} from 'axios';
import {BitrixRelation} from "../types/bitrix/common";
import {BitrixResponse, DealsList} from "../types/bitrix/output/bitrix-response";
import {LeadRequest, ManychatDealData, ManychatUserData} from "../types/bitrix/input/input";
import e from "express";
import {bitrixContactConvert, bitrixDealConvert, bitrixLeadConvert} from "../helpers/bitrix-convert";
import ManychatService from "./manychat-service";
import ManyChatService from "./manychat-service";
import {MessageBuilder} from "../helpers/manychat-messages";
import {DealResponse} from "../types/bitrix/output/output";

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
            const response: AxiosResponse<BitrixResponse, any> = await axios.post(`${this.webhookUrlProd}crm.contact.add`, {fields: userData});

            return response.data.result
        } catch (error) {
            console.error('Error creating contact:', error);
            throw error;
        }
    }

    async updateContact(contactId: number, updateData: ManychatUserData): Promise<void> {
        try {
            const response = await axios.post(`${this.webhookUrl}crm.contact.update`, {
                id: contactId,
                fields: updateData
            });
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

    async createDeal(dealData: ManychatDealData): Promise<DealResponse> {
        try {
            const {bitrix_id, post_id, id: telegramId} = dealData
            const dealsList = await this.getUserDeals(post_id, bitrix_id)
            const builder = new MessageBuilder();
            const manyChat = new ManyChatService()
            const {custom_fields} = await manyChat.getUserDataById(dealData.bitrix_id)
            const {bitrix_active_deals, bitrix_closed_deals} = custom_fields

            if(dealsList.total > 0 && (bitrix_active_deals.includes(post_id) || bitrix_closed_deals.includes(post_id))) {
                const messageJson = builder
                    .addTextMessage("Вы уже взяли данную заявку, пожалуйста, ожидайте следующей рассылки")

                return {
                    result: post_id,
                    message: {...messageJson.message}
                }
            }

            const mappingBitrixDeal = bitrixDealConvert(dealData)
            const messageJson = builder
                .addTextMessage("Спасибо! После выполнения задания воспользуйтесь командой /report , что рассказать о своих результатах")
            const dealResponse = await axios.post(`${this.webhookUrlProd}crm.deal.add`, {fields: mappingBitrixDeal});

            const setField = manyChat.setUserField({
                subscriber_id: telegramId,
                field_name: "bitrix_active_deals",
                field_value: dealResponse.data.result
            })

            return {
                result: dealResponse.data.result,
                message: {...messageJson.message}
            };
        } catch (error) {
            throw error;
        }
    }

    async getUserDeals(postId: string, userId: number): Promise<DealsList> {
        const dealsResponse = await axios.post(`${this.webhookUrlProd}crm.deal.add`, {
            filter: {
                ["=" + BitrixRelation.DEAL_POST_ID]: postId,
                ["=" + BitrixRelation.DEAL_CONTACT_ID]: userId
            }
        });

        return dealsResponse.data
    }

    async updateDeal(contactId: number, updateData: ManychatUserData): Promise<void> {
        try {
            const response = await axios.post(`${this.webhookUrl}crm.deal.update`, {id: contactId, fields: updateData});
            console.log('Contact updated:', response);
        } catch (error) {
            console.error('Error updating contact:', error);
            throw error;
        }
    }
}