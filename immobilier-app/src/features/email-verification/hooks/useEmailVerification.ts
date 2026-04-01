import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/authentication/auth-context';
import { verifyEmail } from '../api/emailVerificationApi';

export type VerificationStatus = 'loading' | 'success' | 'error';

export const useEmailVerification = () => {
  const [searchParams] = useSearchParams();
  const { refreshUser, isAuthenticated } = useAuth();
  
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState('');
  
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) {
      return;
    }

    const verifyEmailToken = async () => {
      const id = searchParams.get('id');
      const hash = searchParams.get('hash');
      const expires = searchParams.get('expires');
      const signature = searchParams.get('signature');

      if (!id || !hash || !expires || !signature) {
        setStatus('error');
        setMessage('Lien de vérification invalide ou expiré.');
        return;
      }

      hasVerified.current = true;

      try {
        const response = await verifyEmail(id, hash, expires, signature);
        
        if (response.success) {
          setStatus('success');
          setMessage('Votre email a été vérifié avec succès !');
          
          if (isAuthenticated) {
            await refreshUser();
          }
        } else {
          setStatus('error');
          setMessage(response.message || 'Erreur lors de la vérification de l\'email.');
        }
      } catch (err: any) {
        console.error('Email verification error:', err);
        setStatus('error');
        
        let errorMessage = 'Une erreur est survenue lors de la vérification.';
        if (err?.response?.status === 400) {
          errorMessage = 'Le lien de vérification est invalide ou expiré.';
        } else if (err?.response?.status === 404) {
          errorMessage = 'Le lien de vérification est introuvable.';
        } else if (err?.response?.data?.message) {
          errorMessage = err.response.data.message;
        }
        
        setMessage(errorMessage);
      }
    };

    verifyEmailToken();
  }, [searchParams, isAuthenticated, refreshUser]);

  return {
    status,
    message,
    isAuthenticated
  };
};