import { useState, useRef } from "react";
import { useChatStore } from "../../../../entitites/chat/model/useChatStore";
import { Button } from "../../../../shared";

const isImage = (fileName) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName || "");

const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// Модалка выбора чата для пересылки
const ForwardModal = ({ chats, onSelect, onClose }) => (
    <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        onClick={onClose}
    >
        <div
            className="bg-main-bg border-2 border-border-bg rounded-2xl p-5 w-80 max-h-96 overflow-y-auto flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
        >
            <p className="text-main-text font-medium mb-2">Переслать в чат...</p>
            {chats.map((chat) => (
                <button
                    key={chat.id}
                    onClick={() => onSelect(chat.id)}
                    className="text-left p-2 rounded-lg border border-border-bg hover:bg-gray-100 text-main-text"
                >
                    {chat.name}
                </button>
            ))}
        </div>
    </div>
);

// Модалка поиска по сообщениям
const SearchModal = ({ chatId, onClose }) => {
    const [term, setTerm]       = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { searchMessages }    = useChatStore();

    const handleSearch = async () => {
        if (!term.trim()) return;
        setLoading(true);
        const data = await searchMessages({ chatId, searchTerm: term });
        setResults(data);
        setLoading(false);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-main-bg border-2 border-border-bg rounded-2xl p-5 w-96 max-h-[80vh] flex flex-col gap-3"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-main-text font-medium">Поиск по сообщениям</p>
                <div className="flex gap-2">
                    <input
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Введите текст..."
                        className="flex-1 border-2 border-border-bg rounded-lg p-2 outline-none text-sm"
                    />
                    <Button onClick={handleSearch}>Найти</Button>
                </div>

                <div className="overflow-y-auto flex flex-col gap-2">
                    {loading && <p className="text-gray-400 text-sm">Поиск...</p>}
                    {!loading && results.length === 0 && term && (
                        <p className="text-gray-400 text-sm">Ничего не найдено</p>
                    )}
                    {results.map((msg) => (
                        <div key={msg.id} className="border border-border-bg rounded-lg p-2 text-sm">
                            <p className="text-gray-400 text-xs">{msg.senderName}</p>
                            <p className="text-main-text">{msg.content}</p>
                            <p className="text-gray-400 text-xs mt-1">
                                {new Date(msg.createdAt).toLocaleString("ru-RU")}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const ChatMessagesWindow = () => {
    const [inputText, setInputText]         = useState("");
    const [selectedFile, setSelectedFile]   = useState(null);
    const [editingMessage, setEditingMessage] = useState(null);
    const [forwardingMessage, setForwardingMessage] = useState(null);
    const [searchOpen, setSearchOpen]       = useState(false);

    const fileInputRef = useRef(null);
    const myId = localStorage.getItem("userId");

    const { activeChat, messages, chats, sendMessage, editMessage, deleteMessage, forwardMessage } =
        useChatStore();

    const handleSend = () => {
        if (!inputText.trim() && !selectedFile) return;

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

    const handleForward = async (targetChatId) => {
        await forwardMessage(forwardingMessage.id, targetChatId);
        setForwardingMessage(null);
    };

    const cancelEdit = () => {
        setEditingMessage(null);
        setInputText("");
    };

    return (
        <div className="w-full h-full flex flex-col">

            {/* Кнопка поиска */}
            <div className="flex justify-end px-4 pt-2">
                <button
                    onClick={() => setSearchOpen(true)}
                    className="text-sm text-gray-400 hover:text-main-text transition"
                    title="Поиск по сообщениям"
                >
                    🔍 Поиск
                </button>
            </div>

            {/* Область сообщений */}
            <div className="w-full flex-1 p-5 gap-3 flex flex-col items-start overflow-auto">
                {messages.map((msg) => {
                    const isMe = msg.senderId === myId;
                    return (
                        <div
                            key={msg.id}
                            className={`border-2 border-border-bg min-w-20 max-w-[80%] rounded-2xl p-2 h-auto flex flex-col group ${
                                isMe ? "self-end bg-blue-50" : "bg-white"
                            }`}
                        >
                            {/* Имя отправителя (для чужих сообщений) */}
                            {!isMe && (
                                <p className="text-xs text-blue-500 font-medium mb-1">{msg.senderName}</p>
                            )}

                            {/* Пересланное сообщение */}
                            {msg.forwardedFrom && (
                                <div className="border-l-4 border-blue-400 pl-2 mb-2 text-sm text-gray-500">
                                    <p className="font-medium text-xs">{msg.forwardedFrom.senderName}</p>
                                    <p className="truncate">{msg.forwardedFrom.content}</p>
                                </div>
                            )}

                            {/* Медиа */}
                            {msg.isMedia && msg.mediaUrl && (
                                <div className="mb-2">
                                    {isImage(msg.mediaFileName) ? (
                                        <a href={msg.mediaUrl} target="_blank" rel="noopener noreferrer">
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
                                            className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                        >
                                            <span className="text-xl">📎</span>
                                            <div className="flex flex-col min-w-0">
                                                <span className="truncate max-w-[180px] text-sm font-medium text-main-text">
                                                    {msg.mediaFileName}
                                                </span>
                                                {msg.mediaFileSize && (
                                                    <span className="text-xs text-gray-400">
                                                        {formatFileSize(msg.mediaFileSize)}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="ml-auto text-xs text-blue-500 shrink-0">Скачать</span>
                                        </a>
                                    )}
                                </div>
                            )}

                            {/* Текст */}
                            {msg.content && (
                                <div className="text-main-text break-words">{msg.content}</div>
                            )}

                            {/* Нижняя строка: кнопки + время */}
                            <div className="w-full flex items-center justify-end text-[12px] text-gray-500 mt-1 gap-2">
                                <div className="flex gap-2 mr-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                    {/* Редактировать — только автор, только текст */}
                                    {isMe && !msg.isMedia && (
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
                                    {/* Удалить — только автор */}
                                    {isMe && (
                                        <button onClick={() => deleteMessage(msg.id)} title="Удалить">
                                            🗑️
                                        </button>
                                    )}
                                    {/* Переслать — все */}
                                    <button
                                        onClick={() => setForwardingMessage(msg)}
                                        title="Переслать"
                                    >
                                        ↪️
                                    </button>
                                </div>

                                {msg.isEdited && <span className="text-[10px] italic">изм.</span>}
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

            {/* Область ввода */}
            <div className="w-full border-t-2 border-border-bg p-2 flex flex-col bg-main-bg">
                {/* Превью выбранного файла */}
                {selectedFile && (
                    <div className="flex items-center gap-2 mb-2 p-2 bg-gray-100 rounded-lg w-fit">
                        <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
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

                {/* Плашка режима редактирования */}
                {editingMessage && (
                    <div className="flex items-center gap-2 mb-2 p-2 bg-blue-100 rounded-lg w-fit text-sm">
                        <span>✏️ Редактирование...</span>
                        <button onClick={cancelEdit} className="text-red-500 font-bold px-2 ml-2">
                            Отменить
                        </button>
                    </div>
                )}

                <div className="flex items-center gap-2 w-full">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        disabled={!!editingMessage}
                        className={`p-3 text-xl rounded-full transition ${
                            editingMessage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
                        }`}
                        title="Прикрепить файл"
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
                    <Button onClick={handleSend} className="hidden lg:inline w-auto">
                        {editingMessage ? "Сохранить" : "Отправить"}
                    </Button>
                </div>
            </div>

            {/* Модалка пересылки */}
            {forwardingMessage && (
                <ForwardModal
                    chats={chats}
                    onSelect={handleForward}
                    onClose={() => setForwardingMessage(null)}
                />
            )}

            {/* Модалка поиска */}
            {searchOpen && (
                <SearchModal
                    chatId={activeChat?.id}
                    onClose={() => setSearchOpen(false)}
                />
            )}
        </div>
    );
};