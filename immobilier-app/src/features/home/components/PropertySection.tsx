"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../../../components/PropertyCard";
import { ContentLoading } from "@/components/ui/loading";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Property } from "../../../types/property";

interface PropertySectionProps {
  title: string;
  subtitle?: string;
  properties: Property[];
  loading?: boolean;
  transactionType: "rent-long" | "rent-short" | "selle";
  gradient?: string;
}

const PropertySection: React.FC<PropertySectionProps> = ({
  title,
  subtitle,
  properties,
  loading = false,
  transactionType,
  gradient = "from-primary-light to-primary"
}) => {
  const [visibleCount] = useState(8);
  const navigate = useNavigate();

  const showMore = () => {
    navigate(`/categories?type=${transactionType}`);
  };

  return (
    <section>
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary-light" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Découvrez
          </span>
        </div>
        
        <h2 className={`text-4xl md:text-5xl font-bold text-primary bg-gradient-to-r ${gradient} bg-clip-text hover:text-transparent mb-4 leading-tight transition-all duration-300`}>
          {title}
        </h2>
        
        {subtitle && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {loading ? (
        <div className="py-16">
          <ContentLoading 
            message="Chargement des propriétés..." 
            description="Recherche des meilleures offres"
          />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-lg border border-gray-100">
            <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucune propriété disponible
            </h3>
            <p className="text-gray-500">
              Revenez bientôt pour découvrir de nouvelles offres
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {properties.slice(0, visibleCount).map((property, index) => (
              <div
                key={property.id}
                className="animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {properties.length > visibleCount && (
            <div className="text-center">
              <button
                onClick={showMore}
                className={`
                  group relative inline-flex items-center gap-3 px-8 py-4
                  bg-gradient-to-r ${gradient} text-white font-semibold rounded-xl
                  transition-all duration-300 hover:shadow-2xl hover:scale-105
                  focus:outline-none focus:ring-4 focus:ring-primary-light/30
                `}
              >
                <span>Voir Plus de Propriétés</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                
                <div className={`
                  absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} 
                  opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-300 -z-10
                `}></div>
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                Plus de {properties.length} propriétés disponibles
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default PropertySection;
