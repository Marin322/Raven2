import { useState, useEffect } from "react";
import { ChatInfoModal } from "../ChatInfoModal/ChatInfoModal";
import { useChatStore } from "../../../../entitites/chat/model/useChatStore";
import { ChatMessagesWindow } from "../ChatMessages/ChatMessagesWindow";

export const ChatWindow = ({ chat }) => {
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const { activeChat, fetchMessages, closeChat } = useChatStore();

  useEffect(() => {
    if (activeChat?.id) {
      fetchMessages(activeChat.id);
    }
  }, [activeChat?.id]);

  // Функция для правильного склонения слова "участник" (с учетом 11-14)
  const getMembersTitle = (count) => {
    const rem100 = count % 100;
    if (rem100 >= 11 && rem100 <= 14) return "участников";

    const rem10 = count % 10;
    if (rem10 === 1) return "участник";
    if (rem10 >= 2 && rem10 <= 4) return "участника";
    return "участников";
  };

  const handleOpenChatInfo = () => {
    setInfoIsOpen((prev) => !prev);
  };

  // Берем первую букву для заглушки
  const firstLetter = chat.name ? chat.name[0].toUpperCase() : "?";

  return (
    <div className="w-full h-full flex flex-col">
      <header className="w-full border-b-2 border-border-bg p-5 flex gap-5 items-center">
        <div className="lg:hidden" onClick={closeChat}>
          <div className="w-6 h-0.5 bg-black relative after:content-[''] after:bg-black after:w-3 after:h-0.5 after:rotate-45 after:absolute after:top-1
          before:content-[''] before:bg-black before:w-3 before:h-0.5 before:rotate-135 before:absolute before:-top-1"></div>
        </div>
        
        <div className="flex gap-3 items-center">
          {/* Аватарка или первая буква чата */}
          {chat.avatarUrl ? (
            <img 
              className="w-10 h-10 rounded-2xl bg-gray-500 object-cover shrink-0" 
              src={chat.avatarUrl} 
              alt={chat.name}
            />
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-gray-200 shrink-0 flex items-center justify-center text-black text-lg font-bold select-none">
              {firstLetter}
            </div>
          )}

          <div>
            <p className="text-[18px] text-main-text leading-tight">{chat.name}</p>
            <p className="text-sm text-second-text leading-tight">
              {chat.memberCount} {getMembersTitle(chat.memberCount)}
            </p>
          </div>
        </div>
        
        <div
          className="fixed right-0 mr-5 text-2xl cursor-pointer"
          onClick={handleOpenChatInfo}
        >
          ☰
        </div>
      </header>
      <ChatInfoModal infoIsOpen={infoIsOpen} chat={chat} />
      <ChatMessagesWindow/>
    </div>
  );
};