"use client";

import React from 'react';
import { Send, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import RecaptchaWrapper from '@/components/RecaptchaWrapper';
import { useContactForm } from '../hooks/useContactForm';
import ContactFormFields from './ContactFormFields';

const ContactForm: React.FC = () => {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    recaptchaRef,
    handleInputChange,
    handleRecaptchaError,
    handleSubmit,
    setSubmitStatus
  } = useContactForm();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 lg:p-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-light to-primary rounded-full mb-4">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Envoyez-nous un message
        </h2>
        <p className="text-gray-600">
          Vous avez une question ou besoin d'aide ? Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
        </p>
      </div>

      {submitStatus.type && (
        <Alert className={`mb-6 ${
          submitStatus.type === 'success' 
            ? 'border-green-200 bg-green-50' 
            : 'border-red-200 bg-red-50'
        }`}>
          {submitStatus.type === 'success' ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={
            submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
          }>
            {submitStatus.message}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <ContactFormFields
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
        />

        <RecaptchaWrapper 
          recaptchaRef={recaptchaRef}
          onError={handleRecaptchaError}
          onExpired={() => setSubmitStatus({
            type: 'error',
            message: 'reCAPTCHA expiré. Veuillez cocher la case à nouveau.'
          })}
          onChange={(token) => {
            if (token && submitStatus.message?.includes('reCAPTCHA')) {
              setSubmitStatus({ type: null, message: '' });
            }
          }}
          className="mt-4"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-light text-white py-6 px-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Envoi en cours...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Envoyer le message
            </div>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          En soumettant ce formulaire, vous acceptez que nous traitions vos données personnelles 
          conformément à notre politique de confidentialité.
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
