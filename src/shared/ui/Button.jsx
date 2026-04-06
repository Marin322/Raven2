import { twMerge } from "tailwind-merge";
export const Button = ({
  className = "",
  variant = "primary",
  children,
  ...props
}) => {
  const baseStyles = "w-full px-4 py-3 rounded-xl cursor-pointer";

  const variants = {
    primary: "bg-button-primary-bg text-white",
    outline: "bg-blue",
    selector: "text-[14px] px-0 py-4 hover:bg-input-bg h-full rounded-[0px] w-full"
  };
  return (
    <button
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
