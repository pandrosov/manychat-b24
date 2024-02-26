import axios, {AxiosResponse} from 'axios';
import {BitrixRelation} from "../types/bitrix/common";
import {
    BitrixResponse,
    BitrixUserResponse,
    DealCreatedResponse, DealResponse,
    DealsList
} from "../types/bitrix/output/bitrix-response";
import {LeadRequest, ManychatDealData, ManychatUserData} from "../types/bitrix/input/input";
import {
    bitrixContactConvert,
    bitrixDealConvert,
    bitrixLeadConvert,
    bitrixUpdateContact
} from "../helpers/bitrix-convert";
import ManyChatService from "./manychat-service";
import {MessageBuilder} from "../helpers/manychat-messages";
import {ConvertedBitrixContact} from "../types/bitrix/output/output";

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

    async getUserById(bitrixId: string): Promise<BitrixUserResponse> {
        try {
            const response = await axios.post(`${this.webhookUrlProd}crm.contact.get`, {id: bitrixId});
            return response.data
        } catch (error) {
            throw error;
        }
    }

    async createContact(contactData: ManychatUserData): Promise<number> {
        try {
            const {custom_fields} = contactData
            const { bitrix_user_id} = custom_fields
            const userData = bitrixContactConvert(contactData)
            //!TODO
            // [] - валидация данных карточек (на 16 символов)
            if (!bitrix_user_id) {
                const response: AxiosResponse<BitrixResponse, any> = await axios.post(`${this.webhookUrlProd}crm.contact.add`, {fields: userData});
                return response.data.result
            } else {
                return await this.updateContact(bitrix_user_id, userData)
            }
        } catch (error) {
            console.error('Error creating contact:', error);
            throw error;
        }
    }

    async updateContact(bitrixId: string, updateData: ConvertedBitrixContact): Promise<number> {
        try {
            // !TODO
            // [+] - получаем по номеру телефона, мессенджерам и имейлам данные из карточки битры
            // [+] - обнуляем эти данные
            // [+] - записываем новые данные
            const bitrixProfile = await this.getUserById(bitrixId)
            const bitrixUpdateData = bitrixUpdateContact(bitrixProfile, updateData)
            const response = await axios.post(`${this.webhookUrlProd}crm.contact.update`, {
                id: bitrixId,
                fields: bitrixUpdateData
            });
            return response.data.result ? 1 : 0;
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

    async getDeal(dealId: number | string): Promise<DealResponse> {
        try {
            const deal = await axios.post(`${this.webhookUrlProd}crm.deal.get`, {
                id: dealId
            })

            return deal.data
        } catch (error) {
            throw error;
        }
    }

    async createDeal(dealData: ManychatDealData): Promise<DealCreatedResponse> {
        try {
            const {bitrix_id, post_id, id: telegramId} = dealData
            const filter = {
                filter: {
                    ["=" + BitrixRelation.DEAL_POST_ID]: post_id,
                    ["=" + BitrixRelation.DEAL_CONTACT_ID]: bitrix_id
                }
            }
            const dealsList = await this.getUserDeals(filter)
            const messageBuilder = new MessageBuilder();
            const manyChat = new ManyChatService()
            const {custom_fields} = await manyChat.getUserDataById(telegramId)
            const bitrixActiveDeals = custom_fields.find(item => item.id === 10490344)?.value as Array<number | string> || [];

            if (dealsList.total > 0) {
                const messageJson = messageBuilder
                    .addTextMessage("Вы уже взяли данную заявку, пожалуйста, ожидайте следующей рассылки")
                    .build()

                return {
                    result: post_id,
                    message: messageJson
                }
            }

            const mappingBitrixDeal = bitrixDealConvert(dealData)
            const dealResponse = await axios.post(`${this.webhookUrlProd}crm.deal.add`, {fields: mappingBitrixDeal});

            if (dealResponse.data.result) {
                await manyChat.setUserField({
                    subscriber_id: telegramId,
                    field_name: "bitrix_active_deals",
                    field_value: [...bitrixActiveDeals, dealResponse.data.result]
                })
                const messageJson = messageBuilder
                    .addTextMessage("Спасибо! После выполнения задания воспользуйтесь командой /report , что рассказать о своих результатах")
                    .build()
                return {
                    result: dealResponse.data.result,
                    message: messageJson
                };
            } else {
                const messageJson = messageBuilder
                    .addTextMessage("При создании заявки возникла проблема. Обратитесь в техническую поддержку: /support")
                    .build()
                return {
                    result: dealResponse.data.result,
                    message: messageJson
                };
            }
        } catch (error) {
            throw error;
        }
    }

    async getUserDeals(query: any): Promise<DealsList> {
        try {
            const dealsResponse = await axios.post(`${this.webhookUrlProd}crm.deal.list`, query);

            return dealsResponse.data
        } catch (error) {
            throw error
        }
    }

    async addEntityComment(type: string, id: number | string, comment: string): Promise<BitrixResponse> {
        try {
            const commentCreated = await axios.post(`${this.webhookUrlProd}crm.timeline.comment.add`, {
                fields: {
                    ENTITY_ID: id,
                    ENTITY_TYPE: type,
                    COMMENT: comment
                }
            })

            return commentCreated.data.result
        } catch (error) {
            throw error
        }
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