import React from "react";
import { createPortal } from "react-dom";
import { useToast } from "../context";
import { ToastItem } from "./ToastItem";

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return createPortal(
    <div
      className="fixed top-4 right-4 left-4 sm:left-auto z-[9999] pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      <div className="flex flex-col space-y-3 pointer-events-auto max-w-md ml-auto">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </div>,
    document.body
  );
};
