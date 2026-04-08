import { useEffect, useState } from "react";
import { getUsers } from "../../../api/userApi";
import { ControlChatUserItem } from "./ControlChatUserItem";
import { Button } from "../../../../../shared";
import { useChatStore } from "../../../../../entitites/chat/model/useChatStore";

export const ControlChatModalPart = ({ chatId }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectUsers, setSelectUsers] = useState([]);
  const {addNewUsersTargetChat} = useChatStore();

  const GetUsersForAdd = async () => {
    setIsLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const SelectUser = (userId) => {
    setSelectUsers((prev) => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
  };

  const handleAddUsersInChat = () => {
    addNewUsersTargetChat(selectUsers, chatId)
  };

  useEffect(() => {
    GetUsersForAdd();
  }, []);

  if (isLoading) return <div>Загрузка пользователей...</div>;

  if (!users) return null;

  return (
    <div className="w-full">
      <div className="w-full h-auto max-h-75 border-b-2 border-t-2 border-border-bg overflow-auto gap-2 p-2 flex flex-col mb-5">
        {users.map((user) => (
          <ControlChatUserItem key={user.id} user={user} onClick={() => SelectUser(user.id)} isSelected={selectUsers.includes(user.id)}/>
        ))}
      </div>
      <Button children="Добавить" onClick={() => handleAddUsersInChat()}/>
    </div>
  );
};
