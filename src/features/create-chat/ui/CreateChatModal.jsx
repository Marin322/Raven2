import { useState } from "react";
import { Button, Input } from "../../../shared";
import { CreateChat } from "../api/createChat";
import { validate } from "../model/validate";

export const CreateChatModal = ({setCreateChatIsOpen}) => {
  const [formData, setFormData] = useState({name: "", description: ""});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const inputsChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    if(errors[name]) setErrors((prev) => ({...prev, [name]: ""}));
  }

  const createSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if(Object.keys(validationErrors).length > 0) return;
    setIsLoading(true);
    try {
      const data = await CreateChat(formData);
      console.log(data.status);
    } catch(err) {
      setErrors((prev) => ({...prev, server: err.message}));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="w-full h-auto bg-modal-bg lg:w-120 lg:rounded-2xl p-5 gap-4 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex">
        <p className="text-2xl text-center mb-4 w-full">Создание чата</p>
        <div className="w-6 h-6 flex items-center cursor-pointer" onClick={() => setCreateChatIsOpen(false)}>
          <div className="w-6 h-0.5 relative rotate-135 bg-black after:content-[''] after:w-6 after:h-0.5 after:absolute after:rotate-90 after:bg-black" />
        </div>
      </div>
      <Input label="Название чата" placeholder="Введите название чата..." name="name" value={formData.name} error={errors?.name} onChange={inputsChange}/>
      <Input label="Краткое описание чата (опционально)" name="description" value={formData.description} error={errors?.description} onChange={inputsChange}/>
      <Button className="bottom-0" children={isLoading ? "Создаём..." : "Создать"} onClick={createSubmit}/>
      {errors?.server && (
        <span className="text-red-500 text-sm text-center">{errors.server}</span>
      )}
    </div>
  );
};
