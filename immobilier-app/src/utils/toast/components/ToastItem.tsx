import React, { useEffect, useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  X 
} from "lucide-react";
import { Toast as ToastType } from "../types";
import { useToast } from "../context";

interface ToastItemProps {
  toast: ToastType;
}

const getToastStyles = (type: ToastType["type"]) => {
  switch (type) {
    case "success":
      return {
        bg: "bg-green-50 border-green-200",
        icon: CheckCircle,
        iconColor: "text-green-500",
        titleColor: "text-green-800",
        descColor: "text-green-600",
        progressBar: "bg-green-500",
      };
    case "error":
      return {
        bg: "bg-red-50 border-red-200",
        icon: XCircle,
        iconColor: "text-red-500",
        titleColor: "text-red-800",
        descColor: "text-red-600",
        progressBar: "bg-red-500",
      };
    case "warning":
      return {
        bg: "bg-yellow-50 border-yellow-200",
        icon: AlertTriangle,
        iconColor: "text-yellow-500",
        titleColor: "text-yellow-800",
        descColor: "text-yellow-600",
        progressBar: "bg-yellow-500",
      };
    case "info":
    default:
      return {
        bg: "bg-blue-50 border-blue-200",
        icon: Info,
        iconColor: "text-blue-500",
        titleColor: "text-blue-800",
        descColor: "text-blue-600",
        progressBar: "bg-blue-500",
      };
  }
};

export const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  
  const styles = getToastStyles(toast.type);
  const IconComponent = styles.icon;

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (toast.duration! / 100));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [toast.duration]);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for exit animation before removing
    setTimeout(() => removeToast(toast.id), 200);
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isVisible 
          ? "translate-x-0 opacity-100" 
          : "translate-x-full opacity-0"
        }
      `}
    >
      <div
        className={`
          relative overflow-hidden rounded-lg border shadow-lg 
          w-full min-w-[280px] sm:min-w-[320px] max-w-full
          backdrop-blur-sm ${styles.bg}
        `}
      >
        {/* Progress Bar */}
        {toast.duration && toast.duration > 0 && (
          <div className="absolute top-0 left-0 h-1 w-full bg-gray-200">
            <div
              className={`h-full transition-all duration-100 ease-linear ${styles.progressBar}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="p-5">
          <div className="flex items-start">
            {/* Icon */}
            <div className="flex-shrink-0">
              <IconComponent className={`h-6 w-6 ${styles.iconColor}`} />
            </div>

            {/* Content */}
            <div className="ml-3 flex-1 min-w-0">
              <p className={`text-sm font-semibold leading-5 ${styles.titleColor}`}>
                {toast.title}
              </p>
              {toast.description && (
                <p className={`mt-2 text-sm leading-5 ${styles.descColor}`}>
                  {toast.description}
                </p>
              )}
              {toast.action && (
                <div className="mt-4">
                  <button
                    onClick={toast.action.onClick}
                    className={`
                      text-sm font-medium underline hover:no-underline 
                      transition-all duration-200 ${styles.titleColor}
                    `}
                  >
                    {toast.action.label}
                  </button>
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="ml-4 flex-shrink-0">
              <button
                className={`
                  inline-flex rounded-md p-1.5 transition-colors duration-200
                  hover:bg-white/50 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-offset-transparent
                  ${styles.iconColor}
                `}
                onClick={handleClose}
              >
                <span className="sr-only">Fermer</span>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
