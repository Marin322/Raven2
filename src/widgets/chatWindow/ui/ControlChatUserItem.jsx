export const ControlChatUserItem = ({user, onClick, isSelected}) => {
    return (
        <div className="p-2 w-full border-2 border-border-bg rounded-3xl cursor-pointer flex justify-between items-center" onClick={onClick}>
            <div>{user.fullName}</div>
            <div className={`w-5 h-5 bg-gray-400 rounded-4xl ${isSelected ? "bg-lime-500" : ""}`}></div>
        </div>
    )
}