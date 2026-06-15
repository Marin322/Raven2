const BASE_URL = "https://ravenapp.ru/api";
const getToken = () => localStorage.getItem("token");
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });
const jsonHeaders = () => ({ ...authHeaders(), "Content-Type": "application/json" });

// Удалить участника из чата
export const removeMemberApi = (chatId, userId) =>
    fetch(`${BASE_URL}/Chat/${chatId}/members/${userId}`, {
        method: "DELETE",
        headers: authHeaders(),
    }).then(r => { if (!r.ok) throw new Error("Ошибка удаления участника"); });

// Изменить роль участника
export const updateMemberRoleApi = (chatId, userId, role) =>
    fetch(`${BASE_URL}/Chat/${chatId}/members/${userId}/role`, {
        method: "PUT",
        headers: jsonHeaders(),
        body: JSON.stringify({ role }),
    }).then(r => { if (!r.ok) throw new Error("Ошибка изменения роли"); });

// Добавить участников
export const addMembersApi = (chatId, userIds) =>
    fetch(`${BASE_URL}/Chat/${chatId}/members`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({ userIds }),
    }).then(r => { if (!r.ok) throw new Error("Ошибка добавления участников"); });