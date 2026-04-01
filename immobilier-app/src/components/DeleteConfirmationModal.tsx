import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  propertyTitle: string;
  loading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  propertyTitle,
  loading = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Confirmer la suppression
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Êtes-vous sûr de vouloir supprimer cette propriété ?
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="font-medium text-gray-900">"{propertyTitle}"</p>
          </div>
          <p className="text-sm text-red-600">
            Cette action est irréversible et supprimera définitivement cette propriété.
          </p>
        </div>

        <div className="flex space-x-3 p-6 bg-gray-50 rounded-b-lg">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;