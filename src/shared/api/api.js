export const baseURL = "https://ravenapp.ru/api";

class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

/**
 * Функция для отрпавки запросов
 * @param {string} endpoint - ендпоинт к контроллеру на сервере
 * @param {Object} options - дополнительные опции в запросе
 * @returns {Promise<any>} результат запроса или ошибка
 * @example apiFetch("/users/getusers")
 */
export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    };
    const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.clear();
            window.location.href = "/auth";
            return;
        }
        const errorText = await response.text();
        let errorData = {};
        try { errorData = JSON.parse(errorText); } catch { errorData = { message: errorText }; }

        throw new ApiError(response.status, errorData.message || 'Ошибка сервера');
    }

    const text = await response.text(); // Сначала берем ответ как текст
    return text ? JSON.parse(text) : {};
}

export const sendMessageApiBase = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    };
    const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.clear();
            window.location.href = "/auth";
            return;
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Ошибка сервера');
    }

    return response.json();
}