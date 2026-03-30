import { useState } from "react";
import { AdminSideBar } from "../../../widgets/admin-sidebar";
import { UserList } from "../../../widgets/user-list";
import { CreateUser } from "../../../features/create-user";
import { CreateDepartment } from "../../../features/create-department";
export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("userList");

  const renderContet = () => {
    switch (activeTab) {
      case "userList":
        return (
          <div>
            <UserList />
          </div>
        );
      case "userCreate":
        return (
          <div>
            <CreateUser />
          </div>
        );
      case "userEdit":
        return (
          <div></div>
        );
      case "departmentCreate":
        return (
          <div><CreateDepartment/></div>
        )
    }
  };
  return (
    <div className="w-full h-screen overflow-hidden bg-main-bg flex">
      <AdminSideBar activeTab={activeTab} onTabChanged={setActiveTab} />
      <div className="overflow-none flex justify-center flex-1 h-full p-5">
        <div className="w-full max-w-125">{renderContet()}</div>
      </div>
    </div>
  );
};
