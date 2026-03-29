export const ListItem = ({ icon, label, isActive, onClick, className = "" }) => {
    return (
        <button onClick={onClick}
        className={`w-full flex items-center justify-between p-3 transition-all duration-200 rounded-lg border-2 border-border-bg cursor-pointer
            ${isActive && ("text-active-text bg-listItem-active-bg")} ${className}`}>
                <div className="flex items-center gap-3">
                    {icon && <svg className={`${isActive ? ("text-main-text") : ("text-active-text")}`}/>}
                    <span className="text-lg font-medium">{label}</span>
                </div>
            </button>
    )
}