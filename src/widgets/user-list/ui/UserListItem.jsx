export const UserListItem = ({ fullName, username, departamentName }) => {
  return (
    <div className="w-full p-5 border-2 border-border-bg text-main-text flex rounded-2xl justify-between">
      <div className="text-lg">
        <p>{fullName}</p>
        <p className="text-[14px] text-blue-600">{username}</p>
      </div>
      <div className="flex items-center">
        <p>{departamentName}</p>
      </div>
    </div>
  );
};
