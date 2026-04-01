import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export type AuthModalType =
  | "login"
  | "register"
  | "forgotPassword"
  | "otp"
  | "resetPassword"
  | null;

interface AuthModalContextType {
  isOpen: boolean;
  modalType: AuthModalType;
  openAuthModal: (type: AuthModalType, onSuccess?: () => void) => void;
  switchModalType: (type: AuthModalType) => void; // New function to switch without losing callback
  closeAuthModal: (clearCallback?: boolean) => void;
  executeCallback: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<AuthModalType>(null);
  const callbackRef = useRef<(() => void) | null>(null);

  const openAuthModal = useCallback((type: AuthModalType, onSuccess?: () => void) => {
    setModalType(type);
    setIsOpen(true);
    // Store callback in ref to avoid React state function issues
    callbackRef.current = onSuccess || null;
  }, []);

  const closeAuthModal = useCallback((clearCallback = true) => {
    setIsOpen(false);
    setModalType(null);
    // Clear callback only if requested (default true for manual close)
    if (clearCallback) {
      callbackRef.current = null;
    }
  }, []);

  const switchModalType = useCallback((type: AuthModalType) => {
    setModalType(type);
    // Don't change isOpen or callback - just switch the form type
  }, []);

  const executeCallback = useCallback(() => {
    if (callbackRef.current) {
      const callback = callbackRef.current;
      callbackRef.current = null; // Clear before execution to prevent double execution
      callback();
    }
  }, []);

  return (
    <AuthModalContext.Provider
      value={{ isOpen, modalType, openAuthModal, switchModalType, closeAuthModal, executeCallback }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};
