import { apiFetch } from "../../../shared";

export const CreateChat = (formData) => {
    return apiFetch(`/chat`, {
        method: 'POST',
        body: JSON.stringify(formData)
    });
};