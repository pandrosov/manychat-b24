export function validateAndFormatCardNumber(input: string) {
    const sanitizedInput = input.replace(/[\s.,?!]+/g, '');
    const isValid = /^\d{16}$/.test(sanitizedInput);

    // Форматируем номер карты, если он валиден
    const formattedNumber = isValid ? sanitizedInput.replace(/(\d{4})(?=\d)/g, '$1 ') : null;

    return [isValid, formattedNumber];
}

export function getKeyByValue(obj: Record<string, string>, value: string): string | undefined {
    const entry = Object.entries(obj).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined; // Возвращаем ключ, если найдено
}

export function getDealFlow(pageId: string): string | undefined {
    // Генерируем ключ для переменной окружения на основе pageId
    const tokenEnv = `MANYCHAT_DEAL_BUTTON_FLOW_${pageId}`;

    // Получаем токен из process.env и проверяем, что он существует
    const token = process.env[tokenEnv];

    if (!token) {
        console.warn(`Token for pageId ${pageId} not found in environment variables.`);
    }

    return token;  // Возвращаем токен или undefined, если переменная не найдена
}