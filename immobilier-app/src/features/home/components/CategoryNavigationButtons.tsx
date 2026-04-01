"use client";

import type React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Calendar, ShoppingCart, ArrowRight, Sparkles } from "lucide-react";

const CategoryNavigationButtons: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      type: "rent-long" as const,
      label: "Location à Long Terme",
      description: "Trouvez votre nouveau chez-vous",
      icon: Home,
      gradient: "from-primary to-primary-light",
      bgGradient: "from-primary/10 to-primary-light/10",
      iconBg: "from-primary to-primary-light",
      glowColor: "from-primary/50 to-primary-light/50",
    },
    {
      type: "rent-short" as const,
      label: "Location à Court Terme",
      description: "Séjours parfaits pour vos vacances",
      icon: Calendar,
      gradient: "from-primary-light to-primary",
      bgGradient: "from-primary-light/10 to-primary/10",
      iconBg: "from-primary-light to-primary",
      glowColor: "from-primary-light/50 to-primary/50",
    },
    {
      type: "selle" as const,
      label: "Propriétés à Vendre",
      description: "Investissements et opportunités",
      icon: ShoppingCart,
      gradient: "from-primary to-primary-light",
      bgGradient: "from-primary/10 to-primary-light/10",
      iconBg: "from-primary to-primary-light",
      glowColor: "from-primary/50 to-primary-light/50",
    },
  ];

  const handleCategoryClick = (type: string) => {
    navigate(`/categories?type=${type}`);
  };

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary-light" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Explorez par Catégorie
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-primary bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text hover:text-transparent mb-4 leading-tight transition-all duration-300">
          Trouvez Votre Propriété Idéale
        </h2>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez votre propriété parfaite parmi nos collections sélectionnées dans tout le Maroc
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.type}
              className="group relative h-full"
              style={{ 
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${category.glowColor} rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-all duration-500`}></div>
              
              <div
                onClick={() => handleCategoryClick(category.type)}
                className="relative overflow-hidden rounded-2xl bg-white cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-100 h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="relative p-6 text-center h-full flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="relative mb-4">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.iconBg} rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.iconBg} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}></div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 transition-all duration-300">
                      <span className="text-gray-800 group-hover:hidden">
                        {category.label}
                      </span>
                      <span className={`hidden group-hover:inline-block bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                        {category.label}
                      </span>
                    </h3>
                    
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out`}>
                      <span>Explorer Maintenant</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center`}></div>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <IconComponent className="w-full h-full" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-gray-500">
          Plus de <span className="font-semibold text-primary">10,000</span> propriétés disponibles
        </p>
      </div>
    </div>
  );
};

export default CategoryNavigationButtons;
