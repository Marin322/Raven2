import { SideBarBase } from "../../../shared";
import { ListItem } from "../../../shared";
export const AdminSideBar = ({activeTab, onTabChanged}) => {
  const onClose = () => {};

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
          <ListItem label="Список пользователей" isActive={activeTab === "list"} onClick={() => onTabChanged("list")}/>
          <ListItem label="Создание пользователей" isActive={activeTab === "create"} onClick={() => onTabChanged("create")}/>
          <ListItem label="Редактирование пользователей" isActive={activeTab === "edit"} onClick={() => onTabChanged("edit")}/>
        </div>
      </div>
    </SideBarBase>
  );
};
