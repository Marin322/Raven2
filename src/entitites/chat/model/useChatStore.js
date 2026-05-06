import { create } from "zustand";
import { fetchMyChats, getChatDetails, addNewUsersTargetChat2, getChatHistory, sendMessageApi, deleteChatApi, updateChatApi, uploadChatAvatarApi } from "../api/chatApi";
import {createChat} from '../api/chatApi'

export const useChatStore = create((set, get) => ({
    chats: [],
    chatDetailsCache: {},
    activeChat: null,
    activeChatDetails: null,
    isLoading: false,
    isDetailsLoading: false,
    messages: [],

    fetchMyChats: async () => {
        const state = get();
        if (state.chats.length > 0) return;
        set({ isLoading: true });
        try {
            const data = await fetchMyChats();
            set({ chats: data });
        } catch (err) {
            throw new Error(err.message);
        } finally {
            set({ isLoading: false })
        }
    },

    fetchChatDetails: async (chatId) => {
        const { chatDetailsCache } = get();

        if (chatDetailsCache[chatId]) {
            set({ activeChatDetails: chatDetailsCache[chatId] });
            return;
        };
        set({ isDetailsLoading: true });
        try {
            const data = await getChatDetails(chatId);
            set((state) => ({
                activeChatDetails: data,
                chatDetailsCache: { ...state.chatDetailsCache, [chatId]: data }
            }));
        } catch (err) {
            throw new Error(err.message);
        } finally {
            set({ isDetailsLoading: false });
        };
    },

    addNewUsersTargetChat: async (usersIds, chatId) => {
        try {
            const data = await addNewUsersTargetChat2(usersIds, chatId);
            console.log(data)
        } catch (err) {
            throw new Error(err.message);
        } finally { }
    },

    setActiveChat: (chat) => set({
        activeChat: chat,
        activeChatDetails: null
    }),

    closeChat: (chat) => set({
        activeChat: null,
        activeChatDetails: null
    }),

    fetchMessages: async (chatId) => {
        try {
            const response = await getChatHistory(chatId);
            // Создаем копию массива перед reverse(), чтобы не мутировать оригинальные данные
            set({ messages: [...response.items].reverse() });
        } catch (err) {
            console.error(err);
        };
    },

    // Добавление одного сообщения (для SignalR)
    addMessage: (message) => {
        const { activeChat, messages } = get();
        if (activeChat && message.chatId === activeChat.id) {
            set({ messages: [...messages, message] });
        }

    },

    sendMessage: async (chatId, content, file = null) => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("ChatId", chatId);
        formData.append("Content", content || "");
        if (file) formData.append("File", file);
    
        try {
            const response = await fetch("https://ravenapp.ru/api/Message", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                    // ВАЖНО: Тут ПУСТО, никакого Content-Type
                },
                body: formData
            });
    
            if (!response.ok) throw new Error("Ошибка сервера");
            
            // После успешной отправки ничего в стейт не пушим, 
            // ждем прилета сообщения по SignalR
        } catch (err) {
            console.error("Ошибка в sendMessage:", err);
        }
    },

    sendMessageWithFileApi: async (chatId, content, file) => {
        const token = localStorage.getItem("token");

        // Создаем объект FormData
        const formData = new FormData();
        formData.append("ChatId", chatId);
        formData.append("Content", content || ""); // Бэкенд может ругаться на null, лучше пустую строку

        if (file) {
            formData.append("File", file);
        }

        const response = await fetch("https://ravenapp.ru/api/Message", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
                // 🚫 ВАЖНО: Мы НЕ указываем 'Content-Type': 'application/json'
                // Браузер сам подставит 'multipart/form-data' и правильный boundary
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error("Ошибка при отправке файла");
        }

        return await response.json();
    },

    editMessage: async (id, content) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`https://ravenapp.ru/api/Message/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content })
            });
            if (!response.ok) throw new Error("Ошибка редактирования");
        } catch (err) {
            console.error(err);
        }
    },

    deleteMessage: async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`https://ravenapp.ru/api/Message/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Ошибка удаления");
        } catch (err) {
            console.error(err);
        }
    },

    // Методы для SignalR (чтобы обновлять UI в реальном времени)
    updateMessageInStore: (updatedMessage) => {
        set((state) => ({
            messages: state.messages.map((m) => 
                m.id === updatedMessage.id ? updatedMessage : m
            )
        }));
    },

    removeMessageFromStore: (messageId) => {
        set((state) => ({
            messages: state.messages.filter((m) => m.id !== messageId)
        }));
    },

    createChat: async (formData) => {
        set({ isLoading: true });
        try {
            const newChat = await createChat(formData);
            
            // Обновляем список чатов, добавляя новый в начало
            set((state) => ({
                chats: [newChat, ...state.chats] 
            }));
            
            return newChat; // Возвращаем данные для компонента, если нужно
        } catch (err) {
            // Пробрасываем ошибку дальше, чтобы компонент мог её отобразить
            throw new Error(err.message || "Ошибка при создании чата");
        } finally {
            set({ isLoading: false });
        }
    },

    updateChat: async (chatId, name, description) => {
        set({ isDetailsLoading: true });
        try {
            const updatedData = await updateChatApi(chatId, { name, description });
            
            // Обновляем детали в кэше и активном чате
            set((state) => ({
                activeChatDetails: { ...state.activeChatDetails, name, description },
                chats: state.chats.map(c => c.id === chatId ? { ...c, name, description } : c),
                chatDetailsCache: {
                    ...state.chatDetailsCache,
                    [chatId]: { ...state.chatDetailsCache[chatId], name, description }
                }
            }));
            return updatedData;
        } catch (err) {
            throw new Error(err.message);
        } finally {
            set({ isDetailsLoading: false });
        }
    },

    deleteChat: async (chatId) => {
        try {
            await deleteChatApi(chatId);
            set((state) => ({
                chats: state.chats.filter(c => c.id !== chatId),
                activeChat: state.activeChat?.id === chatId ? null : state.activeChat,
                activeChatDetails: state.activeChatDetails?.id === chatId ? null : state.activeChatDetails
            }));
        } catch (err) {
            throw new Error(err.message);
        }
    },

    uploadAvatar: async (chatId, file) => {
        try {
          const response = await uploadChatAvatarApi(chatId, file);
          const newUrl = response.avatarUrl;
    
          // Обновляем URL аватара в списке чатов и в деталях активного чата
          set((state) => ({
            chats: state.chats.map((c) =>
              c.id === chatId ? { ...c, avatarUrl: newUrl } : c
            ),
            activeChatDetails: state.activeChatDetails?.id === chatId 
              ? { ...state.activeChatDetails, avatarUrl: newUrl } 
              : state.activeChatDetails,
          }));
        } catch (err) {
          console.error("Ошибка загрузки аватара:", err);
        }
      },
    
      deleteAvatar: async (chatId) => {
        try {
          await deleteChatAvatarApi(chatId);
          set((state) => ({
            chats: state.chats.map((c) =>
              c.id === chatId ? { ...c, avatarUrl: null } : c
            ),
            activeChatDetails: state.activeChatDetails?.id === chatId 
              ? { ...state.activeChatDetails, avatarUrl: null } 
              : state.activeChatDetails,
          }));
        } catch (err) {
          console.error("Ошибка удаления аватара:", err);
        }
      },
      

}))