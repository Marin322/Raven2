import { apiFetch } from "../../../shared";

export const editUser = (userData, userId) => {
    return apiFetch(`/user/${userId}`, {
        method: 'POST',
        body: JSON.stringify(userData)
    });
};

export const freezeUser = (userId) => {
    return apiFetch(`/user/${userId}/toggle-freeze`, {
        method: 'POST'
    });
};