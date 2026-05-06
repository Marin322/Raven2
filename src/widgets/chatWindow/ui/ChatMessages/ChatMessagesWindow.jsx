import { useState, useRef } from "react";
import { useChatStore } from "../../../../entitites/chat/model/useChatStore";
import { Button } from "../../../../shared";
export const ChatMessagesWindow = () => {
  const [inputText, setInputText] = useState("");
  const { activeChat, messages, sendMessage, editMessage, deleteMessage } =
    useChatStore();
  const [editingMessage, setEditingMessage] = useState(null); // НОВОЕ: стейт для редактирования

  const [selectedFile, setSelectedFile] = useState(null); // Стейт для файла
  const fileInputRef = useRef(null); // Ссылка на скрытый инпут

  const myId = localStorage.getItem("userId");
  const handleSend = () => {
    if (!inputText.trim() && !selectedFile) return; // Можно отправить файл без текста

    if (editingMessage) {
      editMessage(editingMessage.id, inputText);
      setEditingMessage(null);
      setInputText("");
      return;
    }

    sendMessage(activeChat.id, inputText, selectedFile);

    setInputText("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isImage = (fileName) => {
    if (!fileName) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
  };

  const cancelEdit = () => {
    setEditingMessage(null);
    setInputText("");
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* --- ОБЛАСТЬ СООБЩЕНИЙ --- */}
      <div className="w-full h-auto max-h-185 lg:max-h-210 flex-1 p-5 gap-3 flex flex-col items-start overflow-auto">
        {messages.map((msg) => {
          const isMe = msg.senderId === myId;
          return (
            <div
              key={msg.id}
              className={`border-2 border-border-bg min-w-20 max-w-[80%] rounded-2xl p-2 h-auto wrap-break-word flex flex-col group ${
                isMe ? "self-end bg-blue-50" : "bg-white"
              }`}
            >
              {/* Если есть медиа */}
              {msg.isMedia && msg.mediaUrl && (
                <div className="mb-2">
                  {isImage(msg.mediaFileName) ? (
                    // ОТОБРАЖЕНИЕ КАРТИНКИ
                    <a
                      href={msg.mediaUrl}
                      target="_blank"
                      
                    >
                      <img
                        src={msg.mediaUrl}
                        alt={msg.mediaFileName}
                        className="max-h-60 rounded-lg object-contain cursor-pointer"
                      />
                    </a>
                  ) : (
                    <a
                      href={msg.mediaUrl}
                      download={msg.mediaFileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                      <span>📎</span>
                      <span className="truncate max-w-[150px] font-medium text-sm">
                        {msg.mediaFileName}
                      </span>
                      {msg.mediaFileSize && (
                        <span className="text-xs text-gray-500">
                          ({(msg.mediaFileSize / 1024).toFixed(1)} KB)
                        </span>
                      )}
                    </a>
                  )}
                </div>
              )}

              {msg.content && <div>{msg.content}</div>}

              <div className="w-full flex items-center justify-end text-[12px] text-gray-500 mt-1 gap-2">
                {isMe && (
                  // Эти кнопки видны только автору и только при наведении на сообщение
                  <div className="flex gap-2 mr-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    {!msg.isMedia && ( // Файлы редактировать не даем
                      <button
                        onClick={() => {
                          setEditingMessage(msg);
                          setInputText(msg.content);
                        }}
                        title="Редактировать"
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                )}

                {msg.isEdited && (
                  <span className="text-[10px] italic">изм.</span>
                )}
                <span>
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- ОБЛАСТЬ ВВОДА --- */}
      <div className="w-full border-t-2 border-border-bg p-2 flex flex-col bg-main-bg">
        {selectedFile && (
          <div className="flex items-center gap-2 mb-2 p-2 bg-gray-100 rounded-lg w-fit">
            <span className="text-sm truncate max-w-[200px]">
              {selectedFile.name}
            </span>
            <button
              onClick={() => {
                setSelectedFile(null);
                fileInputRef.current.value = "";
              }}
              className="text-red-500 font-bold px-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* НОВОЕ: Плашка режима редактирования */}
        {editingMessage && (
          <div className="flex items-center gap-2 mb-2 p-2 bg-blue-100 rounded-lg w-fit text-sm">
            <span>✏️ Редактирование...</span>
            <button
              onClick={cancelEdit}
              className="text-red-500 font-bold px-2 ml-2"
            >
              Отменить
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 w-full pr-5 pl-5 bottom-0 fixed bg-main-bg p-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className={`p-3 text-xl rounded-full transition ${
              editingMessage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            title="Прикрепить файл"
            disabled={!!editingMessage} // Отключаем скрепку при редактировании
          >
            📎
          </button>

          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Написать сообщение..."
            className="flex-1 border-2 border-border-bg rounded-3xl p-3 outline-none"
          />
          <Button
            onClick={handleSend}
            children={editingMessage ? "Сохранить" : "Отправить"}
            className="hidden lg:inline w-auto"
          />
        </div>
      </div>
    </div>
  );
};
