import { DepartmentListItem } from "./DepartmentListItem";
import { useDepartmentStore } from "../../../entitites/department";
import { useEffect, useState } from "react";
import { ItemsList } from "../../../shared";

export const DepartmentList = ({setFormData, onTabChanged}) => {
  const { departments, isLoading, fetchDepartments } = useDepartmentStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const goToEditDepartment = (dept) => {
    setFormData({
      id: dept.id,
      name: dept.name
    });
    onTabChanged("departmentEdit");
  };

  const filteredDepartments = departments.filter((dept) => {
    const name = dept.name || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div>
      <ItemsList onSearchChange={(e) => setSearchQuery(e.target.value)} searchValue={searchQuery}>
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map((dept) => (
            <DepartmentListItem
              key={dept.id}
              name={dept.name}
              employeeCount={dept.employeeCount}
              onClick={() => goToEditDepartment(dept)}
            />
          ))
        ) : (
          <p>
          {searchQuery
            ? "По вашему запросу никого не найдено :("
            : "Пользователей пока нет"}
        </p>
        )}
      </ItemsList>
    </div>
  );
};
