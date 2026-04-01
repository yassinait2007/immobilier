import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authentication/auth-context';
import { becomeHostRequest } from '../api/becomeHostApi';
import { BecomeHostFormData } from '@/types/becomeHost';
import { becomeHostSchema } from '@/schemas/becomeHost';
import { formatZodErrors } from '@/schemas/validation-utils';

export const useBecomeHostActions = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (formData: any, phoneNumber: string | undefined, files: any) => {
    const validationData = {
      tel: phoneNumber || '',
      city: formData.city,
      address: formData.address,
      rib: formData.rib,
      identityFront: files.identityFront,
      identityBack: files.identityBack,
      profile: files.profile
    };
    
    const result = becomeHostSchema.safeParse(validationData);
    
    if (!result.success) {
      const formattedErrors = formatZodErrors(result.error);
      return { isValid: false, errors: formattedErrors, message: result.error.errors[0]?.message || 'Veuillez corriger les erreurs du formulaire.' };
    }
    
    return { isValid: true, errors: {}, message: null };
  };

  const handleSubmit = async (formData: any, phoneNumber: string | undefined, files: any, setErrors: (errors: Record<string, string>) => void) => {
    setError(null);
    
    const validation = validateForm(formData, phoneNumber, files);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setError(validation.message);
      return;
    }
    
    setLoading(true);
    
    try {
      const submitData: BecomeHostFormData = {
        tel: phoneNumber || '',
        city: formData.city,
        address: formData.address,
        rib: formData.rib || undefined,
        identityFront: files.identityFront!,
        identityBack: files.identityBack!,
        profile: files.profile!,
      };
      
      const response = await becomeHostRequest(submitData);
      
      if (response.data.success && response.data.data) {
        updateUser(response.data.data);
      }
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/host-space');
      }, 2000);
      
    } catch (err: any) {
      const message = err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    success,
    error,
    handleSubmit,
  };
};
