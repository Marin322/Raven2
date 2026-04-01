import { DepartmentListItem } from "./DepartmentListItem";
import { useDepartmentStore } from "../../../entitites/department";
import { useEffect } from "react";
import { ItemsList } from "../../../shared";

export const DepartmentList = () => {
  const { departments, isLoading, fetchDepartments } = useDepartmentStore();

  useEffect(() => {
    fetchDepartments();
  }, []);

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div>
      <ItemsList>
        {departments.length > 0 ? (
          departments.map((dept) => (
            <DepartmentListItem
              key={dept.id}
              name={dept.name}
              employeeCount={dept.employeeCount}
            />
          ))
        ) : (
          <p>Не найдено ни одного отдела</p>
        )}
      </ItemsList>
    </div>
  );
};
