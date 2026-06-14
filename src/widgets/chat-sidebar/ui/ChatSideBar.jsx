import { Input } from "../../../shared";
import { ChatItem } from "../../../entitites/chat";
import { SettingsWindow } from "../../settingsWindow";
import { useEffect, useState } from "react";
import { SideBarBase } from "../../../shared";
import { useChatStore } from "../../../entitites/chat/model/useChatStore";
import { ItemsList } from "../../../shared";
import { useNavigate } from "react-router-dom";

export const ChatSideBar = ({ setCreateChatIsOpen }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { chats, isLoading, fetchMyChats, setActiveChat, activeChat } =
    useChatStore();

  const isAdmin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyChats();
  }, [fetchMyChats]);

  const filteredChats = chats.filter((chat) =>
    chat.name?.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <>
      <SideBarBase
        isAdminButton={isAdmin}
        isAdminLabel="Админ панель"
        onClick={() => navigate("/admin")}
        className="h-full flex flex-col bg-main-bg w-full"
      >
        <header className="p-4 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-main-text text-3xl font-bold">Raven Chat</h1>
            <div onClick={() => setIsSettingsOpen(true)} className="cursor-pointer w-8 h-10 relative items-center flex">
              <div
                className="w-8 h-1 z-21 relative bg-black
              before:content-[''] before:absolute before:w-8 before:h-1 before:bg-black before:-top-2.5 before:left-0
              after:content-[''] after:absolute after:w-8 after:h-1 after:bg-black after:top-2.5 after:left-0"
              />
            </div>
          </div>
          <div>
            <Input
              placeholder="Найти..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>
        <nav className="overflow-auto flex-1 min-h-0 pb-4">
          <ItemsList withSearch={false}>
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  name={chat.name}
                  image={chat.avatarUrl}
                  time={chat.lastMessageAt}
                  lastmsg={chat.lastMessage}
                  onClick={() => setActiveChat(chat)}
                  isActive={activeChat?.id === chat.id}
                />
              ))
            ) : (
              !isLoading && (
                <p className="text-center text-sm text-main-text/50 mt-4">
                  Ничего не найдено
                </p>
              )
            )}
          </ItemsList>
        </nav>
        <div className="w-full h-20 mb-18 flex justify-end pr-2">
          <div
            className="w-20 h-full rounded-[50%] bg-active-text flex items-center justify-center cursor-pointer"
            onClick={() => setCreateChatIsOpen(true)}
          >
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