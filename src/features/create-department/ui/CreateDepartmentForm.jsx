import { Input, Button } from "../../../shared";
import { useState } from "react";
import { validate } from "../model/validate";
import { createDepartment } from "../api/CreateDepartmentApi";
export const CreateDepartmentForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ departmentName: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if(Object.keys(validationErrors).length > 0) return;
    setIsLoading(true);
    try {
      const data = await createDepartment(formData.departmentName);
      console.log(data);
    } catch(err) {
      setErrors((prev) => ({...prev, server: err.message}));
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    if(errors[name]) setErrors((prev) => ({...prev, [name]: ""}));
  };

  return (
    <div className="gap-4 flex flex-col">
      <Input
        label="Название отдела"
        error={errors.departmentName}
        value = {formData.departmentName}
        onChange={handleChange}
        name="departmentName"
        placeholder="Введите название нового отдела..."
      />
      <Button onClick={handleSubmit} disabled={isLoading}>{isLoading ? ("Загрузка...") : ("Создать новый отдел")}</Button>
      <span className="text-red-500">{errors.server}</span>
    </div>
  );
};
