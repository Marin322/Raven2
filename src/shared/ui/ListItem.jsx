export const ListItem = ({
  icon,
  label,
  isActive,
  onClick,
  className = "",
  isDropdown = false,
  isExpanded = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 transition-all duration-200 rounded-lg border-2 border-border-bg cursor-pointer
            ${
              isActive && "text-active-text bg-listItem-active-bg"
            } ${className}`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <svg
            className={`${isActive ? "text-main-text" : "text-active-text"}`}
          />
        )}
        <span className="text-lg font-medium">{label}</span>
      </div>
      {isDropdown && (
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </button>
  );
};
