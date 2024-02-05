import {LeadRequest, ManychatDealData, ManychatUserData} from "../types/bitrix/input/input";
import {BitrixMultiplyField, BitrixRelation} from "../types/bitrix/common";
import {Mapping} from "../types/common";
import {Bitrix24} from "../services/bitrix-service";

const SOCIAL_TYPE = {
    INSTAGRAM: "INSTAGRAM",
    TELEGRAM: "TELEGRAM",
};

const bitrixValues: Mapping = {
    common: "3705",
    animal: "3707",
    ru: "3709",
    by: "3713",
    kz: "3711"
}

const BITRIX_CONST = {
    CONTACT_TYPE: "UC_2HCWL8",
    CONTACT_ASSIGNED: 26355,
    DEAL_ASSIGNED: 26355,
    DEAL_TYPE: 1,
    DEAL_CATEGORY: 35
}

const extractInstUsername = (url: string): string => {
    return (url.match(/instagram\.com\/([^/?]+)/) || [])[1] || "Невалидная ссылка";
}

export const bitrixContactConvert = (inputData: ManychatUserData): any => {
    const telegramId = inputData.id
    const profile_phone = inputData.phone
    const {
        profile_name,
        profile_socials,
        profile_address,
        profile_card,
        bitrix_user_category ,
        bitrix_user_region
    } = inputData.custom_fields
    const addressParts = profile_address?.split("/") || [];
    const [fact_address, pvz_address] = addressParts;
    const bitrixIMArr:BitrixMultiplyField = {
        VALUE_TYPE: "OTHER",
        VALUE: "",
        TYPE_ID: "IM"
    };
    const bitrixPhoneEmailArr:BitrixMultiplyField = {
        VALUE_TYPE: "WORK",
        VALUE: "",
        TYPE_ID: "IM"
    };
    const socials:BitrixMultiplyField[] = [];
    // const email:BitrixMultiplyField[] = [];
    const phone:BitrixMultiplyField[] = [];

    const socialUrls = profile_socials?.split(",") || [];
    socialUrls.forEach(url => {
        const socialType = url.includes("instagram.com") ? SOCIAL_TYPE.INSTAGRAM :
                                  url.includes("t.me") ? SOCIAL_TYPE.TELEGRAM :
                                  url.includes("tiktok.com") ? "OTHER" : "OTHER";
        if(url.includes("instagram.com")) {
            url = extractInstUsername(url)
        }
        socials.push({
            ...bitrixIMArr,
            VALUE_TYPE: socialType,
            VALUE: url
        });
    });

    // email.push({
    //     ...bitrixPhoneEmailArr,
    //     VALUE: profile_email ? profile_email : "",
    //     TYPE_ID: "EMAIL"
    // })

    phone.push({
        ...bitrixPhoneEmailArr,
        VALUE: profile_phone,
        TYPE_ID: "PHONE"
    })


    return {
        [BitrixRelation.CONTACT_TYPE_ID]: BITRIX_CONST.CONTACT_TYPE,
        [BitrixRelation.CONTACT_NAME]: profile_name,
        [BitrixRelation.CONTACT_EMAIL]: fact_address,
        [BitrixRelation.CONTACT_PHONE]: phone,
        [BitrixRelation.CONTACT_ADDRESS]: fact_address,
        [BitrixRelation.CONTACT_OTH_ADDRESS]: pvz_address,
        [BitrixRelation.CONTACT_CATEGORY]: bitrixValues[bitrix_user_category],
        [BitrixRelation.CONTACT_REGION]: bitrixValues[bitrix_user_region],
        [BitrixRelation.CONTACT_SOCIALS]: socials,
        [BitrixRelation.CONTACT_CARD_NUMBER]: profile_card,
        [BitrixRelation.CONTACT_TELEGRAM_ID]: telegramId,
        [BitrixRelation.CONTACT_ASSIGNED_ID]: BITRIX_CONST.CONTACT_ASSIGNED
    };
};


export const bitrixLeadConvert = (leadData: LeadRequest):any => {
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
        [BitrixRelation.LEAD_COMMENTS]: comments  + '</br> Регион ' + region,
        [BitrixRelation.LEAD_ASSIGNED_BY_ID]: 26733
    }
}

export const bitrixDealConvert = (dealData:ManychatDealData) : any => {
    const {
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
        [BitrixRelation.DEAL_TITLE]: profile_name + "Пост: " + post_id,
        [BitrixRelation.DEAL_CATEGORY_ID]: BITRIX_CONST.DEAL_CATEGORY,
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