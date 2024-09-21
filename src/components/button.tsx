import { ReactNode } from "react";
import { cn } from "../utils/cn";

type TButton = {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm";
};

const Button = ({ children, className }: TButton) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-[1px] inline-flex items-center justify-center text-sm font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
