import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastOptions } from "./types";

interface ToastContextType {
  toasts: Toast[];
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  success: (title: string, description?: string, duration?: number) => string;
  error: (title: string, description?: string, duration?: number) => string;
  warning: (title: string, description?: string, duration?: number) => string;
  info: (title: string, description?: string, duration?: number) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((options: ToastOptions): string => {
    const id = generateId();
    const duration = options.duration ?? 5000; // Default 5 seconds

    const toast: Toast = {
      id,
      type: options.type || "info",
      title: options.title,
      description: options.description,
      duration,
      action: options.action,
    };

    setToasts((prev) => [...prev, toast]);

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  // Convenience methods
  const success = useCallback((title: string, description?: string, duration?: number): string => {
    return addToast({ type: "success", title, description, duration });
  }, [addToast]);

  const error = useCallback((title: string, description?: string, duration?: number): string => {
    return addToast({ type: "error", title, description, duration });
  }, [addToast]);

  const warning = useCallback((title: string, description?: string, duration?: number): string => {
    return addToast({ type: "warning", title, description, duration });
  }, [addToast]);

  const info = useCallback((title: string, description?: string, duration?: number): string => {
    return addToast({ type: "info", title, description, duration });
  }, [addToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
