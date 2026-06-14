import { useEffect, useState } from "react";
import { Input, Button, Select } from "../../../shared";
import {
  GetDeptUsers,
  CreateDeptManager,
  GetUsers,
  ChangeDeptSettings,
  UpdateDepartmentSettings, // новая функция, см. ниже
  DeleteDepartment,         // новая функция, см. ниже
} from "../api/GetDepatmentUsers";
import { useDepartmentStore } from "../../../entitites/department/model/useDepartmentStore";

export const EditDepartment = ({ deptData, onTabChanged }) => {
  const [deptUsers, setDeptUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const { departments, fetchDepartments, updateDepartment, removeDepartment } = useDepartmentStore();

  const [formData, setFormData] = useState({
    deptName: deptData?.name || "",
    deptId: deptData?.id || "",
    userId: "",
    allowRegularUsersToCreateChats: deptData?.allowRegularUsersToCreateChats ?? true,
  });
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingUsers(true);
      try {
        const users = formData.deptId
          ? await GetDeptUsers(formData.deptId)
          : await GetUsers();
        setDeptUsers(users || []);
      } finally {
        setIsLoadingUsers(false);
      }
    };
    fetchData();
  }, [formData.deptId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaveStatus("");

    if (name === "deptId") {
      // При смене отдела подтягиваем его текущие name/настройки из стора
      const selectedDept = departments.find((d) => d.id === value);
      setFormData((prev) => ({
        ...prev,
        deptId: value,
        deptName: selectedDept?.name || "",
        allowRegularUsersToCreateChats: selectedDept?.allowRegularUsersToCreateChats ?? true,
        userId: "",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleAllowChats = async (e) => {
    const checked = e.target.checked;
    setFormData((prev) => ({ ...prev, allowRegularUsersToCreateChats: checked }));

    if (!formData.deptId) return;
    try {
      const res = await UpdateDepartmentSettings(formData.deptId, checked);
      updateDepartment(formData.deptId, { allowRegularUsersToCreateChats: checked });
      setSaveStatus(res?.message || "Настройки обновлены");
    } catch (err) {
      setFormData((prev) => ({ ...prev, allowRegularUsersToCreateChats: !checked }));
      setSaveStatus(err.message);
    }
  };

  const handleSaveChanges = async () => {
    if (!formData.deptId) return;

    try {
      if (formData.userId) {
        const headAnswer = await CreateDeptManager(formData.userId, formData.deptId);
        setSaveStatus(headAnswer?.message);
      }

      if (formData.deptName) {
        const renameAnswer = await ChangeDeptSettings(formData.deptName, formData.deptId);
        setSaveStatus(renameAnswer?.message);
        updateDepartment(formData.deptId, { name: formData.deptName });
      }
    } catch (err) {
      setSaveStatus(err.message);
    }
  };

  const handleDelete = async () => {
    if (!formData.deptId) return;
    if (!window.confirm("Удалить отдел? Это возможно только если в нём нет активных сотрудников.")) return;

    try {
      await DeleteDepartment(formData.deptId);
      removeDepartment(formData.deptId);
      onTabChanged?.("departments");
    } catch (err) {
      setSaveStatus(err.message);
    }
  };

  return (
    <div className="gap-4 flex flex-col">
      <Select
        placeholder={formData.deptName || "Выберите отдел..."}
        label="Отдел"
        value={formData.deptId}
        onChange={handleChange}
        name="deptId"
      >
        {departments.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </Select>

      <Input
        label="Новое название отдела"
        name="deptName"
        value={formData.deptName}
        onChange={handleChange}
      />

      <label className="flex items-center gap-2 text-sm text-main-text">
        <input
          type="checkbox"
          checked={formData.allowRegularUsersToCreateChats}
          onChange={handleToggleAllowChats}
          disabled={!formData.deptId}
        />
        Разрешить обычным сотрудникам создавать чаты в этом отделе
      </label>

      <div className="mt-5">
        <p className="text-gray-400">Менеджер отдела</p>
        <div className="border-t-2 border-border-bg"></div>
      </div>
      <Select
        label="Пользователь"
        onChange={handleChange}
        value={formData.userId}
        name="userId"
      >
        {deptUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.fullName}
          </option>
        ))}
      </Select>

      <div className="flex gap-2">
        <Button children="Сохранить" onClick={handleSaveChanges} disabled={!formData.deptId} />
        <Button
          children="Удалить отдел"
          onClick={handleDelete}
          disabled={!formData.deptId}
          className="bg-red-500"
        />
      </div>
      {isLoadingUsers && <p className="text-sm text-gray-400">Загрузка сотрудников...</p>}
      <p>{saveStatus}</p>
    </div>
  );
};