import { SelectorButton } from "./SelectorButton";
export const ChatInfoSelector = ({activeTab, setActiveTab}) => {
  return (
    <div className="w-full border-t-2 border-b-2 border-border-bg gap-4 flex justify-center text-[14px] pr-2 pl-2">
      <SelectorButton children="О чате" isActive={activeTab === "aboutChat"} onClick={() => setActiveTab("aboutChat")}/>
      <SelectorButton children="Медиа" isActive={activeTab === "media"} onClick={() => setActiveTab("media")}/>
      <SelectorButton children="Настройки" isActive={activeTab === "settings"} onClick={() => setActiveTab("settings")}/>
      <SelectorButton children="Управление" isActive={activeTab === "controlChat"} onClick={() => setActiveTab("controlChat")}/>
    </div>
  );
};
