import { useState } from "react";
import { Input, Button } from "../../../shared";
import { validate } from "../model/validate";
export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        name="username"
        label="Имя пользователя"
        type="text"
        value={formData.username}
        onChange={handleChange}
        placeholder="Ваше новое имя"
        className="mt-5"
        error={errors?.username}
      />
      <Input
        name="email"
        label="Эл. почта"
        type="text"
        value={formData.email}
        onChange={handleChange}
        placeholder="Введите вашу эл. почту"
        className="mt-5"
        error={errors?.email}
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
      <Input
        name="confirmPassword"
        label="Подтверждение пароля"
        type="text"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Введите ваш пароль ещё раз"
        className="mt-5"
        error={errors?.confirmPassword}
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
