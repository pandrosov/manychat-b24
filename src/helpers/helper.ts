export function validateAndFormatCardNumber(input: string) {
    const sanitizedInput = input.replace(/[\s.,?!]+/g, '');
    const isValid = /^\d{16}$/.test(sanitizedInput);

    // Форматируем номер карты, если он валиден
    const formattedNumber = isValid ? sanitizedInput.replace(/(\d{4})(?=\d)/g, '$1 ') : null;

    return [isValid, formattedNumber];
}