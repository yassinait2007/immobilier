export const RECAPTCHA_CONFIG = {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '',
  version: 'v2' as const,
  size: 'normal' as const, // 'invisible' or 'normal'
  theme: 'light' as const,
  
  validation: {
    required: true,
    errorMessages: {
      missing: 'reCAPTCHA est requis pour soumettre ce formulaire',
      invalid: 'La vérification reCAPTCHA a échoué. Veuillez réessayer.',
      network: 'Erreur de réseau lors de la vérification reCAPTCHA',
      timeout: 'La vérification reCAPTCHA a expiré. Veuillez réessayer.'
    }
  }
} as const;

export const isRecaptchaConfigured = (): boolean => {
  return !!(RECAPTCHA_CONFIG.siteKey && 
           RECAPTCHA_CONFIG.siteKey !== 'your_recaptcha_site_key_here');
};

export const shouldShowDevelopmentWarning = (): boolean => {
  return !isRecaptchaConfigured();
};
