import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface PropertyErrorProps {
  error?: string | null;
}

export const PropertyError: React.FC<PropertyErrorProps> = ({ error }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || "Propriété introuvable"}
          </h2>
          <p className="text-gray-600 mb-6">
            Désolé, nous n'avons pas pu trouver la propriété que vous recherchez.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <ChevronLeft size={18} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};
