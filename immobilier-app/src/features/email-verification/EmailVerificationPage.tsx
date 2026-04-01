import React, { useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { useEmailVerification, useVerificationNavigation } from './hooks';
import { 
  EmailVerificationHeader,
  EmailVerificationContent,
  EmailVerificationActions,
  EmailVerificationPromotion
} from './components';

export const EmailVerificationPage: React.FC = () => {
  const { status, message, isAuthenticated } = useEmailVerification();
  const { handleGoToProfile, handleGoHome, handleLogin, handleContact } = useVerificationNavigation(status, isAuthenticated);

  useEffect(() => {
    document.title = `Vérification Email - ${siteConfig.website.name}`;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <EmailVerificationHeader status={status} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <EmailVerificationContent 
              status={status} 
              message={message} 
              isAuthenticated={isAuthenticated} 
            />
            
            {status !== 'loading' && (
              <div className="mt-8">
                <EmailVerificationActions
                  status={status}
                  isAuthenticated={isAuthenticated}
                  onGoToProfile={handleGoToProfile}
                  onGoHome={handleGoHome}
                  onLogin={handleLogin}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <EmailVerificationPromotion
        status={status}
        onGoHome={handleGoHome}
        onContact={handleContact}
      />
    </div>
  );
};