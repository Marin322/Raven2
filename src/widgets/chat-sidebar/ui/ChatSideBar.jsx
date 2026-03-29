import { Input } from "../../../shared";
import { ChatItem } from "../../../entitites/chat";
import { SettingsWindow } from "../../settingsWindow";
import { useState } from "react";
import { SideBarBase } from "../../../shared";
export const ChatSideBar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <>
      <SideBarBase>
        <header className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-main-text text-3xl font-bold">Raven Chat</h1>
            <div
              className="w-12 h-12 bg-gray-500 z-21 cursor-pointer"
              onClick={() => setIsSettingsOpen(true)}
            />
          </div>
          <div>
            <Input placeholder="Найти..." />
          </div>
        </header>
        <nav></nav>
      </SideBarBase>
      <SettingsWindow isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}/>
    </>
  );
};
