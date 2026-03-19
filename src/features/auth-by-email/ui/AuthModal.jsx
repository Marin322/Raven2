import { useState } from "react";
import { Input, Button } from "../../../shared/";
export const AuthModal = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-main-bg p-0 md:p-4">
      <div className="w-full rounded-2xl bg-modal-bg p-6 shadow-xl md:max-w-md md:rounded-3xl md:mb-0 border-2 gap-10 border-border-bg">
        <div className="grid grid-cols-2 w-full content-center text-center mb-5">
          <button
            className={`cursor-pointer ${isAuthOpen == true && "text-blue-600"}`}
            onClick={() => setIsAuthOpen(true)}
          >
            Авторизация
          </button>
          <button
            className={`cursor-pointer ${isAuthOpen == false && "text-blue-600"}`}
            onClick={() => setIsAuthOpen(false)}
          >
            Регистрация
          </button>
        </div>
        {isAuthOpen == true ? (
          <div>
            <Input
              label="Эл. Почта"
              type="text"
              placeholder="Введите вашу эл. почту"
            />
            <Input
              label="Пароль"
              type="password"
              placeholder="Введите ваш пароль"
              className="mt-5"
            />
            <Button children="Войти" variant="primary" className="mt-5"/>
          </div>
        ) : (
          <div>
            <Input
              label="Имя пользователя"
              type="text"
              placeholder="Ваше новое имя"
              className="mt-5"
            />
            <Input
              label="Эл. почта"
              type="text"
              placeholder="Введите вашу эл. почту"
              className="mt-5"
            />
            <Input
              label="Пароль"
              type="password"
              placeholder="Введите ваш пароль"
              className="mt-5"
            />
            <Input
              label="Подтверждение пароля"
              type="password"
              placeholder="Введите ваш пароль ещё раз"
              className="mt-5"
            />
            <Button children="Зарегистрироваться" variant="primary" className="mt-5"/>
          </div>
        )}
      </div>
    </div>
  );
};
