import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { ContactFormSchema, type ContactFormData } from '@/schemas/contact';
import { submitContactForm } from '../api/contactApi';
import { validateStep } from '@/schemas/validation-utils';

export const useContactForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    subject: '',
    tel: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleRecaptchaError = () => {
    setSubmitStatus({
      type: 'error',
      message: 'Erreur de chargement de reCAPTCHA. Veuillez vérifier votre connexion internet.'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateStep(ContactFormSchema, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const recaptchaToken = recaptchaRef.current?.getValue();
      if (!recaptchaToken) {
        setSubmitStatus({
          type: 'error',
          message: "Veuillez cocher la case 'Je ne suis pas un robot' avant d'envoyer le message."
        });
        setIsSubmitting(false);
        return;
      }

      const response = await submitContactForm({
        email: formData.email,
        subject: formData.subject,
        tel: formData.tel || undefined,
        message: formData.message
      });
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message
        });
        
        setFormData({
          email: '',
          subject: '',
          tel: '',
          message: ''
        });
        
        recaptchaRef.current?.reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.message
        });
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Une erreur inattendue s\'est produite. Veuillez réessayer.'
      });
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    recaptchaRef,
    handleInputChange,
    handleRecaptchaError,
    handleSubmit,
    setSubmitStatus
  };
};