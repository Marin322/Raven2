export const DepartmentListItem = ({ name, employeeCount }) => {
  return (
    <div className="border-2 border-border-bg rounded-2xl justify-between p-5 flex text-main-text">
      <p className="text-lg">{name}</p>
      <div className="flex gap-4">
        <p>Количество сотрудников: </p>
        <p className="text-lg">{employeeCount}</p>
      </div>
    </div>
  );
};
