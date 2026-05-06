import React, { useState, useEffect, useRef } from "react"; // Добавили useRef
import { Button } from "../../../../../shared";
import { useChatStore } from "../../../../../entitites/chat/model/useChatStore";

export const ChatSettingsPart = ({ chatId }) => {
  // Добавляем функции аватара в деструктуризацию
  const { activeChatDetails, updateChat, uploadAvatar, deleteAvatar } = useChatStore();
  
  const [name, setName] = useState(activeChatDetails?.name || "");
  const [description, setDescription] = useState(activeChatDetails?.description || "");
  const [isLoading, setIsLoading] = useState(false);

  // Создаем реф для программного клика по инпуту
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (activeChatDetails) {
      setName(activeChatDetails.name || "");
      setDescription(activeChatDetails.description || "");
    }
  }, [activeChatDetails]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadAvatar(chatId, file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateChat(chatId, name, description);
      alert("Настройки обновлены");
    } catch (err) {
      alert("Ошибка при сохранении");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-2 items-center">
      {/* Секция Аватара */}
      <div 
        className="relative group cursor-pointer" 
        onClick={() => fileInputRef.current?.click()} // Теперь fileInputRef определен
      >
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border-bg bg-gray-500">
          {activeChatDetails?.avatarUrl ? (
            <img
              className="w-full h-full object-cover"
              src={activeChatDetails.avatarUrl}
              alt="Avatar"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold bg-active-text">
              {name ? name[0].toUpperCase() : "?"}
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="text-[10px] text-white">Изменить</span>
        </div>
      </div>

      {/* Скрытый инпут для выбора файла */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {activeChatDetails?.avatarUrl && (
        <button 
          onClick={() => deleteAvatar(chatId)}
          className="text-red-500 text-xs hover:underline mt-[-10px]"
        >
          Удалить фото
        </button>
      )}

      {/* Поля ввода */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <label className="text-xs opacity-50">Название чата</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-secondary-bg border border-gray-500 p-2 rounded outline-none focus:border-blue-500 text-main-text"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-xs opacity-50">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-secondary-bg border border-gray-500 p-2 rounded h-24 resize-none outline-none focus:border-blue-500 text-main-text"
          />
        </div>

        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Сохранение..." : "Сохранить изменения"}
        </Button>
      </div>
    </div>
  );
};