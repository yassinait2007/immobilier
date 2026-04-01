import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  disabled?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  disabled = false,
  className = '',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-8 h-8';
      default:
        return 'w-5 h-5';
    }
  };

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className={`${getSizeClasses()} text-yellow-400 fill-yellow-400 ${
          interactive && !disabled ? 'cursor-pointer hover:scale-110' : ''
        } transition-all duration-200`}
        onClick={() => interactive && !disabled && onRatingChange?.(i + 1)}
      />
    );
  }

  // Add half star if needed
  if (hasHalfStar && stars.length < totalStars) {
    stars.push(
      <div key="half" className="relative">
        <Star className={`${getSizeClasses()} text-gray-300`} />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className={`${getSizeClasses()} text-yellow-400 fill-yellow-400`} />
        </div>
      </div>
    );
  }

  // Add empty stars to make total
  const remainingStars = totalStars - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    const starIndex = fullStars + (hasHalfStar ? 1 : 0) + i;
    stars.push(
      <Star
        key={`empty-${i}`}
        className={`${getSizeClasses()} text-gray-300 ${
          interactive && !disabled ? 'cursor-pointer hover:text-yellow-400 hover:scale-110' : ''
        } transition-all duration-200`}
        onClick={() => interactive && !disabled && onRatingChange?.(starIndex + 1)}
      />
    );
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {stars}
    </div>
  );
};

export default StarRating;
