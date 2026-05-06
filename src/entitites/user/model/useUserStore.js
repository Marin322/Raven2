import { create } from "zustand";
import { apiFetch } from "../../../shared/api/api";
import { createUser } from "../api/userApi";

export const useUserStore = create((set, get) => ({
    users: [],
    departments: [],
    isLoading: false,
    isLoaded: false,
    lastFetchedType: null, // Чтобы знать, какой список сейчас в памяти

    fetchUsers: async (isFrozen = false) => {
        // Если мы уже загрузили этот конкретный список, не спамим (опционально)
        if (get().isLoaded && get().lastFetchedType === isFrozen) return;
        
        set({ isLoading: true, isLoaded: false }); 
        
        try {
            // Если isFrozen === true, идем на админский эндпоинт
            // Если false — на обычный поиск
            const endpoint = isFrozen ? "/Admin/frozen-users" : "/search/users";
            const data = await apiFetch(endpoint);

            // Обрабатываем разницу в ответах: 
            // /search/users обычно возвращает { items: [] }, а обычный список может вернуть просто массив
            const usersList = data.items || (Array.isArray(data) ? data : []);

            set({ 
                users: usersList, 
                isLoaded: true, 
                lastFetchedType: isFrozen 
            });
        } catch (err) {
            console.error("Ошибка загрузки:", err);
            set({ users: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    createUser: async (userData) => {
        set({ isLoading: true });
        try {
            const newUser = await createUser(userData);
            set((state) => ({
                users: [...state.users, newUser],
                isLoading: false
            }));
            return newUser;
        } catch (err) {
            set({ isLoading: false });
            throw err;
        }
    },

    refreshUsers: async () => {
        const isFrozen = get().lastFetchedType;
        set({ isLoaded: false });
        await get().fetchUsers(isFrozen);
    },
}));