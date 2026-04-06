export const SelectorButton = ({children, isActive, ...props}) => {
    return (
        <button {...props} className={`cursor-pointer p-2 ${isActive ? " bg-listItem-active-bg" : ""}`}>{children}</button>
    )
}