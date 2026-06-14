import { useEffect, useState } from "react";
import { getStatistics } from "../api/admin.api";

const StatCard = ({ label, value }) => (
    <div className="border-2 border-border-bg rounded-xl p-4 flex flex-col gap-1">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-main-text text-2xl font-semibold">{value ?? "—"}</p>
    </div>
);

export const Statistics = () => {
    const [stats, setStats]     = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState("");

    useEffect(() => {
        getStatistics()
            .then(setStats)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-gray-400 text-center mt-10">Загрузка...</p>;
    if (error)   return <p className="text-red-400 text-center mt-10">{error}</p>;

    return (
        <div className="flex flex-col gap-5">
            <p className="text-2xl text-center">Статистика компании</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="Всего пользователей"   value={stats.totalUsers} />
                <StatCard label="Активных"               value={stats.activeUsers} />
                <StatCard label="Заморожено"             value={stats.frozenUsers} />
                <StatCard label="Онлайн сейчас"          value={stats.onlineNow} />
                <StatCard label="Отделов"                value={stats.totalDepartments} />
                <StatCard label="Чатов"                  value={stats.totalChats} />
                <StatCard label="Сообщений сегодня"      value={stats.messagesToday} />
                <StatCard label="Запрещённых слов"       value={stats.bannedWordsCount} />
            </div>
        </div>
    );
};