import { useState } from "react";
import { Input, Button } from "../../../shared";
import { editUser, freezeUser } from "../api/EditUser";

export const EditUserForm = ({ userId, isFreeze }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    departmentId: "",
  });

  const saveChanges = async () => {
    setIsLoading(true);
    try {
      const answer = await editUser(formData, userId);
      console.log(answer);
      console.log("okak")
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const freezeUserSubmit = async () => {
    setIsLoading(true);
    try {
        const answer = await freezeUser(userId);
    } catch(err) {
    } finally {
        setIsLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="gap-5 flex flex-col">
      <Input
        label="ФИО"
        placeholder="Новое ФИО пользователя..."
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
      />
      <Button
        children="Сохранить"
        disabled={isLoading}
        onClick={saveChanges}
      />

      <div className="mt-10">
        <p className="text-gray-400">Заморозка пользователей</p>
        <div className="border-t-4 border-border-bg"></div>
      </div>

      <div className="flex gap-2">
        <p className="text-[18px]">Заморозка: </p>
        {isFreeze ? (
          <div>
            <p>Активна</p>
          </div>
        ) : (
          <div>
            <p>Не активна</p>
          </div>
        )}
      </div>
        <Button children="Переключить" onClick={freezeUserSubmit}/>
    </div>
  );
};
