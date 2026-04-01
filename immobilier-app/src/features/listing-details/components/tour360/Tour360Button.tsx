import React from "react";
import { Rotate3d } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Tour360ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "overlay";
  size?: "sm" | "md" | "lg";
}

export const Tour360Button: React.FC<Tour360ButtonProps> = ({
  onClick,
  disabled = false,
  variant = "default",
  size = "md",
}) => {
  const baseClasses = "font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none";
  
  const variantClasses = {
    default: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl",
    overlay: "bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 shadow-lg hover:shadow-xl border border-white/20",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm rounded-lg",
    md: "px-4 py-2.5 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6",
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        flex items-center gap-2
      `}
    >
      <Rotate3d className={`${iconSizes[size]} animate-pulse`} />
      <span>Visite 360°</span>
    </Button>
  );
};