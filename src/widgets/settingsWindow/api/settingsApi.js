import { apiFetch } from "../../../shared";

export const LogOutAccount = () => {
    return apiFetch(`/auth/logout`, {
        method: 'POST'
    });
};