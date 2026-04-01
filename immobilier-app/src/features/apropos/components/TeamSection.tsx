import React from 'react';
import { Users, UserCheck, Headphones, Settings } from 'lucide-react';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Équipe Commercial',
      role: 'Conseillers immobiliers',
      description: 'Nos experts vous accompagnent dans la recherche de votre propriété idéale.',
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      stats: '15+ conseillers'
    },
    {
      name: 'Service Client',
      role: 'Support et assistance',
      description: 'Une équipe dédiée pour répondre à toutes vos questions et vous assister.',
      icon: Headphones,
      gradient: 'from-green-500 to-green-600',
      stats: 'Disponible 7j/7'
    },
    {
      name: 'Équipe Technique',
      role: 'Innovation et développement',
      description: 'Nous développons continuellement nos outils pour améliorer votre expérience.',
      icon: Settings,
      gradient: 'from-purple-500 to-purple-600',
      stats: 'Technologies modernes'
    },
    {
      name: 'Management',
      role: 'Direction et stratégie',
      description: 'Une direction expérimentée qui guide notre vision et nos objectifs.',
      icon: UserCheck,
      gradient: 'from-orange-500 to-red-500',
      stats: '20+ ans d\'expérience'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Notre équipe
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Une équipe passionnée et expérimentée, unie par un objectif commun : 
            vous offrir le meilleur service immobilier au Maroc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${member.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <member.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              
              <p className="text-primary font-semibold mb-4">
                {member.role}
              </p>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {member.description}
              </p>

              {/* Stats */}
              <div className="inline-flex items-center bg-gray-50 rounded-full px-4 py-2">
                <span className="text-xs font-medium text-gray-700">
                  {member.stats}
                </span>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Team Philosophy */}
        <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-2xl p-8 lg:p-12 border border-primary/10">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Notre philosophie d'équipe
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
              Nous croyons qu'une équipe soudée et motivée est la clé du succès. 
              Chaque membre apporte son expertise unique pour créer une expérience client exceptionnelle. 
              Notre force réside dans notre diversité, notre complémentarité et notre passion commune pour l'immobilier.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-600">Engagement qualité</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">Disponibilité</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">∞</div>
                <div className="text-gray-600">Passion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
