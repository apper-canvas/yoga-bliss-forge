import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ className, variant = "primary", children, ...props }, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white",
    secondary: "bg-gradient-to-r from-secondary-100 to-primary-100 text-primary-700",
    accent: "bg-gradient-to-r from-accent-400 to-accent-500 text-white",
    success: "bg-gradient-to-r from-green-400 to-green-500 text-white",
    warning: "bg-gradient-to-r from-orange-400 to-orange-500 text-white",
    error: "bg-gradient-to-r from-red-400 to-red-500 text-white"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;