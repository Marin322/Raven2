import { useState } from "react";
import { ChatInfoSelector } from "./components/ChatInfoSelector";
import { AboutChatModalPart } from "./components/AboutChat/AboutChatModalPart";
import { ControlChatModalPart } from "./components/ControlChatModalPart";
import { ChatSettingsPart } from "./components/ChatSettingsPart";

export const ChatInfoModal = ({ infoIsOpen, chat, onClose }) => {
  const [activeTab, setActiveTab] = useState("aboutChat");

  const renderContent = () => {
    switch (activeTab) {
      case "aboutChat":
        return <AboutChatModalPart chatId={chat.id} />;
      case "media":
        return <div className="text-second-text p-4 text-center opacity-50">Временно недоступно</div>;
      case "settings":
        return <ChatSettingsPart chatId={chat.id} />;
      case "controlChat":
        return <ControlChatModalPart chatId={chat.id} />;
      default:
        return null;
    }
  };

  // Вычисляем первую букву названия чата для заглушки
  const firstLetter = chat.name ? chat.name[0].toUpperCase() : "?";

  return (
    <div
      className={`
          fixed lg:absolute right-0 h-full z-50
          w-full sm:w-80 lg:w-100 
          bg-modal-bg border-l-2 border-border-bg
          transition-transform duration-300 ease-in-out
          ${infoIsOpen ? "translate-x-0" : "translate-x-full"}
        `}
    >
      <div className="w-full h-full flex flex-col items-center gap-2 pt-5">
        <div className="w-full flex justify-end mr-10 cursor-pointer" onClick={onClose}>X</div>
        {/* Аватарка или первая буква чата */}
        {chat.avatarUrl ? (
          <img
            className="w-25 h-25 rounded-full object-cover bg-gray-500 border-2 border-border-bg shrink-0"
            src={chat.avatarUrl}
            alt={chat.name}
          />
        ) : (
          <div className="w-25 h-25 rounded-full bg-gray-200 shrink-0 flex items-center justify-center text-black text-3xl font-bold select-none">
            {firstLetter}
          </div>
        )}

        <p className="text-main-text text-lg font-semibold mt-1">{chat.name}</p>
        
        <ChatInfoSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="w-full flex-1 overflow-auto px-4 py-2">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};