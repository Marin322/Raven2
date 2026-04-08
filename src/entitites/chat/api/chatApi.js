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

export const addNewUsersTargetChat = (usersIds, chatId) => {
    return apiFetch(`/chat/${chatId}/members`, {
        method: 'POST',
        body: JSON.stringify(usersIds)
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