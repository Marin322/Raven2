import { useState } from "react";
import { SideBarBase } from "../../../shared";
import { ListItem } from "../../../shared";
import { SideBarSection } from "../../../shared";
export const AdminSideBar = ({ activeTab, onTabChanged, isOpen, onClose }) => {

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <SideBarBase className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-main-bg transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:relative md:translate-x-0
    `}>
      <div className="p-5">
        <header className="flex justify-between">
          <h2 className="text-main-text text-xl">Админ панель</h2>
          <button className="text-2xl cursor-pointer" onClick={onClose}>
            ✕
          </button>
        </header>
        <div className="mt-10 gap-2 flex flex-col">
          <SideBarSection
            label="Управление пользователями"
            isOpen={openMenu === "users"}
            onToggle={() => toggleMenu("users")}
          >
            <ListItem
              label="Список пользователей"
              isActive={activeTab === "userList"}
              onClick={() => onTabChanged("userList")}
              className="p-2 text-base border-none"
            />
            <ListItem
              label="Создание пользователей"
              isActive={activeTab === "userCreate"}
              onClick={() => onTabChanged("userCreate")}
              className="p-2 text-base border-none"
            />
            <ListItem
              label="Редактирование пользователей"
              isActive={activeTab === "userEdit"}
              onClick={() => onTabChanged("userEdit")}
              className="p-2 text-base border-none"
            />
          </SideBarSection>
          <SideBarSection
            label="Управление отделами"
            onToggle={() => toggleMenu("departments")}
            isOpen={openMenu === "departments"}
          >
            <ListItem
              label="Список отделов"
              isActive={activeTab === "deptList"}
              onClick={() => onTabChanged("deptList")}
              className="p-2 text-base"
            />
            <ListItem
              label="Создание отдела"
              isActive={activeTab === "departmentCreate"}
              onClick={() => onTabChanged("departmentCreate")}
              className="p-2 text-base"
            />
          </SideBarSection>
        </div>
      </div>
    </SideBarBase>
  );
};
