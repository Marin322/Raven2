export const AboutChatMemberItem = ({ name, username, isOnline }) => {
  return (
    <div className="w-full border-2 border-border-bg p-2 rounded-2xl">
      <div>
        <div className="flex items-center gap-3">
          <p>{name}</p>
          <div className={`w-4 h-4 bg-gray-500 rounded-4xl ${isOnline ? "bg-green-600" : ""}`}></div>
        </div>
        <p className="text-[14px] text-blue-600">{username}</p>
      </div>
    </div>
  );
};
