import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { InlineLoading } from '@/components/ui/loading';
import { useNavigate } from 'react-router-dom';

export const BecomeHostSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Félicitations !</h2>
        <p className="text-gray-600 mb-4">
          Votre demande pour devenir hôte a été soumise avec succès. 
          Un administrateur va examiner vos documents et valider votre compte sous peu.
        </p>
        <InlineLoading message="Redirection vers l'accueil..." />
      </div>
    </div>
  );
};
