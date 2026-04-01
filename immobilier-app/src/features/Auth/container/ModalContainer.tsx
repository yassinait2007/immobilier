import type { ReactNode } from "react";

interface ModalContainerProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalContainer = ({ children, onClose }: ModalContainerProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative overflow-hidden">
      <button onClick={onClose} className="absolute top-4 right-4">
        X
      </button>
      {children}
    </div>
  </div>
);
export default ModalContainer;
