import { LogIn, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { VerificationStatus } from '../hooks/useEmailVerification';

interface EmailVerificationActionsProps {
  status: VerificationStatus;
  isAuthenticated: boolean;
  onGoToProfile: () => void;
  onGoHome: () => void;
  onLogin: () => void;
}

const EmailVerificationActions = ({ 
  status, 
  isAuthenticated, 
  onGoToProfile, 
  onGoHome, 
  onLogin 
}: EmailVerificationActionsProps) => {
  if (status === 'loading') {
    return null;
  }

  const getPrimaryButtonConfig = () => {
    if (status === 'success') {
      return {
        onClick: isAuthenticated ? onGoToProfile : onLogin,
        className: isAuthenticated 
          ? "w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          : "w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-semibold py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105",
        children: isAuthenticated ? "Aller à mon profil" : (
          <>
            <LogIn className="w-5 h-5 mr-2" />
            Se connecter
          </>
        )
      };
    } else {
      return {
        onClick: isAuthenticated ? onGoToProfile : onLogin,
        className: "w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-semibold py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105",
        children: isAuthenticated ? "Aller à mon profil" : (
          <>
            <LogIn className="w-5 h-5 mr-2" />
            Se connecter
          </>
        )
      };
    }
  };

  const primaryButton = getPrimaryButtonConfig();

  return (
    <div className="space-y-4">
      <Button
        onClick={primaryButton.onClick}
        className={primaryButton.className}
      >
        {primaryButton.children}
      </Button>
      
      <Button
        onClick={onGoHome}
        variant="outline"
        className="w-full border-2 border-gray-200 hover:border-gray-300 py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
      >
        <Home className="w-5 h-5 mr-2" />
        Retour à l'accueil
      </Button>
    </div>
  );
};

export default EmailVerificationActions;