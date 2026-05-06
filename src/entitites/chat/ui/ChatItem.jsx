export const ChatItem = ({image, name, time, lastmsg, isActive, onClick}) => {
    const date = new Date(time);
    const formattedTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    return (
        <button className={`py-3 px-4 w-full flex gap-5 cursor-pointer ${isActive ? "bg-button-primary-bg" : ""}`} onClick={onClick}>
            {image ? (
        <img className="w-20 h-20 bg-gray-500 rounded-full object-cover shrink-0" src={image} alt={name} />
      ) : (
        <div className="w-20 h-20 bg-active-text rounded-full shrink-0 flex items-center justify-center text-black text-2xl font-bold">
        </div>
      )}
            <div className="grid grid-rows-2 flex-1 min-w-0 text-main-text">
                <div className="grid grid-cols-[80%_20%]">
                    <h2 className="truncate text-[18px] text-left">{name}</h2>
                    <span className="text-right text-second-text">{formattedTime}</span>
                </div>
                <p className="truncate text-left">{lastmsg}</p>
            </div>
        </button>
    );
};
