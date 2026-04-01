import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, User } from "lucide-react";
import { useAuthModal } from "@/context/authentication/auth-modal-context";
import { useAuth } from "@/context/authentication/auth-context";

const RecommendationContent = () => {
  const navigate = useNavigate();
  const { openAuthModal } = useAuthModal();
  const { isAuthenticated, user } = useAuth();

  const handleSignUp = () => {
    openAuthModal("register", () => {
      navigate('/client-profile');
    });
  };

  const handleGoToProfile = () => {
    if (user?.type === 'host') {
      navigate('/host-space');
    } else {
      navigate('/client-profile');
    }
  };

  const handleGoToFavorites = () => {
    navigate('/favorites');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const getContent = () => {
    if (isAuthenticated && user) {
      return {
        title: `Bonjour ${user.firstName || user.email} !`,
        subtitle: `Découvrez vos recommandations personnalisées basées sur vos préférences et votre historique de navigation.`,
        primaryButton: {
          text: "Voir Mon Profil",
          action: handleGoToProfile,
          icon: User
        },
        secondaryButton: {
          text: "Mes Favoris",
          action: handleGoToFavorites,
          icon: Star
        }
      };
    } else {
      return {
        title: "Obtenez des Recommandations Personnalisées",
        subtitle: "Connectez-vous pour une expérience sur mesure. Notre algorithme intelligent vous propose les meilleures propriétés selon vos préférences et votre budget.",
        primaryButton: {
          text: "Inscrivez-vous Maintenant",
          action: handleSignUp,
          icon: ArrowRight
        },
        secondaryButton: {
          text: "En Savoir Plus",
          action: handleLearnMore,
          icon: null
        }
      };
    }
  };

  const content = getContent();

  return (
    <div className="lg:w-1/2 text-center lg:text-left">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-primary-light" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            {isAuthenticated ? "Espace Personnel" : "Expérience Premium"}
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-primary bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text hover:text-transparent mb-6 leading-tight transition-all duration-300">
          {content.title}
        </h2>
        
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          {content.subtitle}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <button
          onClick={content.primaryButton.action}
          className="group bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-light text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>{content.primaryButton.text}</span>
          {content.primaryButton.icon && (
            <content.primaryButton.icon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          )}
        </button>
        
        <button 
          onClick={content.secondaryButton.action}
          className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>{content.secondaryButton.text}</span>
          {content.secondaryButton.icon && (
            <content.secondaryButton.icon className="w-5 h-5" />
          )}
        </button>
      </div>

      {!isAuthenticated && (
        <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="ml-1">4.9/5</span>
          </div>
          <div>500+ Avis</div>
          <div>10,000+ Utilisateurs</div>
        </div>
      )}
    </div>
  );
};

export default RecommendationContent;