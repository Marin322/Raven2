import { useEffect, useState } from "react";
import { Input, Button, Select } from "../../../shared";
import { GetDeptUsers } from "../api/GetDepatmentUsers";
import { useDepartmentStore } from "../../../entitites/department/model/useDepartmentStore";
export const EditDepartment = ({ deptData }) => {
  const [deptUsers, setDeptUsers] = useState([]);
  const {departments, fetchDepartments} = useDepartmentStore();
  useEffect(() => {
    const fetchData = async () => {
        const data = await GetDeptUsers(deptData.id);
        setDeptUsers(data);
    }
    if(deptData?.id) {
        fetchData();
    };
    fetchDepartments();
  }, [deptData?.id]);

  if (!deptUsers) return <div>Загрузка...</div>;

  return (
    <div>
      <Select placeholder={`${deptData ? deptData.name : "Выберите отдел..."}`}>
        {departments.map((dept) => (
          <option key={dept.id}>{dept.name}</option>
        ))}
      </Select>
      <Select>
      {deptUsers.map((user) => (
          <option key={user.id}>{user.fullName}</option>
        ))}
      </Select>
    </div>
  );
};
