import { useState } from "react";
import { Input, Button } from "../../../shared";
import { validate } from "../model/validate";
export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData, true);
    setErrors(validationErrors);

    // if (Object.keys(validationErrors).length === 0) {

    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  return (
    <div>
      <Input
        name="email"
        label="Эл. Почта"
        type="text"
        value={formData.email}
        onChange={handleChange}
        placeholder="Введите вашу эл. почту"
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
      <Button
        children="Войти"
        variant="primary"
        className="mt-5"
        onClick={handleSubmit}
      />
    </div>
  );
};
