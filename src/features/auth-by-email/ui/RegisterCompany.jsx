import { useState } from "react";
import { Input, Button } from "../../../shared";
import { validate } from "../model/validate";
import { registerCompany } from "../api/authApi";

export const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // Используем стейт для хранения успешного ответа
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Очищаем ошибки при вводе
    if (errors[name] || errors.server) {
      setErrors((prev) => ({ ...prev, [name]: "", server: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Валидация фронтенда
    const validationErrors = validate(formData, false);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setSuccessMessage(""); // Сбрасываем старые сообщения

    try {
      // 2. Запрос к API
      const response = await registerCompany(formData);

      // Если все ок — сохраняем сообщение об успехе
      setSuccessMessage("Компания успешно зарегистрирована!");
      console.log("Успех:", response);
    } catch (err) {
      // 3. Тот самый момент: извлекаем сообщение, которое мы настроили в apiFetch
      // err.message теперь содержит "Компания с таким названием уже существует"
      setErrors((prev) => ({
        ...prev,
        server: err.message || "Непредвиденная ошибка сервера",
      }));
    } finally {
      setIsLoading(false);
    }
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
      >
        {isLoading ? "Регистрируем..." : "Зарегистрироваться"}
      </Button>
      {errors.server && (
        <p className="text-red-600 text-sm text-center font-medium">
          {errors.server}
        </p>
      )}

      {/* Отображение успеха */}
      {successMessage && (
        <p className="text-green-600 text-sm text-center font-medium">
          {successMessage}
        </p>
      )}
    </div>
  );
};
