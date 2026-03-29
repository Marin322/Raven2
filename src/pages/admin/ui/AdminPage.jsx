import { useState } from "react";
import { AdminSideBar } from "../../../widgets/admin-sidebar";
import { UserList } from "../../../widgets/user-list";
import { CreateUser } from "../../../features/create-user";
export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("list");

  const renderContet = () => {
    switch (activeTab) {
      case "list":
        return (
          <div>
            <UserList />
          </div>
        );
      case "create":
        return (
          <div>
            <CreateUser />
          </div>
        );
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
