export const ChatWindow = ({ chat }) => {
    const membersCountTitle = "";
    const lastDigit = chat.memberCount % 10;
    if (lastDigit === 1) {
        membersCountTitle = "участник"
    }
    else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) membersCountTitle = "участника";
    else if (lastDigit === 5 || lastDigit === 6 || lastDigit === 7 || lastDigit === 8 || lastDigit === 9) membersCountTitle = "участников";

  return (
    <div>
      <header className="w-full border-b-2 border-border-bg p-5 flex gap-5 items-center">
        <div>
          <p>--</p>
        </div>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gray-500"></div>
          <div>
            <p className="text-[18px] text-main-text">{chat.name}</p>
          </div>
        </div>
      </header>
    </div>
  );
};
