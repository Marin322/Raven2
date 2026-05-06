import { useEffect, useState } from "react";
import { getUsers } from "../../../api/userApi";
import { ControlChatUserItem } from "./ControlChatUserItem";
import { Button } from "../../../../../shared";
import { useChatStore } from "../../../../../entitites/chat/model/useChatStore";

export const ControlChatModalPart = ({ chatId }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectUsers, setSelectUsers] = useState([]);
  const { addNewUsersTargetChat, deleteChat } = useChatStore();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleUser = (id) => {
    setSelectUsers(prev => prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]);
  };

  const handleDelete = async () => {
    if (window.confirm("Удалить чат навсегда?")) {
      await deleteChat(chatId);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Добавить участников</span>
        <div className="w-full h-60 border-b border-t border-border-bg overflow-auto gap-2 py-2 flex flex-col">
          {isLoading ? <p>Загрузка...</p> : users.map(user => (
            <ControlChatUserItem 
              key={user.id} 
              user={user} 
              onClick={() => toggleUser(user.id)} 
              isSelected={selectUsers.includes(user.id)}
            />
          ))}
        </div>
        <Button 
          disabled={selectUsers.length === 0} 
          onClick={() => {
            addNewUsersTargetChat(selectUsers, chatId);
            setSelectUsers([]);
          }}
        >
          Добавить выбранных ({selectUsers.length})
        </Button>
      </div>

      <div className="pt-4 border-t border-border-bg">
        <button onClick={handleDelete} className="w-full p-2 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition-all">
          Удалить чат
        </button>
      </div>
    </div>
  );
};