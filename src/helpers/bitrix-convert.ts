import {LeadRequest, ManychatDealData, ManychatUserData} from "../types/bitrix/input/input";
import {BitrixMultiplyField, BitrixRelation} from "../types/bitrix/common";
import {BitrixUserResponse} from "../types/bitrix/output/bitrix-response";
import {ConvertedBitrixContact} from "../types/bitrix/output/output";
import {BITRIX_CONST, bitrixIMArr, bitrixPhoneEmailArr, bitrixValues, SOCIAL_TYPE} from "./constants";

const extractBaseUrl = (url:string) => {
    const match = url.match(/^(https?:\/\/[^?]+)/);
    return match ? match[1] : url;
};

const determineSocialType = (url:string) => {
    if (url.includes("instagram.com")) {
        return SOCIAL_TYPE.INSTAGRAM;
    } else if (url.includes("t.me")) {
        return SOCIAL_TYPE.TELEGRAM;
    } else {
        return SOCIAL_TYPE.OTHER;
    }
};

const extractInstUsername = (url:string) => {
    const match = url.match(/instagram\.com\/([^/?]+)/);
    return match ? `https://instagram.com/${match[1]}` : url;
};

const findUrlsInString = (string:string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return string.match(urlRegex) || [];
};

const fillMultyFieldsBitrix = (socials:string, phone:string) => {
    const socialsOutput: any[] = [];
    const phoneOutput: any[] = [];

    const socialUrls = findUrlsInString(socials);
    socialUrls.forEach(rawUrl => {
        let url = extractBaseUrl(rawUrl.trim());
        let socialType = determineSocialType(url);

        if (socialType === SOCIAL_TYPE.INSTAGRAM) {
            url = extractInstUsername(url);
        }

        socialsOutput.push({
            VALUE_TYPE: socialType,
            VALUE: url
        });
    });

    phoneOutput.push({
        VALUE: phone,
        TYPE_ID: "PHONE"
    });

    return {
        socialUrls: socialsOutput,
        phones: phoneOutput
    };
};

export const bitrixContactConvert = (inputData: ManychatUserData): ConvertedBitrixContact => {
    const {id: telegramId, page_id: pageId} = inputData
    const profile_phone = inputData.phone
    const {
        profile_name,
        profile_socials,
        profile_address,
        profile_card,
        profile_dob,
        profile_fio_latin,
        bitrix_user_category,
        bitrix_user_region
    } = inputData.custom_fields
    const addressParts = profile_address?.split("/") || [];
    const [fact_address, pvz_address] = addressParts;
    const {socialUrls: socials, phones: phone} = fillMultyFieldsBitrix(profile_socials, profile_phone)

    return {
        [BitrixRelation.CONTACT_TYPE_ID]: BITRIX_CONST.CONTACT_TYPE[pageId],
        [BitrixRelation.CONTACT_NAME]: profile_name,
        [BitrixRelation.CONTACT_PHONE]: phone,
        [BitrixRelation.CONTACT_DOB]: profile_dob,
        [BitrixRelation.CONTACT_FIO_LATIN]: profile_fio_latin ?? "",
        [BitrixRelation.CONTACT_ADDRESS]: fact_address ? fact_address : profile_address,
        [BitrixRelation.CONTACT_OTH_ADDRESS]: pvz_address ? pvz_address : "",
        [BitrixRelation.CONTACT_CATEGORY]: bitrixValues[bitrix_user_category],
        [BitrixRelation.CONTACT_REGION]: bitrixValues[bitrix_user_region],
        [BitrixRelation.CONTACT_SOCIALS]: socials,
        [BitrixRelation.CONTACT_CARD_NUMBER]: profile_card,
        [BitrixRelation.CONTACT_TELEGRAM_ID]: telegramId,
        [BitrixRelation.CONTACT_ASSIGNED_ID]: BITRIX_CONST.CONTACT_ASSIGNED
    };
};


export const bitrixUpdateContact = (bitrixProfile: BitrixUserResponse, updateData: ConvertedBitrixContact) => {
    // получаем данные из B24
    const {
        IM: messangers,
        PHONE: phones,
    } = bitrixProfile.result
    messangers.forEach(item => item.VALUE = "")
    phones.forEach(item => item.VALUE = "")
    updateData[BitrixRelation.CONTACT_SOCIALS] = updateData[BitrixRelation.CONTACT_SOCIALS].concat(messangers)
    updateData[BitrixRelation.CONTACT_PHONE] = updateData[BitrixRelation.CONTACT_PHONE].concat(phones)

    // формируем новый массив данных
    return updateData;
}

export const bitrixLeadConvert = (leadData: LeadRequest): any => {
    const {records, phone, fullname, email} = leadData.data
    const comments = records.find(i => i.idx === '5')?.value || ''
    const region = records.find(i => i.idx === '6')?.value || ''

    return {
        [BitrixRelation.LEAD_NAME]: fullname,
        [BitrixRelation.LEAD_EMAIL]: [
            {
                VALUE_TYPE: "WORK",
                VALUE: email,
                TYPE_ID: "EMAIL"
            }
        ],
        [BitrixRelation.LEAD_PHONE]: [
            {
                VALUE_TYPE: "WORK",
                VALUE: phone,
                TYPE_ID: "PHONE"
            }
        ],
        [BitrixRelation.LEAD_TITLE]: 'TapLink Lead',
        [BitrixRelation.LEAD_COMMENTS]: comments + '</br> Регион ' + region,
        [BitrixRelation.LEAD_ASSIGNED_BY_ID]: 26733
    }
}

export const bitrixDealConvert = (dealData: ManychatDealData): any => {
    const {
        page_id,
        bitrix_id,
        profile_name,
        post_id,
        delivery,
        payment,
        cost,
        currency,
        products
    } = dealData

    return {
        [BitrixRelation.DEAL_TITLE]: profile_name + " Пост: " + post_id,
        [BitrixRelation.DEAL_CATEGORY_ID]: BITRIX_CONST.DEAL_CATEGORY[page_id],
        [BitrixRelation.DEAL_TYPE_ID]: BITRIX_CONST.DEAL_TYPE,
        [BitrixRelation.DEAL_CONTACT_ID]: bitrix_id,
        [BitrixRelation.DEAL_DELIVERY]: delivery,
        [BitrixRelation.DEAL_PAYMENT]: payment,
        [BitrixRelation.DEAL_COST]: cost,
        [BitrixRelation.DEAL_CURRENCY]: currency,
        [BitrixRelation.DEAL_POST_ID]: post_id,
        [BitrixRelation.DEAL_ASSIGNED_BY_ID]: BITRIX_CONST.DEAL_ASSIGNED
    }
}