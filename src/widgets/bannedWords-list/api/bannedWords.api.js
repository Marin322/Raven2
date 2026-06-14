import { apiFetch } from "../../../shared";

// Получить список запрещённых слов
export const getBannedWords = () =>
    apiFetch("/admin/banned-words", { method: "GET" });

// Добавить одно слово
export const addBannedWords = (word) =>
    apiFetch("/admin/banned-words", {
        method: "POST",
        body: JSON.stringify({ word }),
    });

// Массовое добавление (массив строк)
export const addBannedWordsBulk = (words) =>
    apiFetch("/admin/banned-words/bulk", {
        method: "POST",
        body: JSON.stringify({ words }),
    });

// Импорт из файла (.txt, одно слово на строку)
export const importBannedWords = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiFetch("/admin/banned-words/import", {
        method: "POST",
        body: formData,
        // Content-Type не выставляем — браузер сам добавит boundary для FormData
    });
};

// Удалить слово по id
export const deleteBannedWords = (id) =>
    apiFetch(`/admin/banned-words/${id}`, { method: "DELETE" });

// Статистика компании
export const getStatistics = () =>
    apiFetch("/admin/statistics", { method: "GET" });

// Логи аудита с фильтрами
export const getAuditLogs = (filter = {}) => {
    const params = new URLSearchParams();
    if (filter.fromDate) params.append("fromDate", filter.fromDate);
    if (filter.toDate)   params.append("toDate",   filter.toDate);
    if (filter.userId)   params.append("userId",   filter.userId);
    if (filter.action)   params.append("action",   filter.action);
    if (filter.entityType) params.append("entityType", filter.entityType);
    if (filter.page)     params.append("page",     filter.page);
    if (filter.pageSize) params.append("pageSize", filter.pageSize);
    return apiFetch(`/admin/audit-logs?${params.toString()}`, { method: "GET" });
};

// Экспорт логов в CSV (возвращает Blob)
export const exportAuditLogs = async (fromDate, toDate) => {
    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate)   params.append("toDate",   toDate);
    // apiFetch скорее всего парсит JSON — для файла нужен сырой fetch
    const response = await fetch(`/api/admin/audit-logs/export?${params.toString()}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!response.ok) throw new Error("Ошибка экспорта");
    return response.blob();
};