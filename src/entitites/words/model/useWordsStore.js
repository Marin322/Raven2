import { create } from "zustand";
import { getBannedWords } from "../../../widgets/bannedWords-list/api/bannedWords.api";

export const useWordsStore = create((set, get) => ({
    bannedWords: [],
    isLoaded: false,

    fetchBannedWords: async () => {
        if (get().isLoaded) return;
        try {
            const data = await getBannedWords();
            set({ bannedWords: Array.isArray(data) ? data : [], isLoaded: true });
        } catch (err) {
            console.error("Ошибка загрузки запрещённых слов:", err);
        }
    },

    addWordToStore: (word) =>
        set((state) => ({ bannedWords: [...state.bannedWords, word] })),

    addWordsToStore: (words) =>
        set((state) => ({ bannedWords: [...state.bannedWords, ...words] })),

    removeWordFromStore: (id) =>
        set((state) => ({
            bannedWords: state.bannedWords.filter((w) => w.id !== id),
        })),
}));