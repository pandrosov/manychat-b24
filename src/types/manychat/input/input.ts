export interface IMessage {
    type: string;
    text?: string;
    buttons?: IButton[];
}

export interface IButton {
    type: string;
    caption: string;
    target: string;
    actions?: IAction[]; // Предполагаем, что IAction уже определен
}

export interface IAction {
    action: string,
    field_name: string,
    value: string | number | Array<number>
}

export interface ISetCustomFieldsData {
    subscriber_id: number;
    fields: Array<{
        field_name: string,
        field_id?: number,
        field_value: string | Date | number | Array<number | string>
    }>
}
export interface IQuickReply {
    // Определите структуру быстрого ответа здесь
}

export interface IMessageContent {
    type: string,
    messages: IMessage[];
    actions: IAction[];
    quick_replies: IQuickReply[];
}

export interface IManychatMessage {
    version: string;
    content: IMessageContent;
}