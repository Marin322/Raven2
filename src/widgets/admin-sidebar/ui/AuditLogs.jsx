import { useEffect, useState } from "react";
import { Button, Input } from "../../../shared";
import { getAuditLogs, exportAuditLogs } from "../api/admin.api";

const ACTION_OPTIONS = [
    { value: "", label: "Все действия" },
    { value: "Create", label: "Создание" },
    { value: "Update", label: "Обновление" },
    { value: "Delete", label: "Удаление" },
];

export const AuditLogs = () => {
    const [logs, setLogs]         = useState([]);
    const [totalCount, setTotal]  = useState(0);
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState("");

    const [filter, setFilter] = useState({
        fromDate:   "",
        toDate:     "",
        entityType: "",
        action:     "",
        page:       1,
        pageSize:   20,
    });

    const fetchLogs = async (f = filter) => {
        setLoading(true);
        setError("");
        try {
            const data = await getAuditLogs(f);
            setLogs(data.items || []);
            setTotal(data.totalCount || 0);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLogs(); }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value, page: 1 }));
    };

    const handleSearch = () => fetchLogs({ ...filter, page: 1 });

    const handlePageChange = (newPage) => {
        const updated = { ...filter, page: newPage };
        setFilter(updated);
        fetchLogs(updated);
    };

    const handleExport = async () => {
        try {
            const blob = await exportAuditLogs(filter.fromDate || undefined, filter.toDate || undefined);
            const url  = URL.createObjectURL(blob);
            const a    = document.createElement("a");
            a.href     = url;
            a.download = `audit_logs_${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setError(err.message);
        }
    };

    const totalPages = Math.ceil(totalCount / filter.pageSize);

    return (
        <div className="flex flex-col gap-5">
            <p className="text-2xl text-center">Логи аудита</p>

            {/* Фильтры */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-sm">От</label>
                    <input
                        type="date" name="fromDate" value={filter.fromDate}
                        onChange={handleFilterChange}
                        className="border-2 border-border-bg bg-transparent rounded-lg p-2 text-main-text text-sm"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-sm">До</label>
                    <input
                        type="date" name="toDate" value={filter.toDate}
                        onChange={handleFilterChange}
                        className="border-2 border-border-bg bg-transparent rounded-lg p-2 text-main-text text-sm"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-sm">Тип сущности</label>
                    <input
                        type="text" name="entityType" value={filter.entityType}
                        placeholder="Например: BannedWord"
                        onChange={handleFilterChange}
                        className="border-2 border-border-bg bg-transparent rounded-lg p-2 text-main-text text-sm"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-sm">Действие</label>
                    <select
                        name="action" value={filter.action}
                        onChange={handleFilterChange}
                        className="border-2 border-border-bg bg-main-bg rounded-lg p-2 text-main-text text-sm"
                    >
                        {ACTION_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex gap-3">
                <Button onClick={handleSearch}>Применить</Button>
                <Button onClick={handleExport}>Скачать CSV</Button>
            </div>

            {error   && <p className="text-red-400 text-sm">{error}</p>}
            {loading && <p className="text-gray-400 text-sm">Загрузка...</p>}

            {/* Таблица */}
            <div className="overflow-x-auto rounded-xl border-2 border-border-bg">
                <table className="w-full text-sm text-main-text">
                    <thead>
                        <tr className="border-b-2 border-border-bg text-gray-400 text-left">
                            <th className="p-3">Дата</th>
                            <th className="p-3">Пользователь</th>
                            <th className="p-3">Действие</th>
                            <th className="p-3">Тип</th>
                            <th className="p-3">ID сущности</th>
                            <th className="p-3">IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 && !loading && (
                            <tr>
                                <td colSpan={6} className="p-5 text-center text-gray-400">
                                    Записей не найдено
                                </td>
                            </tr>
                        )}
                        {logs.map((log) => (
                            <tr key={log.id} className="border-b border-border-bg hover:bg-secondary-bg transition-colors">
                                <td className="p-3 whitespace-nowrap">
                                    {new Date(log.createdAt).toLocaleString("ru-RU")}
                                </td>
                                <td className="p-3">{log.userName}</td>
                                <td className="p-3">{log.action}</td>
                                <td className="p-3">{log.entityType}</td>
                                <td className="p-3 text-xs text-gray-400 truncate max-w-32">{log.entityId ?? "—"}</td>
                                <td className="p-3">{log.ipAddress ?? "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3">
                    <button
                        disabled={filter.page <= 1}
                        onClick={() => handlePageChange(filter.page - 1)}
                        className="px-3 py-1 border-2 border-border-bg rounded-lg text-main-text disabled:opacity-30"
                    >
                        ←
                    </button>
                    <span className="text-gray-400 text-sm">
                        {filter.page} / {totalPages} (всего {totalCount})
                    </span>
                    <button
                        disabled={filter.page >= totalPages}
                        onClick={() => handlePageChange(filter.page + 1)}
                        className="px-3 py-1 border-2 border-border-bg rounded-lg text-main-text disabled:opacity-30"
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    );
};