import { Input, Button } from "../../../shared";
import { useState } from "react";
import { validate } from "../model/validate";
import { createDepartment } from "../api/CreateDepartmentApi";
export const CreateDepartmentForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ departmentName: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if(Object.keys(validationErrors).length > 0) return;
    try {
      const data = await createDepartment(formData.departmentName);
      console.log(data);
    } catch(err) {
      setErrors((prev) => ({...prev, server: err.message}));
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
        onChange={handleChange}
        name="departmentName"
        placeholder="Введите название нового отдела..."
      />
      <Button onClick={handleSubmit}>Создать новый отдел</Button>
      <span className="text-red-500">{errors.server}</span>
    </div>
  );
};
