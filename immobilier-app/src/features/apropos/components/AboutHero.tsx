import React from 'react';
import { siteConfig } from '@/config/siteConfig';

const AboutHero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 to-primary-light/10 py-16 lg:py-24">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent mb-6 leading-tight">
            À propos de nous
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Depuis {siteConfig.company.established}, nous accompagnons nos clients dans la recherche 
            de leur propriété idéale à Agadir et dans tout le Maroc.
          </p>
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">
                Plus de {siteConfig.company.stats.clients} clients satisfaits
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-full blur-xl"></div>
    </div>
  );
};

export default AboutHero;
