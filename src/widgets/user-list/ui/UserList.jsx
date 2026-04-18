import { useEffect, useState } from "react";
import { UserListItem } from "./UserListItem";
import { useUserStore } from "../../../entitites/user/model/useUserStore";
import { ItemsList } from "../../../shared";
export const UserList = ({ onTabChanged, formData, setFormData }) => {
  const { users, isLoading, fetchUsers } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((user) => {
    const name = user.fullName || ""; // Если undefined, берем ""
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

  if (isLoading) return <div>Загрузка...</div>;

  return (
    // <div className="gap-5 flex flex-col">
    //   <Input
    //     placeholder="Поиск..."
    //     onChange={(e) => setSearchQuery(e.target.value)}
    //     value={searchQuery}
    //   />
    //   <div className="flex flex-col w-full max-w-2xl gap-5">

    //   </div>
    // </div>
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
        <p>
          {searchQuery
            ? "По вашему запросу никого не найдено :("
            : "Пользователей пока нет"}
        </p>
      )}
    </ItemsList>
  );
};
