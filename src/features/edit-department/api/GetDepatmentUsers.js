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

export const GetUsers = () => {
    return apiFetch(`/user`, {
        method: 'GET',
    });
}

export const CreateDeptManager = (userId, deptId) => {
    return apiFetch(`/department/${deptId}/set-head`, {
        method: 'POST',
        body: JSON.stringify({
            userId: userId
        })
    });
};
