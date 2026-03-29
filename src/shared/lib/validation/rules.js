export const isRequired = (value) => !value ? "Поле не может быть пустым" : null;

export const validatePasswordLength = (min) => (v) => v && v.length < min ? `Минимум ${min} символов` : null;

export const validateEmailFormat = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return !emailRegex.test(email) ? "Некорректный email" : null;
}