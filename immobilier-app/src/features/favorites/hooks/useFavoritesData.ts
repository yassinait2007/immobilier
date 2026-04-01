import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authentication/auth-context';
import { useFavoritesContext } from '@/context/FavoritesContext';
import { getFavorites } from '../api/favoritesApi';
import type { Property } from '@/types/property';
import type { Pagination } from '@/types/apiResponsePagination';

export const useFavoritesData = () => {
  const { isAuthenticated } = useAuth();
  const { onFavoritesChange } = useFavoritesContext();

  const [favorites, setFavorites] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  const loadFavorites = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFavorites(page, itemsPerPage);
      setFavorites(response.data.items);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Error loading favorites:', err);
      setError('Erreur lors du chargement des favoris');
      setFavorites([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites(currentPage);
    } else {
      setFavorites([]);
      setPagination(null);
      setError(null);
    }
  }, [isAuthenticated, currentPage]);

  useEffect(() => {
    const unsubscribe = onFavoritesChange((removedId, addedId) => {
      if (removedId) {
        setFavorites(prev => prev.filter(property => property.id !== removedId));
        
        setPagination(prev => prev ? {
          ...prev,
          total: prev.total - 1
        } : null);
      }
      
      if (addedId) {
        loadFavorites(currentPage);
      }
    });

    return unsubscribe;
  }, [onFavoritesChange, currentPage]);

  return {
    favorites,
    pagination,
    loading,
    error,
    currentPage,
    handlePageChange,
    refreshFavorites: () => loadFavorites(currentPage)
  };
};