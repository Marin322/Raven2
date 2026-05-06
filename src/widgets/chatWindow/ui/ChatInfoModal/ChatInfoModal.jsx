import { act, useState } from "react";
import { ChatInfoSelector } from "./components/ChatInfoSelector";
import { AboutChatModalPart } from "./components/AboutChat/AboutChatModalPart";
import { ControlChatModalPart } from "./components/ControlChatModalPart";
import { ChatSettingsPart } from "./components/ChatSettingsPart";
export const ChatInfoModal = ({ infoIsOpen, chat }) => {
  const [activeTab, setActiveTab] = useState("aboutChat");
  const renderContent = () => {
    switch(activeTab) {
      case "aboutChat":
        return <AboutChatModalPart chatId={chat.id}/>
      case "media":
        return <div>media</div>
      case "settings":
        return <ChatSettingsPart chatId={chat.id}/>
      case "controlChat":
        return <ControlChatModalPart chatId={chat.id}/>
    }
  }
  return (
    <div
      className={`
          fixed lg:absolute right-0 h-full z-50
          w-full sm:w-80 lg:w-100 
          bg-modal-bg border-l-2 border-border-bg
          transition-transform duration-300 ease-in-out
          ${infoIsOpen ? "translate-x-0" : "translate-x-full"}
        `}
    >
      <div className="w-full h-full flex flex-col items-center gap-2 pt-5">
        <div className="w-25 h-25 rounded-[50%] bg-gray-500">
          <img/>
        </div>
        <p className="text-main-text text-lg">{chat.name}</p>
        <ChatInfoSelector activeTab={activeTab} setActiveTab={setActiveTab}/>
        {renderContent()}
      </div>
    </div>
  );
};
