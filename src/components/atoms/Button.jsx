import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 premium-shadow",
    secondary: "bg-gradient-to-r from-secondary-50 to-primary-50 text-primary-700 hover:from-secondary-100 hover:to-primary-100 border border-primary-200",
    accent: "bg-gradient-to-r from-accent-400 to-accent-500 text-white hover:from-accent-500 hover:to-accent-600 premium-shadow",
    outline: "border-2 border-primary-300 text-primary-600 hover:bg-primary-50 hover:border-primary-400",
    ghost: "text-primary-600 hover:bg-primary-50 hover:text-primary-700"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "rounded-xl font-medium transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;