import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface User {
  firstName: string;
  lastName: string;
  profile?: string;
}

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg" | "xl";
  showRing?: boolean;
  className?: string;
  onClick?: () => void;
}

export const UserAvatar = ({ 
  user, 
  size = "md", 
  showRing = false,
  className = "",
  onClick 
}: UserAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16",
    xl: "h-20 w-20"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base", 
    xl: "text-2xl"
  };

  const getInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  const ringClass = showRing ? "ring-4 ring-primary/10" : "";
  const clickableClass = onClick ? "cursor-pointer hover:scale-105 transition-transform duration-300" : "";

  return (
    <Avatar 
      className={`${sizeClasses[size]} ${ringClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      <AvatarImage
        src={user.profile}
        alt={`${user.firstName} ${user.lastName}`}
        className="object-cover"
      />
      <AvatarFallback className={`bg-gradient-to-br from-primary to-primary-light text-white ${textSizeClasses[size]} font-bold`}>
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
};
