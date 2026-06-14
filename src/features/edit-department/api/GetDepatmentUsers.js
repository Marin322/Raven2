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

export const ChangeDeptSettings = (formdata, id) => {
    return apiFetch(`/department/${id}`, {
        method: 'POST',
        body: JSON.stringify(formdata)
    });
};

export const UpdateDepartmentSettings = async (departmentId, allowRegularUsersToCreateChats) => {
    return apiFetch(`/Department/${departmentId}/settings`, {
        method: "PATCH",
        body: JSON.stringify({ allowRegularUsersToCreateChats }),
    });
};

export const DeleteDepartment = async (departmentId) => {
    return apiFetch(`/Department/${departmentId}`, {
        method: "DELETE",
    });
};

