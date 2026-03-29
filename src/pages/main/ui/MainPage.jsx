import { ChatSideBar } from "../../../widgets/chat-sidebar";
export const MainPage = () => {
    return (
        <div className="w-full h-screen overflow-hidden bg-main-bg flex">
            <ChatSideBar/>
        </div>
    );
};