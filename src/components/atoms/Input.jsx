import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;