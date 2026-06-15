const BASE_URL = "https://ravenapp.ru/api";
const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`,
});

// Отправка сообщения (текст + файл)
export const sendMessageApi = async (chatId, content, file = null) => {
    const formData = new FormData();
    formData.append("ChatId", chatId);
    formData.append("Content", content || "");
    if (file) formData.append("File", file);

    const response = await fetch(`${BASE_URL}/Message`, {
        method: "POST",
        headers: authHeaders(),
        body: formData,
    });
    if (!response.ok) throw new Error("Ошибка отправки сообщения");
    return response.json();
};

// История чата
export const getChatHistoryApi = async (chatId, page = 1, pageSize = 50) => {
    const response = await fetch(
        `${BASE_URL}/Message/chat/${chatId}?page=${page}&pageSize=${pageSize}`,
        { headers: authHeaders() }
    );
    if (!response.ok) throw new Error("Ошибка загрузки истории");
    return response.json();
};

// Редактирование сообщения
export const editMessageApi = async (id, content) => {
    const response = await fetch(`${BASE_URL}/Message/${id}`, {
        method: "PUT",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error("Ошибка редактирования");
    return response.json();
};

// Удаление сообщения
export const deleteMessageApi = async (id) => {
    const response = await fetch(`${BASE_URL}/Message/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Ошибка удаления");
};

// Пересылка сообщения
export const forwardMessageApi = async (messageId, targetChatId) => {
    const response = await fetch(`${BASE_URL}/Message/${messageId}/forward`, {
        method: "POST",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ targetChatId }),
    });
    if (!response.ok) throw new Error("Ошибка пересылки");
    return response.json();
};

// Поиск сообщений
export const searchMessagesApi = async (filter) => {
    const params = new URLSearchParams();
    params.append("ChatId", filter.chatId);
    params.append("SearchTerm", filter.searchTerm || "");
    if (filter.fromDate)  params.append("FromDate",  filter.fromDate);
    if (filter.toDate)    params.append("ToDate",    filter.toDate);
    if (filter.senderId)  params.append("SenderId",  filter.senderId);

    const response = await fetch(`${BASE_URL}/Message/search?${params}`, {
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Ошибка поиска");
    return response.json();
};