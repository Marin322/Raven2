export const UserListItem = ({
  fullName,
  username,
  departamentName,
  onClick,
}) => {
  return (
    <div className="flex flex-col lg:gap-2 lg:flex-row">
      <div className="w-full p-5 border-2 border-border-bg text-main-text flex rounded-t-2xl justify-between lg:rounded-2xl">
        <div className="text-lg">
          <p>{fullName}</p>
          <p className="text-[14px] text-blue-600">{username}</p>
        </div>
        <div className="flex items-center text-right">
          <p>{departamentName}</p>
        </div>
      </div>
      <div className="w-full p-5 border-b-2 border-r-2 border-l-2 border-border-bg text-main-text rounded-b-2xl lg:hidden cursor-pointer" onClick={onClick}>
        <p>Редактировать</p>
      </div>
      <button
        className="hidden lg:border-2 lg:border-border-bg lg:cursor-pointer lg:p-5 lg:rounded-2xl lg:inline"
        onClick={onClick}
      >
        <p>Редактировать</p>
      </button>
    </div>
  );
};
