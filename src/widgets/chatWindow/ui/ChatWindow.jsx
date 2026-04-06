import { useState } from "react";
import { ChatInfoModal } from "./ChatInfoModal";

export const ChatWindow = ({ chat }) => {
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const membersCountTitle = "";
  const lastDigit = chat.memberCount % 10;

  if (lastDigit === 1) {
    membersCountTitle = "участник";
  } else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4)
    membersCountTitle = "участника";
  else if (
    lastDigit === 5 ||
    lastDigit === 6 ||
    lastDigit === 7 ||
    lastDigit === 8 ||
    lastDigit === 9
  )
    membersCountTitle = "участников";

  const handleOpenChatInfo = () => {
    setInfoIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-full">
      <header className="w-full border-b-2 border-border-bg p-5 flex gap-5 items-center">
        <div className="md:hidden">
          <p>--</p>
        </div>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gray-500"></div>
          <div>
            <p className="text-[18px] text-main-text">{chat.name}</p>
          </div>
        </div>
        <div
          className="fixed right-0 mr-5 text-2xl cursor-pointer"
          onClick={handleOpenChatInfo}
        >
          ☰
        </div>
      </header>
      <ChatInfoModal infoIsOpen={infoIsOpen} chat={chat}/>
    </div>
  );
};
