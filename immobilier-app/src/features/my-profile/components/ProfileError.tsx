import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileErrorProps {
  error?: string | null;
  onRetry?: () => void;
}

export const ProfileError: React.FC<ProfileErrorProps> = ({ 
  error, 
  onRetry 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
        <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Erreur de chargement
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {error || "Impossible de charger les informations de votre profil."}
        </p>
        <div className="flex gap-3">
          {onRetry && (
            <Button 
              onClick={onRetry}
              className="flex-1"
            >
              Réessayer
            </Button>
          )}
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full">
              <ChevronLeft size={16} className="mr-2" />
              Retour
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
