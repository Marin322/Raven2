import {apiFetch} from '../../../shared'

/**
 * Функция для авторизации
 * @param {string} email - электронная почта пользователя
 * @param {string} password - пароль пользователя
 * @returns {Promise<any>} результат запроса или ошибка
 * @example loginByEmail('userTest@mail.ru', '123456_+')
 */
export const loginByEmail = (email, password) => {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({email, password})
    });
};

/**
 * Функция для регистрации новой компании
 * @param {Object} userData - Данные пользователя
 * @returns {Promise<any>} результат запроса или ошибка
 * @example loginByEmail('userTest@mail.ru', '123456_+')
 */
export const registerCompany = (userData) => {
    return apiFetch('/auth/register-company', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}