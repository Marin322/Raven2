import { useState, useEffect } from "react";
import { ChatInfoModal } from "../ChatInfoModal/ChatInfoModal";
import { useChatStore } from "../../../../entitites/chat/model/useChatStore";
import { ChatMessagesWindow } from "../ChatMessages/ChatMessagesWindow";

export const ChatWindow = ({ chat }) => {
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  let membersCountTitle = "";
  const lastDigit = chat.memberCount % 10;
  const { activeChat, messages, fetchMessages, sendMessage, closeChat } = useChatStore();

  useEffect(() => {
    if (activeChat?.id) {
      fetchMessages(activeChat.id);
    }
  }, [activeChat?.id]);

  if (lastDigit === 1) {
    membersCountTitle = "участник";
  } else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4)
    membersCountTitle = "участника";
  else if (
    lastDigit === 5 ||
    lastDigit === 6 ||
    lastDigit === 7 ||
    lastDigit === 8 ||
    lastDigit === 9 ||
    lastDigit === 0
  )
    membersCountTitle = "участников";

  const handleOpenChatInfo = () => {
    setInfoIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-full">
      <header className="w-full border-b-2 border-border-bg p-5 flex gap-5 items-center">
        <div className="lg:hidden" onClick={closeChat}>
          <div className="w-6 h-0.5 bg-black relative after:content-[''] after:bg-black after:w-3 after:h-0.5 after:rotate-45 after:absolute after:top-1
          before:content-[''] before:bg-black before:w-3 before:h-0.5 before:rotate-135 before:absolute before:-top-1"></div>
        </div>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gray-500"></div>
          <div>
            <p className="text-[18px] text-main-text">{chat.name}</p>
            <p>
              {chat.memberCount} {membersCountTitle}
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
