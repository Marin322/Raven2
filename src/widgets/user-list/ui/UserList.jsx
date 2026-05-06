import { useEffect, useState } from "react";
import { UserListItem } from "./UserListItem";
import { useUserStore } from "../../../entitites/user/model/useUserStore";
import { ItemsList } from "../../../shared";

export const UserList = ({ onTabChanged, formData, setFormData }) => {
  const { users, isLoading, fetchUsers } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");
  // Стейт для переключения: false = активные, true = замороженные
  const [showFrozen, setShowFrozen] = useState(false);

  // Перезапрашиваем пользователей каждый раз, когда меняется вкладка
  useEffect(() => {
    fetchUsers(showFrozen);
  }, [fetchUsers, showFrozen]);

  // Локально фильтруем только по поисковому запросу
  // Статус уже отфильтрован бэкендом
  const filteredUsers = users.filter((user) => {
    const name = user.fullName || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const goToEditUser = (user) => {
    setFormData({
      fullName: user.fullName,
      username: user.username,
      departmentName: user.departmentName,
      userId: user.id,
      isFreeze: user.isFrozen
    });
    onTabChanged("userEdit");
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Красивый переключатель */}
      <div className="flex justify-end mb-4 px-2">
        <div className="flex bg-gray-100/8 p-1 rounded-lg">
          <button
            onClick={() => setShowFrozen(false)}
            disabled={isLoading}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              !showFrozen
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-500 hover:text-gray-700 "
            }`}
          >
            Активные
          </button>
          <button
            onClick={() => setShowFrozen(true)}
            disabled={isLoading}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              showFrozen
                ? "bg-white shadow-sm text-blue-600 "
                : "text-gray-500 hover:text-gray-700 d"
            }`}
          >
            Замороженные
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-4 text-center text-gray-500">Загрузка...</div>
      ) : (
        <ItemsList onSearchChange={(e) => setSearchQuery(e.target.value)} searchValue={searchQuery}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserListItem
                key={user.id}
                fullName={user?.fullName}
                username={user.username}
                departmentName={user.departmentName}
                onClick={() => goToEditUser(user)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              {searchQuery
                ? "По вашему запросу никого не найдено :("
                : showFrozen
                ? "Замороженных пользователей нет"
                : "Пользователей пока нет"}
            </p>
          )}
        </ItemsList>
      )}
    </div>
  );
};