import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = "sm", 
  showValue = false,
  className = "" 
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  };

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star 
        key={`full-${i}`} 
        className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400`} 
      />
    );
  }

  if (hasHalfStar && stars.length < maxRating) {
    stars.push(
      <div key="half" className="relative">
        <Star className={`${sizeClasses[size]} text-gray-300`} />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400`} />
        </div>
      </div>
    );
  }

  const remainingStars = maxRating - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <Star 
        key={`empty-${i}`} 
        className={`${sizeClasses[size]} text-gray-300`} 
      />
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {stars}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
