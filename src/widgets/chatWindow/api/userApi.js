import { apiFetch } from "../../../shared";

export const getUsers = () => {
    return apiFetch('/user', {
        method: 'GET'
    })
}