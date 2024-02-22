import {IAction, IButton, IManychatMessage, IQuickReply} from "../types/manychat/input/input";

export class MessageBuilder {
    public message: IManychatMessage;

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
            type: "text",
            text: text
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

    addButtonsToTextMessage(buttons: IButton[]): MessageBuilder {
        const lastMessage = this.message.content.messages[this.message.content.messages.length - 1];
        if (lastMessage && lastMessage.type === "text") {
            // Если lastMessage.buttons не определено, инициализируем пустым массивом
            if (!("buttons" in lastMessage)) {
                lastMessage["buttons"] = [];
            }
            // Добавляем кнопки к последнему текстовому сообщению
            lastMessage?.buttons?.push(...buttons);
        }
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