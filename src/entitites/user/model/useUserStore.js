import { create } from "zustand";
import { apiFetch } from "../../../shared/api/api";

export const useUserStore = create((set, get) => ({
    users: [],
    isLoading: false,
    isLoaded: false,

    fetchUsers: async () => {
        if (get().isLoaded) return;

        set({ isLoaded: true });
        try {
            const data = await apiFetch("/search/users");
            // Сохраняем данные в "сейф"
            set({ users: data.items || [], isLoaded: true });
        } catch (err) {
            console.error("Ошибка загрузки:", err);
        } finally {
            set({ isLoading: false });
        }
    },

    refreshUsers: async () => {
        set({isLoaded: false});
        await get().fetchUsers();
    }
}));