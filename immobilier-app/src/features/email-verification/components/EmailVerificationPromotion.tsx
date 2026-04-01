import { siteConfig } from '@/config/siteConfig';
import type { VerificationStatus } from '../hooks/useEmailVerification';

interface EmailVerificationPromotionProps {
  status: VerificationStatus;
  onGoHome: () => void;
  onContact: () => void;
}

const EmailVerificationPromotion = ({ status, onGoHome, onContact }: EmailVerificationPromotionProps) => {
  const isSuccess = status === 'success';

  return (
    <div className="bg-gradient-to-r from-primary via-primary-light to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {isSuccess ? "Bienvenue !" : "Besoin d'aide ?"}
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {isSuccess 
              ? `Votre compte est maintenant vérifié. Explorez nos propriétés exceptionnelles chez ${siteConfig.website.name}.`
              : `Notre équipe est là pour vous aider avec vos questions de vérification.`
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onGoHome}
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              {isSuccess ? "Explorer les propriétés" : "Retour à l'accueil"}
            </button>
            <button 
              onClick={onContact}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-xl hover:scale-105"
            >
              Nous Contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPromotion;