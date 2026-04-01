import React from 'react';
import { CheckCircle } from 'lucide-react';
import { InlineLoading } from '@/components/ui/loading';

export const BecomeHostSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Félicitations !</h2>
        <p className="text-gray-600 mb-4">
          Votre demande pour devenir hôte a été soumise avec succès. 
          Vous allez être redirigé vers votre tableau de bord hôte.
        </p>
        <InlineLoading message="Redirection en cours..." />
      </div>
    </div>
  );
};
