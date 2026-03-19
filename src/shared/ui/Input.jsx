export const Input = ({
  label,
  error,
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-[18px] font-medium text-second-text ml-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`bg-input-bg w-full px-4 py-3 border-2 border-border-bg rounded-xl transition-all outline-none font-medium 
                ${
                  error
                    ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }`}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-xs ml-1 animate-in fade-in slide-in-from-top-1">
            {error}
        </span>
      )}
    </div>
  );
};
