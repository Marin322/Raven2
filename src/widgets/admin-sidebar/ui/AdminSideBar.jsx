import { useState } from "react";
import { SideBarBase } from "../../../shared";
import { ListItem } from "../../../shared";
export const AdminSideBar = ({ activeTab, onTabChanged }) => {
  const onClose = () => {};

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <SideBarBase>
      <div className="p-5">
        <header className="flex justify-between">
          <h2 className="text-main-text text-xl">Админ панель</h2>
          <button className="text-2xl cursor-pointer" onClick={onClose}>
            ✕
          </button>
        </header>
        <div className="mt-10 gap-2 flex flex-col">
          <ListItem
            label="Управление пользователями"
            isActive={false}
            onClick={() => toggleMenu("users")}
            isDropdown={true}
            isExpanded={openMenu === "users"}
          />
          <div className={`grid transition-all duration-300 ease-in-out ${openMenu === "users" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l-2 border-border-bg ml-3 mt-2 mb-2">
                  <ListItem 
                    label="Список пользователей" 
                    isActive={activeTab === "userList"} 
                    onClick={() => onTabChanged("userList")}
                    className="p-2 text-base"
                  />
                  <ListItem 
                    label="Создание пользователей" 
                    isActive={activeTab === "userCreate"} 
                    onClick={() => onTabChanged("userCreate")}
                    className="p-2 text-base"
                  />
                  <ListItem 
                    label="Редактирование пользователей" 
                    isActive={activeTab === "userEdit"} 
                    onClick={() => onTabChanged("userEdit")}
                    className="p-2 text-base"
                  />
                </div>
              </div>
            </div>
        </div>
        <div className=" mt-5 gap-2 flex flex-col">
          <ListItem label="Управление отделами" isActive={false} onClick={() => toggleMenu("departments")} isDropdown={true} isExpanded={openMenu === "departments"}/>
          <div className={`grid transition-all duration-300 ease-in-out ${openMenu === "departments" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l-2 border-border-bg ml-3 mt-2 mb-2">
                  <ListItem 
                    label="Список отделов" 
                    isActive={activeTab === "deptList"} 
                    onClick={() => onTabChanged("deptList")}
                    className="p-2 text-base"
                  />
                  <ListItem 
                    label="Создание отдела" 
                    isActive={activeTab === "deptCreate"} 
                    onClick={() => onTabChanged("deptCreate")}
                    className="p-2 text-base"
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </SideBarBase>
  );
};
