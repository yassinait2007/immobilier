import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: string | ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action,
  className = "" 
}: EmptyStateProps) => {
  return (
    <div className={`text-center py-16 ${className}`}>
      {icon && (
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          {typeof icon === 'string' ? (
            <span className="text-3xl text-gray-400">{icon}</span>
          ) : (
            icon
          )}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 max-w-md mx-auto mb-6">{description}</p>
      )}
      {action && action}
    </div>
  );
};
