import { create } from "zustand";
import { fetchDepartments } from "../api/departmentApi";

export const useDepartmentStore = create((set, get) => ({
    departments: [],
    isLoading: false,
    isLoaded: false,

    fetchDepartments: async () => {
        if (get().isLoaded) return;

        set({ isLoading: true });
        try {
            const data = await fetchDepartments();
            const departmentsList = data?.items || (Array.isArray(data) ? data : []);
            set({ departments: departmentsList, isLoaded: true });
        } catch (err) {
            console.error("Ошибка загрузки отделов:", err);
            set({ departments: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    addDepartment: (department) => {
        set((state) => ({ departments: [...state.departments, department] }));
    },

    updateDepartment: (id, updates) => {
        set((state) => ({
            departments: state.departments.map((d) =>
                d.id === id ? { ...d, ...updates } : d
            ),
        }));
    },
    
    removeDepartment: (id) => {
        set((state) => ({
            departments: state.departments.filter((d) => d.id !== id),
        }));
    },
}));