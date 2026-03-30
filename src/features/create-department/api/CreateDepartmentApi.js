import { apiFetch } from "../../../shared";

export const createDepartment = (name) => {
    return apiFetch('/department', {
        method: 'POST',
        body: name
    });
};