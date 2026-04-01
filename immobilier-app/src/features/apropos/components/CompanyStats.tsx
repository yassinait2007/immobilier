import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Users, Home, Star, Clock } from 'lucide-react';

const CompanyStats: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: siteConfig.company.stats.clients,
      label: 'Clients satisfaits',
      description: 'Nous accompagnons nos clients depuis des années',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Home,
      value: siteConfig.company.stats.properties,
      label: 'Propriétés disponibles',
      description: 'Un large choix de biens de qualité',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Star,
      value: siteConfig.company.stats.rating,
      label: 'Note moyenne',
      description: 'Témoignage de notre excellence',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Clock,
      value: siteConfig.company.stats.responseTime,
      label: 'Temps de réponse',
      description: 'Réactivité garantie pour vos demandes',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos chiffres parlent d'eux-mêmes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des résultats concrets qui témoignent de notre engagement et de notre expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {stat.label}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {stat.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyStats;
