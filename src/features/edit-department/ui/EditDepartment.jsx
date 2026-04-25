import { useEffect, useState } from "react";
import { Input, Button, Select } from "../../../shared";
import {
  GetDeptUsers,
  CreateDeptManager,
  GetUsers,
  ChangeDeptSettings,
} from "../api/GetDepatmentUsers";
import { useDepartmentStore } from "../../../entitites/department/model/useDepartmentStore";
export const EditDepartment = ({ deptData }) => {
  const [deptUsers, setDeptUsers] = useState([]);
  const { departments, fetchDepartments } = useDepartmentStore();
  const [formData, setFormData] = useState({
    deptName: deptData?.name || "",
    deptId: deptData?.id || "",
    userId: "",
  });
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!deptData.id) {
        const data = await GetUsers();
        setDeptUsers(data);
      }
      if(formData.deptId) {
        const data = await GetDeptUsers(formData.deptId);
        setDeptUsers(data);
      }
    };
    fetchData();
    fetchDepartments();
  }, [formData?.deptId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaveStatus("");
    console.log(formData);
  };

  const SaveChanges = async () => {
    if (formData.userId && formData.deptId) {
      const createAnswer = await CreateDeptManager(formData.userId, formData.deptId);
      setSaveStatus(createAnswer.message)
    }

    if (formData.deptName && formData.deptId) {
      const changeAnswer = await ChangeDeptSettings(formData.deptName, formData.deptId);
      setSaveStatus((prev) => changeAnswer.message);
    } 
  };

  if (!deptUsers) return <div>Загрузка...</div>;

  return (
    <div className="gap-4 flex flex-col">
      <Select
        placeholder={`${deptData.name ? deptData.name : "Выберите отдел..."}`}
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
        onChange={handleChange}
      />
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
      <Button children="Сохранить" onClick={() => SaveChanges()} />
        <p>{saveStatus}</p>
    </div>
  );
};
