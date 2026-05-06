import React, { useState, useEffect } from "react";
import { Button } from "../../../../../shared";
import { useChatStore } from "../../../../../entitites/chat/model/useChatStore";

export const ChatSettingsPart = ({ chatId }) => {
  const { activeChatDetails, updateChat } = useChatStore();
  const [name, setName] = useState(activeChatDetails?.name || "");
  const [description, setDescription] = useState(activeChatDetails?.description || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeChatDetails) {
      setName(activeChatDetails.name || "");
      setDescription(activeChatDetails.description || "");
    }
  }, [activeChatDetails]);

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
    <div className="flex flex-col gap-4 p-2">
      <div className="flex flex-col gap-1">
        <label className="text-xs opacity-50">Название чата</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-secondary-bg border border-gray-500 p-2 rounded outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs opacity-50">Описание</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-secondary-bg border border-gray-500 p-2 rounded h-24 resize-none outline-none focus:border-blue-500"
        />
      </div>
      <Button onClick={handleSave} disabled={isLoading}>
        {isLoading ? "Сохранение..." : "Сохранить изменения"}
      </Button>
    </div>
  );
};