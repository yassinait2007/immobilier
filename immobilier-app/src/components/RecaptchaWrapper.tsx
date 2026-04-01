import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Shield, AlertTriangle } from 'lucide-react';
import { RECAPTCHA_CONFIG, shouldShowDevelopmentWarning } from '@/config/recaptcha';

interface RecaptchaWrapperProps {
  recaptchaRef: React.RefObject<ReCAPTCHA>;
  onError?: () => void;
  onExpired?: () => void;
  onChange?: (token: string | null) => void;
  className?: string;
}

const RecaptchaWrapper: React.FC<RecaptchaWrapperProps> = ({
  recaptchaRef,
  onError,
  onExpired,
  onChange,
  className = ''
}) => {
  if (shouldShowDevelopmentWarning()) {
    return (
      <div className={`flex items-center justify-center gap-2 text-amber-600 text-sm p-3 bg-amber-50 border border-amber-200 rounded-lg ${className}`}>
        <AlertTriangle className="w-4 h-4" />
        <span>
          reCAPTCHA non configuré - Ajoutez votre clé dans le fichier .env
        </span>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_CONFIG.siteKey}
          size={RECAPTCHA_CONFIG.size}
          theme={RECAPTCHA_CONFIG.theme}
          onError={onError}
          onExpired={onExpired}
          onChange={onChange}
        />
      </div>
      
      <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
        <Shield className="w-3 h-3" />
        <span>Cliquez sur la case "Je ne suis pas un robot" ci-dessus</span>
      </div>
    </div>
  );
};

export default RecaptchaWrapper;
