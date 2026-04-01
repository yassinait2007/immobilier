import React from "react";
import { Star, Users, Shield } from "lucide-react";
import { useAuth } from "@/context/authentication/auth-context";
import RecommendationContent from "./RecommendationContent";

const RecommendationSection: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Star,
      title: "Recommandations Personnalisées",
      description: "Algorithme intelligent basé sur vos préférences"
    },
    {
      icon: Users,
      title: "Communauté Active",
      description: "Rejoignez des milliers d'utilisateurs satisfaits"
    },
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Transactions protégées et vérifications complètes"
    }
  ];

  return (
    <section className="py-20">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/assets/recomendation.png"
                alt="Recommandations personnalisées"
                className="w-full max-w-md mx-auto h-auto object-cover rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-light to-primary rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-primary to-primary-light rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>

        <RecommendationContent />
      </div>

      {!isAuthenticated && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-light to-primary rounded-xl mb-3 mx-auto lg:mx-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {isAuthenticated && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          <div className="text-center lg:text-left p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-light to-primary rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-2">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Recommandations</h3>
            <p className="text-sm text-gray-600">Basées sur vos préférences</p>
          </div>
          <div className="text-center lg:text-left p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-light to-primary rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-2">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Communauté</h3>
            <p className="text-sm text-gray-600">Accès aux avis et conseils</p>
          </div>
          <div className="text-center lg:text-left p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-light to-primary rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-2">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Sécurité</h3>
            <p className="text-sm text-gray-600">Transactions protégées</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecommendationSection;