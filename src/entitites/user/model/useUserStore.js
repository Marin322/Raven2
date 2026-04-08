import { create } from "zustand";
import { apiFetch } from "../../../shared/api/api";
import { createUser } from "../api/userApi";

export const useUserStore = create((set, get) => ({
    users: [],
    departments: [],
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

    createUser: async (userData) => {
        set({isLoading:true});
        try {
            const newUser = await createUser(userData);

            set((state) => ({
                users: [...state.users, newUser],
                isLoading: false
            }));

            return{success: true};
        } catch(err) {
            set({isLoading:false});
            return {success: false, error: err.message};
        };
    },

    refreshUsers: async () => {
        set({isLoaded: false});
        await get().fetchUsers();
    },
}));