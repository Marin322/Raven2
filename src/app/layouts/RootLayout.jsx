import { Outlet } from "react-router-dom";
import { signalRService } from "../services/SignalRService";
import { useChatStore } from "../../entitites/chat/model/useChatStore";
import { useEffect, useRef } from "react";

export const RootLayout = () => {
  const addMessage = useChatStore((state) => state.addMessage);
  const connectionAttempted = useRef(false);

  useEffect(() => {
    // Защита от двойного вызова (React StrictMode)
    if (connectionAttempted.current) return;
    connectionAttempted.current = true;

    const token = localStorage.getItem("token");
    
    if (!token) {
      console.warn("No token found in localStorage");
      return;
    }

    const initConnection = async () => {
      console.log("🔌 Initiating SignalR connection...");
      await signalRService.startConnection(token);
      
      // Подписываемся на сообщения только после успешного подключения
      if (signalRService.getState() === "Connected") {
        signalRService.onReceiveMessage((message) => {
          console.log("💬 New message from socket:", message);
          addMessage(message);
        });
      }
    };

    initConnection();

    // Cleanup при размонтировании
    return () => {
      console.log("🧹 Cleaning up SignalR connection");
      signalRService.stopConnection();
      connectionAttempted.current = false;
    };
  }, [addMessage]);

  return (
    <div className="app-container min-h-screen bg-main-bg">
      <Outlet />
    </div>
  );
};