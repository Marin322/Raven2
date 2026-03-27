import { useState } from "react";
import { Input, Button } from "../../../shared";
import { validate } from "../model/validate";

export const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData, false);
    setErrors(validationErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div>
      <Input
        name="companyName"
        label="Название компании"
        type="text"
        value={formData.companyName}
        onChange={handleChange}
        placeholder="Название компании"
        className="mt-5"
        error={errors?.companyName}
      />
      <Input
        name="fullName"
        label="ФИО"
        type="text"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Введите ваше полное ФИО"
        className="mt-5"
        error={errors?.fullName}
      />
      <Input
        name="username"
        label="Никнейм"
        type="text"
        value={formData.username}
        onChange={handleChange}
        placeholder="Введите ваш новый никнейм"
        className="mt-5"
        error={errors?.username}
      />
      <Input
        name="password"
        label="Пароль"
        type="text"
        value={formData.password}
        onChange={handleChange}
        placeholder="Введите ваш пароль"
        className="mt-5"
        error={errors?.password}
      />
      <Button
        children="Зарегистрироваться"
        variant="primary"
        className="mt-5"
        onClick={handleSubmit}
      />
    </div>
  );
};
