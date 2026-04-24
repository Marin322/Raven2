import { create } from "zustand";
import { getBannedWords } from "../api/bannedWords.api";

export const useWordsStore = create((set, get) => ({
    bannedWords: [],

    fetchBannedWords: async () => {
        const state = get();
        if (state.bannedWords.length > 0) return;
        try {
            const data = await getBannedWords();
            set({bannedWords: data});
        } catch(err) {}
    },

    addWordToStore: (word) => set((state) => ({
        bannedWords: [...state.bannedWords, word]
     })),

     removeWordFromStore: (id) => set((state) => ({
        bannedWords: state.bannedWords.filter(word => word.id !== id)
    }))
}))