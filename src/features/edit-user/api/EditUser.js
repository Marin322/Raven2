import { apiFetch } from "../../../shared";

export const editUser = (formData, userId) =>
    apiFetch(`/user/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
            fullName:     formData.fullName     || undefined,
            position:     formData.position     || undefined,
            departmentId: formData.departmentId || undefined,
        }),
    });

export const freezeUser = (userId) =>
    apiFetch(`/user/${userId}/toggle-freeze`, {
        method: "POST",
    });

export const deleteUser = (userId) =>
    apiFetch(`/user/${userId}`, {
        method: "DELETE",
    });