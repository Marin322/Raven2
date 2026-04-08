import { apiFetch } from "../../../shared";

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