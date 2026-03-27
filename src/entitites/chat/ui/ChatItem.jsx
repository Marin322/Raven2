export const ChatItem = ({image, name, time, lastmsg}) => {
    return (
        <button className="py-3 px-4 w-full flex gap-5 cursor-pointer">
            <img className="w-20 h-20 bg-gray-500 rounded-[50%] object-cover shrink-0" src={image}/>
            <div className="grid grid-rows-2 flex-1 min-w-0 text-main-text">
                <div className="grid grid-cols-[80%_20%]">
                    <h2 className="text-xl text-left">{name}</h2>
                    <span className="text-right text-second-text">{time}</span>
                </div>
                <p className="truncate text-left">{lastmsg}</p>
            </div>
        </button>
    );
};
