import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { VerificationStatus } from '../hooks/useEmailVerification';

interface EmailVerificationContentProps {
  status: VerificationStatus;
  message: string;
  isAuthenticated: boolean;
}

const EmailVerificationContent = ({ status, message, isAuthenticated }: EmailVerificationContentProps) => {
  if (status === 'loading') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-lg">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Vérification en cours...
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Traitement de votre demande de vérification.
        </p>
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          🎉 Email vérifié !
        </h2>
        <p className="text-gray-700 mb-6 text-lg">
          {message}
        </p>
        
        <Alert className="border-green-200 bg-green-50 mb-8 text-left">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800 text-base">
            {isAuthenticated ? (
              "Vous allez être redirigé vers votre profil dans quelques secondes..."
            ) : (
              "Vous allez être redirigé vers l'accueil dans quelques secondes..."
            )}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center shadow-lg">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-red-900 mb-4">
          Erreur de vérification
        </h2>
        <p className="text-gray-700 mb-6 text-lg">
          {message}
        </p>
        
        <Alert className="border-red-200 bg-red-50 mb-8 text-left">
          <XCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800 text-base">
            {isAuthenticated ? (
              "Le lien de vérification est peut-être expiré. Vous pouvez demander un nouveau lien depuis votre profil."
            ) : (
              "Le lien de vérification est peut-être expiré. Connectez-vous pour demander un nouveau lien."
            )}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return null;
};

export default EmailVerificationContent;