export const Select = ({ children, placeholder, label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 text-second-text font-medium">
      <label className="text-[18px]">{label}</label>
      <select
        className={`px-4 py-3 rounded-xl bg-input-bg outline-none text-black font-normal ${
          error
            ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-500/20"
            : ""
        }`} {...props}
      >
        <option>{placeholder}</option>
        {children}
      </select>
      {error && (
        <span className="text-red-500 text-xs ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};
