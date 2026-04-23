"use client";

import type React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Calendar, ShoppingCart } from "lucide-react";

const CategoryNavigationButtons: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      type: "rent" as const,
      label: "Location à Long Terme",
      description: "Trouvez votre nouveau chez-vous",
      icon: Home,
      gradient: "from-primary to-primary-light",
      bgGradient: "from-primary/10 to-primary-light/10",
      iconBg: "from-primary to-primary-light",
      glowColor: "from-primary/50 to-primary-light/50",
    },
    {
      type: "vacation_rental" as const,
      label: "Location à Court Terme",
      description: "Séjours parfaits pour vos vacances",
      icon: Calendar,
      gradient: "from-primary-light to-primary",
      bgGradient: "from-primary-light/10 to-primary/10",
      iconBg: "from-primary-light to-primary",
      glowColor: "from-primary-light/50 to-primary/50",
    },
    {
      type: "sale" as const,
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
    <div className="py-20 max-w-7xl mx-auto px-4 lg:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.type}
              className="group relative h-full flex flex-col"
            >
              <div
                onClick={() => handleCategoryClick(category.type)}
                className="relative overflow-hidden rounded-[2.5rem] bg-white cursor-pointer shadow-[0_15px_40px_-20px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_60px_-20px_rgba(78,95,168,0.3)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform hover:-translate-y-3 border border-gray-50 flex flex-col items-center p-12 h-full min-h-[360px]"
              >
                {/* Decorative Faint Icon in Top Right */}
                <div className="absolute top-8 right-8 text-gray-200/60 opacity-50 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12">
                  <IconComponent className="w-8 h-8 stroke-[1.5]" />
                </div>

                {/* Main Centered Icon Container */}
                <div className="mb-10 relative">
                  <div className={`relative z-10 flex items-center justify-center w-24 h-24 bg-gradient-to-br ${category.iconBg} rounded-[2rem] shadow-[0_10px_30px_-5px_rgba(78,95,168,0.5)] group-hover:shadow-[0_20px_40px_-5px_rgba(78,95,168,0.6)] transform group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]`}>
                    <IconComponent className="w-10 h-10 text-white stroke-[2]" />
                  </div>
                  {/* Subtle Glow below icon */}
                  <div className={`absolute inset-2 bg-gradient-to-br ${category.iconBg} rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700`}></div>
                </div>

                {/* Text Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4 transition-colors duration-300">
                    {category.label}
                  </h3>
                  
                  <p className="text-gray-500 font-medium text-base px-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Action Indicator - Invisible by default, pops up on hover */}
                <div className="mt-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2 text-primary font-bold text-sm">
                  <span>DÉCOUVRIR</span>
                  <div className="w-6 h-[2px] bg-primary rounded-full group-hover:w-10 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNavigationButtons;
