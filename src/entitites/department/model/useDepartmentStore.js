import { create } from "zustand";
import { fetchDepartments } from "../api/departmentApi";

export const useDepartmentStore = create((set, get) => ({
    departments: [],
    isLoading: false,

    fetchDepartments: async () => {
        set({isLoading: true})
        if(get.departments) return;
        try {
            const data = await fetchDepartments();
            set({departments: data || []});
        } catch(err) {
            return {error: err.message};
        } finally {
            set({isLoading: false});
        };
    }
}))