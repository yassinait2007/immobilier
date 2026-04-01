import { useState, useEffect } from 'react';
import { CurrentUser } from '@/types/currentUser';
import { ProfileService } from '../services';

interface UseProfileReturn {
  user: CurrentUser | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

export const useProfile = (): UseProfileReturn => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await ProfileService.getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error('Error loading user data:', err);
      setError("Impossible de charger les informations du profil");
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    await loadUserData();
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return {
    user,
    loading,
    error,
    refreshUser,
  };
};
