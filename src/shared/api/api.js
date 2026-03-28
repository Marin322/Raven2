export const baseURL = "https://ravenapp.ru/api";

export const apiFetch = async (endpoint, options = {}) => {
    const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Ошибка сервера');
    }

    return response.json();
}