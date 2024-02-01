export interface IMessage {
    type: string;
    text?: string;
}

export interface IAction {
    action: string,
    field_name: string,
    value: string
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