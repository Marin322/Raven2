import { create } from "zustand";
import { fetchMyChats } from "../api/chatApi";

export const useChatStore = create((set) => ({
    chats: [],
    activeChat: null,
    isLoading: false,

    fetchMyChats: async () => {
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

    setActiveChat: (chat) => set({activeChat: chat}),
    closeChat: () => set({activeChat: null})
}))