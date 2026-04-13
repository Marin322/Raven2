import { useState } from "react";
import { useChatStore } from "../../../../entitites/chat/model/useChatStore";
import { Button } from "../../../../shared";
export const ChatMessagesWindow = () => {
  const [inputText, setInputText] = useState("");
  const { activeChat, messages, sendMessage } = useChatStore();
  const myId = localStorage.getItem("userId");
  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(activeChat.id, inputText);
    setInputText("");
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full p-5 gap-3 flex flex-col items-start">
        {messages.map((msg) => {
          const isMe = msg.senderId === myId;
          return (
            <div
              key={msg.id}
              className={`border-2 border-border-bg min-w-20 max-w-75 md:max-w-150 rounded-2xl p-2 h-auto wrap-break-word grid-cols-2 ${
                isMe ? "self-end" : ""
              }`}
            >
              <div className="">{msg.content}</div>
              <div className="w-full text-right text-[14px] mt-1">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 w-full border-t-2 border-border-bg p-2 gap-3 grid lg:grid-cols-[auto_150px]">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="w-full border-2 border-border-bg rounded-3xl p-4"
        />
        <Button onClick={handleSend} children="Отправить" className="hidden lg:inline"/>
      </div>
    </div>
  );
};
