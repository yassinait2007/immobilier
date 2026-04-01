"use client";

import React from 'react';
import { Heart, Home, Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const EmptyFavorites: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-primary/60" />
          </div>
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-full blur-sm"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-full blur-sm"></div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Aucun favori pour le moment
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Commencez à sauvegarder vos propriétés préférées en cliquant sur l'icône cœur. 
          Elles apparaîtront ici pour un accès rapide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/categories')}
            className="bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Explorer les propriétés
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-primary/5 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Button>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Conseil pratique
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Sauvegardez vos propriétés favorites pour les comparer facilement et 
            les retrouver rapidement lors de vos prochaines visites.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyFavorites;
