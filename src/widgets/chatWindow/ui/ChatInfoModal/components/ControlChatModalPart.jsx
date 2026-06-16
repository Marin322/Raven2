import { useEffect, useState } from "react";
import { Button } from "../../../../../shared";
import { useChatStore } from "../../../../../entitites/chat/model/useChatStore";

const ROLE_LABELS = {
    0: "Участник",
    1: "Модератор",
    2: "Руководитель",
    Member: "Участник",
    Moderator: "Модератор",
    Head: "Руководитель",
};

const ROLE_OPTIONS = [
    { value: 0, label: "Участник" },
    { value: 1, label: "Модератор" },
];

export const ControlChatModalPart = ({ chatId }) => {
    const [selectUsers, setSelectUsers] = useState([]);
    const [status, setStatus] = useState("");
    
    // Достаем методы удаления и смены роли прямо из нашего Zustand стора!
    const { 
        activeChatDetails, 
        fetchChatDetails, 
        addNewUsersTargetChat, 
        deleteChat, 
        removeMember, 
        updateMemberRole 
    } = useChatStore();

    // Все пользователи компании
    const [allUsers, setAllUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    useEffect(() => {
        fetchChatDetails(chatId);
    }, [chatId]);

    useEffect(() => {
        const load = async () => {
            setLoadingUsers(true);
            try {
                const token = localStorage.getItem("token");
                const r = await fetch("https://ravenapp.ru/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await r.json();
                setAllUsers(Array.isArray(data) ? data : []);
            } catch { }
            finally { setLoadingUsers(false); }
        };
        load();
    }, []);

    const members = activeChatDetails?.members || [];

    // Участники, которых ещё нет в чате
    const memberIds = new Set(members.map(m => m.userId));
    const nonMembers = allUsers.filter(u => !memberIds.has(u.id));

    const toggleUser = (id) =>
        setSelectUsers(prev =>
            prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
        );

    const handleAddUsers = async () => {
        if (!selectUsers.length) return;
        try {
            await addNewUsersTargetChat(selectUsers, chatId);
            // Ручной сброс кэша больше не нужен, Zustand сам всё обновит внутри себя
            await fetchChatDetails(chatId);
            setSelectUsers([]);
            setStatus("Участники добавлены");
        } catch (err) {
            setStatus(err.message);
        }
    };

    const handleRemoveMember = async (userId) => {
        if (!window.confirm("Удалить участника из чата?")) return;
        try {
            // Вызываем метод из стора. Он сам сделает запрос на бэкенд ravenapp.ru 
            // и уберет юзера из списка без жесткой перезагрузки
            await removeMember(chatId, userId);
            setStatus("Участник удалён");
        } catch (err) {
            setStatus(err.message);
        }
    };

    const handleRoleChange = async (userId, role) => {
        try {
            // Вызываем метод из стора. Передаем chatId, userId и роль
            await updateMemberRole(chatId, userId, Number(role));
            setStatus("Роль изменена");
        } catch (err) {
            setStatus(err.message);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Удалить чат навсегда?")) return;
        try {
            await deleteChat(chatId);
        } catch (err) {
            setStatus(err.message);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            {/* Текущие участники */}
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-main-text">Участники чата</p>
                <div className="flex flex-col gap-2 max-h-52 overflow-y-auto">
                    {members.map(member => (
                        <div
                            key={member.userId}
                            className="flex items-center justify-between p-2 border border-border-bg rounded-xl"
                        >
                            <div className="flex flex-col">
                                <span className="text-sm text-main-text">{member.fullName}</span>
                                <span className="text-xs text-gray-400">
                                    {ROLE_LABELS[member.role] ?? member.role}
                                    {member.isOnline && (
                                        <span className="ml-2 text-green-500">● онлайн</span>
                                    )}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Смена роли (не для руководителя) */}
                                {member.role !== 2 && member.role !== "Head" && (
                                    <select
                                        className="text-xs border border-border-bg bg-main-bg rounded p-1 text-main-text"
                                        value={typeof member.role === "number" ? member.role : 0}
                                        onChange={(e) => handleRoleChange(member.userId, e.target.value)}
                                    >
                                        {ROLE_OPTIONS.map(o => (
                                            <option key={o.value} value={o.value}>{o.label}</option>
                                        ))}
                                    </select>
                                )}
                                {/* Удалить (не руководителя) */}
                                {member.role !== 2 && member.role !== "Head" && (
                                    <button
                                        onClick={() => handleRemoveMember(member.userId)}
                                        className="text-red-400 text-xs hover:text-red-600 px-1 font-bold"
                                        title="Удалить из чата"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Добавить участников */}
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-main-text">Добавить участников</p>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto border border-border-bg rounded-xl p-2">
                    {loadingUsers && <p className="text-gray-400 text-xs">Загрузка...</p>}
                    {!loadingUsers && nonMembers.length === 0 && (
                        <p className="text-gray-400 text-xs">Все пользователи уже в чате</p>
                    )}
                    {nonMembers.map(user => (
                        <div
                            key={user.id}
                            onClick={() => toggleUser(user.id)}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                                selectUsers.includes(user.id)
                                    ? "bg-blue-50 border border-blue-300"
                                    : "hover:bg-gray-50 border border-transparent"
                            }`}
                        >
                            <span className="text-sm text-main-text">{user.fullName}</span>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                                selectUsers.includes(user.id)
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-gray-400"
                            }`} />
                        </div>
                    ))}
                </div>
                <Button disabled={selectUsers.length === 0} onClick={handleAddUsers}>
                    Добавить выбранных ({selectUsers.length})
                </Button>
            </div>

            {/* Удалить чат */}
            <div className="pt-2 border-t border-border-bg">
                <button
                    onClick={handleDelete}
                    className="w-full p-2 text-red-500 border border-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                    Удалить чат
                </button>
            </div>

            {status && <p className="text-xs text-gray-400 text-center">{status}</p>}
        </div>
    );
};