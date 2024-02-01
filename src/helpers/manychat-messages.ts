import {IAction, IManychatMessage, IQuickReply} from "../types/manychat/input/input";

export class MessageBuilder {
    private message: IManychatMessage;

    constructor() {
        this.message = {
            version: "v2",
            content: {
                type: "telegram",
                messages: [],
                actions: [],
                quick_replies: []
            }
        };
    }

    addTextMessage(text: string): MessageBuilder {
        this.message.content.messages.push({
            "type": "text",
            "text": text
        });
        return this;
    }

    addAction(action: IAction): MessageBuilder {
        this.message.content.actions.push(action);
        return this;
    }

    addQuickReply(quickReply: IQuickReply): MessageBuilder {
        this.message.content.quick_replies.push(quickReply);
        return this;
    }

    build(): IManychatMessage {
        return this.message;
    }
}

// Пример использования
// const builder = new MessageBuilder();
// const messageJson = builder
//     .addTextMessage("Привет, это тестовое сообщение!")
//     .addAction({ /* ваше действие */ })
//     .addQuickReply({ /* ваш быстрый ответ */ })
//     .build();