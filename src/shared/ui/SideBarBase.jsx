export const SideBarBase = ({
  children,
  className = "",
  isAdminButton = false,
  isAdminLabel,
  onClick,
  ...props
}) => {
  return (
    <aside
      {...props}
      className={`fixed inset-0 z-20 flex flex-col w-full bg-main-bg md:relative md:w-100 md:inset-auto md:border-r-2 md:border-border-bg ${className}`}
    >
      {children}
      {isAdminButton === "true" && (
        <div
          className="bg-main-bg fixed flex bottom-0 border-t-2 border-border-bg w-full p-5 cursor-pointer hover:bg-input-bg transition-colors duration-200 ease-in-out"
          onClick={onClick}
        >
          <p className="text-center w-full text-[18px]">{isAdminLabel}</p>
        </div>
      )}
    </aside>
  );
};
