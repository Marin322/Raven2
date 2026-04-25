import { useState } from "react";
import { createPortal } from "react-dom";
import { LogOutAccount } from "../api/settingsApi";
import { Button } from "../../../shared";
import { replace, useNavigate } from "react-router-dom";

export const SettingsWindow = ({ isOpen, onClose }) => {
  const [touchStartX, setTouchStartX] = useState(null);

  const navigate = useNavigate();

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      onClose();
    }

    setTouchStartX(null);
  };

  const LogOutClick = async () => {
    try {
      const answer = await LogOutAccount();
      localStorage.clear();
      navigate("/auth", {replace: true});
    } catch(err) {
      throw new Errror(err);
    }
  }

  const content = (
    <>
      <div
        className={`fixed w-full h-full inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed top-0 left-0 h-full bg-main-bg shadow-2xl z-50 transition-transform duration-300 ease-in-out w-full sm:w-87.5 md:w-100 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-5">
          <header className="flex justify-between">
            <h2 className="text-main-text text-xl">Параметры</h2>
            <button className="text-2xl cursor-pointer" onClick={onClose}>
              ✕
            </button>
          </header>
          <div className="flex flex-col gap-4 overflow-y-auto"></div>
          <div className="mt-5 h-full w-full">
            <div>
              <Button children="Выйти из аккаунта" onClick={LogOutClick}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
};
