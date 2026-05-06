import { apiFetch, sendMessageApiBase } from "../../../shared";

export const fetchMyChats = () => {
    return apiFetch('/chat/my', {
        method: 'GET'
    });
};

export const getChatDetails = (chatId) => {
    return apiFetch(`/chat/${chatId}`, {
        method: 'GET'
    });
};

export const addNewUsersTargetChat2 = (usersIds, chatId) => {
    const body = {
        userIds: usersIds
    }
    return apiFetch(`/chat/${chatId}/members`, {
        method: 'POST',
        body: JSON.stringify(body)
    });
};

export const getChatHistory = (chatId) => {
    return apiFetch(`/message/chat/${chatId}`, {
        method: 'GET'
    });
};

export const sendMessageApi = (formData) => {
    return sendMessageApiBase(`/message`, {
        method: 'POST',
        body: formData
    });
};

export const createChat = (formData) => {
    return apiFetch(`/chat`, {
        method: 'POST',
        body: JSON.stringify(formData)
    });
};

export const updateChatApi = (chatId, data) => {
    return apiFetch(`/chat/${chatId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
};

export const deleteChatApi = (chatId) => {
    return apiFetch(`/chat/${chatId}`, {
        method: 'DELETE'
    });
};

export const uploadChatAvatarApi = (chatId, file) => {
    const formData = new FormData();
    formData.append("avatar", file); // Ключ "avatar" должен совпадать с C#

    return sendMessageApiBase(`/ChatAvatar/${chatId}`, {
        method: "POST",
        body: formData,
    });
};

export const deleteChatAvatarApi = (chatId) => {
    return apiFetch(`/ChatAvatar/${chatId}`, { 
        method: "DELETE" 
    });
};

export const getChatAvatarApi = (chatId) => {
    return apiFetch(`/ChatAvatar/${chatId}`, { 
        method: "GET" 
    });
};