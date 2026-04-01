import { useEffect, useState } from "react";
import { Button, Input } from "../../../shared";
import { validate } from "../model/validate";
import { useUserStore } from "../../../entitites/user";
import { useDepartmentStore } from "../../../entitites/department";
import { Select } from "../../../shared";
export const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    departmentId: "",
  });
  const [errors, setErrors] = useState({});
  const { createUser, isLoading } =
    useUserStore();
  const { departments, fetchDepartments } = useDepartmentStore();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const result = await createUser(formData);
      if (result.success) {
        setFormData({
          fullName: "",
          username: "",
          password: "",
          departmentId: "",
        });
        alert("Пользователь успешно создан");
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, server: err.message }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="gap-4 flex flex-col">
      <Input
        onChange={handleChange}
        name="fullName"
        value={formData.fullName}
        label="ФИО"
        error={errors?.fullName}
        placeholder="Введите ФИО пользователя"
      />
      <Input
        onChange={handleChange}
        name="username"
        value={formData.username}
        label="Никнейм"
        error={errors?.username}
        placeholder="Введите никнейм пользователя"
      />
      <Input
        onChange={handleChange}
        name="password"
        value={formData.password}
        label="Пароль"
        error={errors?.password}
        placeholder="Введите пароль пользователя"
      />
      <Select
        label="Отдел"
        placeholder="Выберите отдел..."
        value={formData.departmentId}
        onChange={handleChange}
        error={errors?.departmentId}
        name="departmentId"
      >
        {departments.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </Select>
      <Button
        children="Зарегистрировать"
        onClick={handleSubmit}
        disabled={isLoading}
      />
      <p>{errors.server}</p>
    </div>
  );
};
