import { Input } from "../../../shared";
import { ChatItem } from "../../../entitites/chat";
import { SettingsWindow } from "../../settingsWindow";
import { useEffect, useState } from "react";
import { SideBarBase } from "../../../shared";
import { useChatStore } from "../../../entitites/chat/model/useChatStore";
import { ItemsList } from "../../../shared";
import { useNavigate } from "react-router-dom";
export const ChatSideBar = ({createChatIsOpen, setCreateChatIsOpen}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { chats, isLoading, fetchMyChats, setActiveChat, activeChat } =
    useChatStore();

  const isAdmin = localStorage.getItem('isAdmin');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyChats();
  }, [fetchMyChats]);

  return (
    <>
      <SideBarBase isAdminButton={isAdmin} isAdminLabel="Админ панель" onClick={() => navigate('/admin')} className="h-full flex flex-col bg-main-bg w-full">
        <header className="p-4 shrink-0">
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
        <nav className="overflow-auto flex-1 min-h-0 pb-4">
          <ItemsList withSearch={false}>
            {chats.map((chat) => (
              <ChatItem
                key={chat.id}
                name={chat.name}
                time={chat.lastMessageAt}
                lastmsg={chat.lastMessage}
                onClick={() => setActiveChat(chat)}
                isActive={activeChat?.id === chat.id}
              />
            ))}
          </ItemsList>
        </nav>
        <div className="w-full h-20 mb-18 flex justify-end pr-2">
          <div className="w-20 h-full rounded-[50%] bg-active-text flex items-center justify-center cursor-pointer" onClick={() => setCreateChatIsOpen(true)}>
            <p className="text-[20px] text-black select-none">+</p>
          </div>
        </div>
      </SideBarBase>
      <SettingsWindow
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};
