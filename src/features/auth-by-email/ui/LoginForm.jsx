import { useState } from "react";
import { Input, Button } from "../../../shared";
import { validate } from "../model/validate";
import { loginByEmail } from "../api/authApi";
export const LoginForm = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData, true);
    setErrors(validationErrors);
    try {
      const data = await loginByEmail(formData.email, formData.password);
      console.log("Успешный вход!", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("isAdmin", data.isGlobalAdmin);
      localStorage.setItem("companyId", data.companyId);
    } catch (err) {
      console.log("okak");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  return (
    <div>
      <Input
        name="login"
        label="Логин"
        type="text"
        value={formData.login}
        onChange={handleChange}
        placeholder="Введите ваш новый логин"
        error={errors?.login}
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
