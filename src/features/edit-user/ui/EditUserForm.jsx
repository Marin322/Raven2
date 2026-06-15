import { useState } from "react";
import { Input, Button } from "../../../shared";
import { editUser, freezeUser, deleteUser } from "../api/EditUser";
import { useDepartmentStore } from "../../../entitites/department/model/useDepartmentStore";
import { useEffect } from "react";

export const EditUserForm = ({ userId, initialData, onDeleted }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus]       = useState("");
    const [isFrozen, setIsFrozen]   = useState(initialData?.isFreeze ?? false);

    const { departments, fetchDepartments } = useDepartmentStore();

    const [formData, setFormData] = useState({
        fullName:     initialData?.fullName     || "",
        position:     initialData?.position     || "",
        departmentId: initialData?.departmentId || "",
    });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStatus("");
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!userId) return;
        setIsLoading(true);
        setStatus("");
        try {
            await editUser(formData, userId);
            setStatus("Изменения сохранены");
        } catch (err) {
            setStatus(err.message || "Ошибка при сохранении");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFreeze = async () => {
        if (!userId) return;
        setIsLoading(true);
        setStatus("");
        try {
            const result = await freezeUser(userId);
            setIsFrozen(result.isFrozen);
            setStatus(result.isFrozen ? "Пользователь заморожен" : "Пользователь разморожен");
        } catch (err) {
            setStatus(err.message || "Ошибка при заморозке");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!userId) return;
        if (!window.confirm("Удалить пользователя? Это действие необратимо.")) return;
        setIsLoading(true);
        setStatus("");
        try {
            await deleteUser(userId);
            onDeleted?.();
        } catch (err) {
            setStatus(err.message || "Ошибка при удалении");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-5">

            {/* Основные данные */}
            <Input
                label="ФИО"
                placeholder="Новое ФИО пользователя..."
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
            />
            <Input
                label="Должность"
                placeholder="Новая должность..."
                name="position"
                value={formData.position}
                onChange={handleChange}
            />

            {/* Смена отдела */}
            <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Отдел</label>
                <select
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    className="border-2 border-border-bg bg-main-bg rounded-lg p-2 text-main-text text-sm"
                >
                    <option value="">— не менять —</option>
                    {departments.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>
            </div>

            <Button onClick={handleSave} disabled={isLoading || !userId}>
                Сохранить
            </Button>

            {/* Заморозка */}
            <div className="mt-5">
                <p className="text-gray-400">Заморозка аккаунта</p>
                <div className="border-t-4 border-border-bg mb-4"></div>
            </div>

            <div className="flex items-center gap-3">
                <p className="text-[18px]">Статус:</p>
                <span className={isFrozen ? "text-blue-400" : "text-green-400"}>
                    {isFrozen ? "Заморожен" : "Активен"}
                </span>
            </div>
            <Button onClick={handleFreeze} disabled={isLoading || !userId}>
                {isFrozen ? "Разморозить" : "Заморозить"}
            </Button>

            {/* Удаление */}
            <div className="mt-5">
                <p className="text-gray-400">Опасная зона</p>
                <div className="border-t-4 border-border-bg mb-4"></div>
            </div>
            <Button
                onClick={handleDelete}
                disabled={isLoading || !userId}
                className="bg-red-500"
            >
                Удалить пользователя
            </Button>

            {status && (
                <p className="text-sm text-gray-400">{status}</p>
            )}
        </div>
    );
};