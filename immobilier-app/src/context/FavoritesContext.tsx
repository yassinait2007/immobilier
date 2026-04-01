import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from '@/context/authentication/auth-context';
import { addToFavorites, removeFromFavorites } from '@/features/favorites/api/favoritesApi';

interface FavoritesContextType {
  favorites: Set<number>;
  loading: boolean;
  loadingStates: Map<number, boolean>;
  addFavorite: (propertyId: number) => Promise<boolean>;
  removeFavorite: (propertyId: number) => Promise<boolean>;
  isFavorite: (propertyId: number) => boolean;
  isLoading: (propertyId: number) => boolean;
  toggleFavorite: (propertyId: number) => Promise<boolean>;
  initializeFavorite: (propertyId: number, isFavorite: boolean) => void;
  onFavoritesChange: (callback: (removedId?: number, addedId?: number) => void) => () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [loading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<Map<number, boolean>>(new Map());
  const [changeCallbacks, setChangeCallbacks] = useState<((removedId?: number, addedId?: number) => void)[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setFavorites(new Set());
      setLoadingStates(new Map());
    }
  }, [isAuthenticated]);

  const notifyChange = useCallback((removedId?: number, addedId?: number) => {
    changeCallbacks.forEach(callback => callback(removedId, addedId));
  }, [changeCallbacks]);

  const setPropertyLoading = useCallback((propertyId: number, isLoading: boolean) => {
    setLoadingStates(prev => {
      const newMap = new Map(prev);
      if (isLoading) {
        newMap.set(propertyId, true);
      } else {
        newMap.delete(propertyId);
      }
      return newMap;
    });
  }, []);

  const isLoading = useCallback((propertyId: number): boolean => {
    return loadingStates.get(propertyId) === true;
  }, [loadingStates]);

  const addFavorite = useCallback(async (propertyId: number): Promise<boolean> => {
    if (!isAuthenticated) return false;

    setFavorites(prev => new Set([...prev, propertyId]));
    setPropertyLoading(propertyId, true);

    try {
      const result = await addToFavorites(propertyId);
      
      if (!result.success) {
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(propertyId);
          return newSet;
        });
        return false;
      }
      
      notifyChange(undefined, propertyId);
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      setFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(propertyId);
        return newSet;
      });
      return false;
    } finally {
      setPropertyLoading(propertyId, false);
    }
  }, [isAuthenticated, notifyChange, setPropertyLoading]);

  const removeFavorite = useCallback(async (propertyId: number): Promise<boolean> => {
    if (!isAuthenticated) return false;

    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.delete(propertyId);
      return newSet;
    });
    setPropertyLoading(propertyId, true);

    try {
      const result = await removeFromFavorites(propertyId);
      
      if (!result.success) {
        setFavorites(prev => new Set([...prev, propertyId]));
        return false;
      }
      
      notifyChange(propertyId, undefined);
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      setFavorites(prev => new Set([...prev, propertyId]));
      return false;
    } finally {
      setPropertyLoading(propertyId, false);
    }
  }, [isAuthenticated, notifyChange, setPropertyLoading]);

  const isFavorite = useCallback((propertyId: number): boolean => {
    return isAuthenticated && favorites.has(propertyId);
  }, [isAuthenticated, favorites]);

  const toggleFavorite = useCallback(async (propertyId: number): Promise<boolean> => {
    if (isFavorite(propertyId)) {
      return await removeFavorite(propertyId);
    } else {
      return await addFavorite(propertyId);
    }
  }, [isFavorite, removeFavorite, addFavorite]);

  const initializeFavorite = useCallback((propertyId: number, isFavorite: boolean) => {
    if (!isAuthenticated) return;
    
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (isFavorite) {
        newSet.add(propertyId);
      } else {
        newSet.delete(propertyId);
      }
      return newSet;
    });
  }, [isAuthenticated]);

  const onFavoritesChange = useCallback((callback: (removedId?: number, addedId?: number) => void) => {
    setChangeCallbacks(prev => [...prev, callback]);
    
    return () => {
      setChangeCallbacks(prev => prev.filter(cb => cb !== callback));
    };
  }, []);

  return (
    <FavoritesContext.Provider value={{
      favorites,
      loading,
      loadingStates,
      addFavorite,
      removeFavorite,
      isFavorite,
      isLoading,
      toggleFavorite,
      initializeFavorite,
      onFavoritesChange,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};
