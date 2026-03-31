import { Input } from "./Input";
export const ItemsList = ({ children, onSearchChange, searchValue, withSearch = true }) => {
  return (
    <div className="gap-5 flex flex-col">
      {withSearch && (
        <Input placeholder="Поиск..." onChange={onSearchChange} value={searchValue} />
      )}
      <div className="flex flex-col w-full max-w-2xl gap-5">{children}</div>
    </div>
  );
};
