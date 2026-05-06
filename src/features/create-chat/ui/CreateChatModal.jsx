import { useState } from "react";
import { Button, Input } from "../../../shared";
import { validate } from "../model/validate";
import { useChatStore } from "../../../entitites/chat/model/useChatStore";

export const CreateChatModal = ({ setCreateChatIsOpen }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});
  
  // Достаем метод создания и общий статус загрузки из стора
  const createChat = useChatStore((state) => state.createChat);
  const isLoading = useChatStore((state) => state.isLoading);

  const inputsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const createSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) return;

    try {
      // Вызываем действие из стора
      await createChat(formData);
      // Если запрос успешен — закрываем модалку
      setCreateChatIsOpen(false);
    } catch (err) {
      // Обрабатываем ошибку сервера
      setErrors((prev) => ({ ...prev, server: err.message }));
    }
  };

  return (
    <div
      className="w-full h-auto bg-modal-bg lg:w-120 lg:rounded-2xl p-5 gap-4 flex flex-col shadow-xl animate-in fade-in zoom-in duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-main-text text-center w-full">
            Создание чата
        </h2>
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors" 
          onClick={() => setCreateChatIsOpen(false)}
        >
          {/* Иконка закрытия (упрощена для чистоты кода) */}
          <span className="text-2xl">×</span>
        </button>
      </div>

      <div className="space-y-4">
        <Input 
          label="Название чата" 
          placeholder="Введите название чата..." 
          name="name" 
          value={formData.name} 
          error={errors?.name} 
          onChange={inputsChange}
        />
        <Input 
          label="Краткое описание чата (опционально)" 
          name="description" 
          value={formData.description} 
          error={errors?.description} 
          onChange={inputsChange}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Button 
          disabled={isLoading}
          onClick={createSubmit}
        >
          {isLoading ? "Создаём..." : "Создать"}
        </Button>
        
        {errors?.server && (
          <p className="text-red-500 text-sm text-center animate-shake">
            {errors.server}
          </p>
        )}
      </div>
    </div>
  );
};