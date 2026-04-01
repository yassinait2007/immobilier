import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { VerificationStatus } from './useEmailVerification';

export const useVerificationNavigation = (status: VerificationStatus, isAuthenticated: boolean) => {
  const navigate = useNavigate();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (status === 'success') {
      timeoutRef.current = setTimeout(() => {
        if (isAuthenticated) {
          navigate('/my-profile', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }, 4000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [status, isAuthenticated, navigate]);

  const clearTimeoutAndNavigate = (path: string, replace = true) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    navigate(path, { replace });
  };

  const handleGoToProfile = () => {
    if (isAuthenticated) {
      clearTimeoutAndNavigate('/my-profile');
    } else {
      clearTimeoutAndNavigate('/');
    }
  };

  const handleGoHome = () => {
    clearTimeoutAndNavigate('/');
  };

  const handleLogin = () => {
    clearTimeoutAndNavigate('/');
  };

  const handleContact = () => {
    clearTimeoutAndNavigate('/contact');
  };

  return {
    handleGoToProfile,
    handleGoHome,
    handleLogin,
    handleContact
  };
};