import {apiFetch} from '../../../shared'

/**
 * Функция для авторизации
 * @param {string} username - юзернейм пользователя
 * @param {string} password - пароль пользователя
 * @returns {Promise<any>} результат запроса или ошибка
 * @example loginByPassword('superUser2004', '123456_+')
 */
export const loginByPassword = (username, password) => {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({username, password})
    });
};

/**
 * Функция для регистрации новой компании
 * @param {Object} userData - Данные пользователя
 * @returns {Promise<any>} результат запроса или ошибка
 * @example registerCompany(userData)
 */
export const registerCompany = (userData) => {
    return apiFetch('/auth/register-company', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}