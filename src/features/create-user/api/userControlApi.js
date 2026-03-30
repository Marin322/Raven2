import { apiFetch } from "../../../shared";

export const createUser = (userData) => {
    return apiFetch('/user', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
};