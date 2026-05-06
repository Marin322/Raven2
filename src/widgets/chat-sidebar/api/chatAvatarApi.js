import { apiFetch } from "./apiFetch";

export const uploadChatAvatarApi = async (chatId, file) => {
  const formData = new FormData();
  formData.append("avatar", file); // Ключ "avatar" соответствует параметру в C#

  return apiFetch(`/ChatAvatar/${chatId}`, {
    method: "POST",
    body: formData, // Не используем JSON.stringify, fetch сам поставит нужные заголовки
  });
};

export const deleteChatAvatarApi = (chatId) => {
  return apiFetch(`/ChatAvatar/${chatId}`, { method: "DELETE" });
};

export const getChatAvatarApi = (chatId) => {
  return apiFetch(`/ChatAvatar/${chatId}`, { method: "GET" });
};