import { useState } from "react";
import { Input, Button } from "../../../shared";
import { validate } from "../model/validate";
import { loginByPassword } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData, true);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setIsLoading(true);
    try {
      const data = await loginByPassword(formData.username, formData.password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("isAdmin", data.isGlobalAdmin);
      localStorage.setItem("companyId", data.companyId);

      navigate("/", {replace: true});
      
    } catch (err) {
      setErrors((prev) => ({...prev, server: err.message}));
    }
    finally {
      setIsLoading(false);
    };
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
        label="Логин"
        type="text"
        value={formData.username}
        onChange={handleChange}
        placeholder="Введите ваш новый логин"
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
      {errors.server && (
        <span className="text-red-500 text-sm text-center">{errors.server}</span>
      )}
      <Button
        children="Войти"
        variant="primary"
        className="mt-5"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Входим..." : "Войти"}
      </Button>
    </div>
  );
};
