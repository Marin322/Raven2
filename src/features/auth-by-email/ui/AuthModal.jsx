import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterCompany } from "./RegisterCompany";
export const AuthModal = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-main-bg p-0 md:p-4">
      <div className="w-full rounded-2xl bg-modal-bg p-6 shadow-xl md:max-w-md md:rounded-3xl md:mb-0 border-2 gap-10 border-border-bg">
        <div className="grid grid-cols-2 w-full content-center text-center mb-5">
          <button
            className={`cursor-pointer ${
              isAuthOpen == true && "text-blue-600"
            }`}
            onClick={() => setIsAuthOpen(true)}
          >
            Авторизация
          </button>
          <button
            className={`cursor-pointer ${
              isAuthOpen == false && "text-blue-600"
            }`}
            onClick={() => setIsAuthOpen(false)}
          >
            Регистрация
          </button>
        </div>
        {isAuthOpen == true ? <LoginForm /> : <RegisterCompany />}
      </div>
    </div>
  );
};
