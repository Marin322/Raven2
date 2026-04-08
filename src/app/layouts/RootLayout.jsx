import { Outlet } from "react-router-dom"
import { signalRService } from "../services/SignalRService";
import { useChatStore } from "../../entitites/chat/model/useChatStore";
import { useEffect } from "react";

export const RootLayout = () => {
    const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      const startSocket = async () => {
        await signalRService.startConnection(token);
        
        // Подписываемся на входящие сообщения
        signalRService.onReceiveMessage((message) => {
          console.log("Новое сообщение из сокета:", message);
          addMessage(message);
        });
      };

      startSocket();
    }

    return () => {
      signalRService.stopConnection();
    };
  }, [addMessage]);
    return (
        <div className="app-container min-h-screen bg-main-bg">
            <Outlet/>
        </div>
    )
}