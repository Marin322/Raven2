import { useEffect, useState } from "react";
import { UserListItem } from "./UserListItem";
import { useUserStore } from "../../../entitites/user/model/useUserStore";
export const UserList = () => {
  const {users, isLoading, fetchUsers} = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className="flex flex-col w-full max-w-2xl gap-5">
      {users.length > 0 ? (
        users.map((user) => (
          <UserListItem key={user.id} fullName={user.fullName} username={user.username} departamentName={user.departmentName}/>
        ))
      ) : (
        <p className="text-second-text">Пользователей пока нет</p>
      )}
    </div>
  );
};
