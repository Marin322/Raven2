export const baseURL = "https://ravenapp.ru/api";

class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

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

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

// ПРАВКА ТУТ: Добавлена обработка текстовых ошибок, как в первой функции
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
        
        // Вместо await response.json(), который падает на строке
        const errorText = await response.text();
        let errorMessage = 'Ошибка сервера';
        
        try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.message || errorMessage;
        } catch {
            // Если пришла просто строка (твой случай), берем её как есть
            errorMessage = errorText;
        }
        
        throw new ApiError(response.status, errorMessage);
    }

    // Для успеха тоже лучше использовать проверку на наличие текста
    const successText = await response.text();
    return successText ? JSON.parse(successText) : {};
}