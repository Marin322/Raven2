import { apiFetch } from "../../../shared";

export const GetDeptUsers = (deptId) => {
    const data = {
        SearchTerm: "",
        DepartmentId: deptId
    };
    return apiFetch(`/user?DepartmentId=${deptId}`, {
        method: 'GET',
    });
};
