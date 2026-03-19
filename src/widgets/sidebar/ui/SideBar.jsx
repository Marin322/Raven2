import { Input } from "../../../shared/";
export const SideBar = () => {
  return (
    <aside className="fixed inset-0 z-20 flex flex-col w-full bg-main-bg md:relative md:w-100 md:inset-auto md:border-r-2 md:border-border-bg">
      <header className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-main-text text-3xl font-bold">Raven Chat</h1>
          <div className="w-12 h-12 bg-gray-500 z-21" />
        </div>
        <div>
            <Input placeholder="Найти..."/>
        </div>
      </header>
    </aside>
  );
};
