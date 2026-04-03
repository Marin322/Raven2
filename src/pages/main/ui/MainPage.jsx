import { ChatSideBar } from "../../../widgets/chat-sidebar";
import { ChatWindow } from "../../../widgets/chatWindow";
import { useChatStore } from "../../../entitites/chat/model/useChatStore";
export const MainPage = () => {
    const activeChat = useChatStore((state) => state.activeChat);
    return (
        <div className="w-full h-screen overflow-hidden bg-main-bg flex">
            <ChatSideBar/>
            {activeChat ? (
                <ChatWindow chat={activeChat}/>
            ) : (
                <div className="flex-1 flex items-center justify-center text-2xl text-second-text">
                    <p>Выберите чат для общения!</p>
                </div>
            )}
        </div>
    );
};