export const SideBarBase = ({ children, className = "" }) => {
  return (
    <aside className={`fixed inset-0 z-20 flex flex-col w-full bg-main-bg md:relative md:w-100 md:inset-auto md:border-r-2 md:border-border-bg ${className}`}>
      {children}
    </aside>
  );
};
