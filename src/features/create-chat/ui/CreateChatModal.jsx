import { useState, useEffect } from "react";
import { Button, Input } from "../../../shared";
import { validate } from "../model/validate";
import { useChatStore } from "../../../entitites/chat/model/useChatStore";
import { useDepartmentStore } from "../../../entitites/department/model/useDepartmentStore"; // поправь путь под реальный

export const CreateChatModal = ({ setCreateChatIsOpen }) => {
  const [formData, setFormData] = useState({ name: "", description: "", departmentId: "" });
  const [errors, setErrors] = useState({});

  const createChat = useChatStore((state) => state.createChat);
  const isLoading = useChatStore((state) => state.isLoading);

  const departments = useDepartmentStore((state) => state.departments);
  const fetchDepartments = useDepartmentStore((state) => state.fetchDepartments);

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const ownDepartmentId = localStorage.getItem("departmentId") || "";

  useEffect(() => {
    if (isAdmin) {
      fetchDepartments();
    }
  }, [isAdmin, fetchDepartments]);

  const inputsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const createSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData, isAdmin);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Для админа отдел выбирается вручную, для остальных — подставляется их собственный
    const departmentId = isAdmin ? formData.departmentId : (ownDepartmentId || null);

    try {
      await createChat({
        ...formData,
        departmentId,
      });
      setCreateChatIsOpen(false);
    } catch (err) {
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

        {isAdmin && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-main-text">Отдел</label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={inputsChange}
              className="w-full rounded-lg border p-2 bg-modal-bg text-main-text"
            >
              <option value="">Выберите отдел...</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>{dep.name}</option>
              ))}
            </select>
            {errors?.departmentId && (
              <p className="text-red-500 text-sm">{errors.departmentId}</p>
            )}
          </div>
        )}
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