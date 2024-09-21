import { ReactNode } from "react";
import { cn } from "../utils/cn";

type TButton = {
  children: ReactNode;
  className?: string;
  size?: "sm";
  onClick?: () => void;
};

const Button = ({ children, className, size, onClick }: TButton) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-sm inline-flex items-center justify-center text-sm font-normal bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700",
        className,
        {
          "px-2 py-0.5 text-xs rounded-full": size === "sm",
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
