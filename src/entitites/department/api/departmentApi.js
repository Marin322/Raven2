import { apiFetch } from "../../../shared";

export const fetchDepartments = () => {
    return apiFetch('/department', {
        method: 'GET'
    });
};