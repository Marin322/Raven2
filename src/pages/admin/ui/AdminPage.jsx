import { useState } from "react";
import { AdminSideBar } from "../../../widgets/admin-sidebar";
import { UserList } from "../../../widgets/user-list";
import { CreateUser } from "../../../features/create-user";
import { CreateDepartment } from "../../../features/create-department";
import { EditUser } from "../../../features/edit-user";
import { DepartmentList } from "../../../widgets/department-list";
import { EditDepartment } from "../../../features/edit-department";
import { BannedWordsList } from "../../../widgets/bannedWords-list";
export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("userList");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({fullName: "", username: "", departmentName: "", userId: "", isFreeze: ""});

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "userList":
        return (
          <div>
            <UserList onTabChanged={handleTabChange} formData={formData} setFormData={setFormData}/>
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
          <div>
            <EditUser userData={formData}/>
          </div>
        );
      case "departmentList":
        return (
          <div>
            <DepartmentList onTabChanged={handleTabChange} setFormData={setFormData}/>
          </div>
        )
      case "departmentCreate":
        return (
          <div><CreateDepartment/></div>
        )
        case "departmentEdit":
          return (
            <div><EditDepartment deptData={formData}/></div>
          )
        case "bannedWordsList":
          return (
            <div><BannedWordsList/></div>
          )
        }
  };
  return (
    <div className="w-full h-screen overflow-hidden bg-main-bg flex relative">
      
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <AdminSideBar 
        activeTab={activeTab} 
        onTabChanged={handleTabChange} 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        <header className="md:hidden flex items-center p-4 bg-secondary-bg border-b border-border-bg">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-main-text text-2xl"
          >
            ☰
          </button>
          <h1 className="ml-4 text-main-text font-medium">
            Панель управления
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-5 flex justify-center">
          <div className="w-full max-w-160">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
