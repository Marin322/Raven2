import { apiFetch } from "../../../shared";

export const getStatistics = () =>
    apiFetch("/admin/statistics", { method: "GET" });

export const getAuditLogs = (filter = {}) => {
    const params = new URLSearchParams();
    if (filter.fromDate)   params.append("fromDate",   filter.fromDate);
    if (filter.toDate)     params.append("toDate",     filter.toDate);
    if (filter.userId)     params.append("userId",     filter.userId);
    if (filter.action)     params.append("action",     filter.action);
    if (filter.entityType) params.append("entityType", filter.entityType);
    if (filter.page)       params.append("page",       filter.page);
    if (filter.pageSize)   params.append("pageSize",   filter.pageSize);
    return apiFetch(`/admin/audit-logs?${params.toString()}`, { method: "GET" });
};

export const exportAuditLogs = async (fromDate, toDate) => {
    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate)   params.append("toDate",   toDate);
    const response = await fetch(`/api/admin/audit-logs/export?${params.toString()}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!response.ok) throw new Error("Ошибка экспорта");
    return response.blob();
};