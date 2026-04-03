import { apiFetch } from "../../../shared";

export const fetchMyChats = () => {
    return apiFetch('/chat/my', {
        method: 'GET'
    });
};