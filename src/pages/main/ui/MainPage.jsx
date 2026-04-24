import { ChatSideBar } from "../../../widgets/chat-sidebar";
import { ChatWindow } from "../../../widgets/chatWindow";
import { useChatStore } from "../../../entitites/chat/model/useChatStore";
import { useState } from "react";

export const MainPage = () => {
  const activeChat = useChatStore((state) => state.activeChat);
  const [createChatIsOpen, setCreateChatIsOpen] = useState(true);
  
  return (
    <div className="w-full h-screen overflow-hidden bg-main-bg flex relative">
      <div
        className={`
          w-full h-full border-r border-border-bg transition-transform duration-300 
          absolute lg:w-100 lg:relative z-40 bg-main-bg
          ${activeChat ? "-translate-x-full lg:translate-x-0" : "translate-x-0"}
        `}
      >
        <ChatSideBar createChatIsOpen={createChatIsOpen} setCreateChatIsOpen={setCreateChatIsOpen}/>
      </div>

      <div
        className={`
          flex-1 h-full transition-transform duration-300
          absolute lg:relative inset-0 z-30 bg-main-bg
          ${activeChat ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
      >
        {activeChat ? (
          <ChatWindow chat={activeChat} />
        ) : (
          <div className="hidden lg:flex h-full items-center justify-center text-2xl text-second-text">
            <p>Выберите чат для общения!</p>
          </div>
        )}
      </div>
      {createChatIsOpen && (
          <div className="fixed w-full h-full bg-black/50 z-40 bottom-0"></div>
        )}
    </div>
  );
};