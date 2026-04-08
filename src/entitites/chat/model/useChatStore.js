import { create } from "zustand";
import { fetchMyChats, getChatDetails, addNewUsersTargetChat } from "../api/chatApi";

export const useChatStore = create((set, get) => ({
    chats: [],
    chatDetailsCache: {},
    activeChat: null,
    activeChatDetails: null,
    isLoading: false,
    isDetailsLoading: false,

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
            set({ activeChatDetails: chatDetailsCache[chatId]});
            return;
        };
        set({isDetailsLoading: true});
        try {
            const data = await getChatDetails(chatId);
            set((state) => ({
                activeChatDetails: data,
                chatDetailsCache: {...state.chatDetailsCache, [chatId]: data}
            }));
        } catch(err) {
            throw new Error(err.message);
        } finally {
            set({isDetailsLoading: false});
        };
    },

    addNewUsersTargetChat: async (usersIds, chatId) => {
        try {
            const data = await addNewUsersTargetChat(usersIds, chatId);
            console.log(data)
        } catch(err) {
            throw new Error(err.message);
        } finally {}
    },

    setActiveChat: (chat) => set({
        activeChat: chat,
        activeChatDetails:null
    }),

    closeChat: (chat) => set({
        activeChat: null,
        activeChatDetails: null
    })
}))