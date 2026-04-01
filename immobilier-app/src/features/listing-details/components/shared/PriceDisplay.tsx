import { formatCurrency } from "@/utils/formaters";

interface PriceDisplayProps {
  amount: number;
  size?: "sm" | "md" | "lg" | "xl";
  period?: string;
  className?: string;
}

export const PriceDisplay = ({ 
  amount, 
  size = "md", 
  period,
  className = "" 
}: PriceDisplayProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl lg:text-4xl"
  };

  const periodSizeClasses = {
    sm: "text-sm",
    md: "text-base", 
    lg: "text-lg",
    xl: "text-lg"
  };

  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className={`${sizeClasses[size]} font-bold text-primary`}>
        {formatCurrency(amount)}
      </span>
      {period && (
        <span className={`${periodSizeClasses[size]} text-gray-600 font-medium`}>
          {period}
        </span>
      )}
    </div>
  );
};
