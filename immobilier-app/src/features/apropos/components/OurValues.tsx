import React from 'react';
import { Shield, Users, Zap, Heart, Target, Lightbulb } from 'lucide-react';

const OurValues: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Confiance',
      description: 'Nous construisons des relations durables basées sur la transparence et l\'honnêteté.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Service client',
      description: 'Votre satisfaction est notre priorité absolue. Nous vous accompagnons à chaque étape.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'Réactivité',
      description: 'Réponse rapide à vos demandes avec un temps de traitement inférieur à 2 heures.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'L\'amour de l\'immobilier et l\'envie de vous aider à réaliser vos rêves nous animent.',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans tous nos services pour dépasser vos attentes.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Nous utilisons les dernières technologies pour vous offrir une expérience moderne.',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nos valeurs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ces principes guident chacune de nos actions et nous permettent de vous offrir 
            un service d'exception dans tous vos projets immobiliers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {value.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary-light/0 group-hover:from-primary/5 group-hover:to-primary-light/5 transition-all duration-300 pointer-events-none"></div>
              
              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-full px-8 py-4 border border-primary/20">
            <span className="text-gray-700 font-medium">
              Ces valeurs font de nous votre partenaire immobilier de confiance
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurValues;
