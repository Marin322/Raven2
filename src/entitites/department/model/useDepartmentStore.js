import { create } from "zustand";
import { fetchDepartments } from "../api/departmentApi";

export const useDepartmentStore = create((set) => ({
    departments: [],
    isLoading: false,

    fetchDepartments: async () => {
        set({isLoading: true})
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