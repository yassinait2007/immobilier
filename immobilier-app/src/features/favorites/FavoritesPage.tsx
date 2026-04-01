"use client";

import React, { useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { PageLoading } from '@/components/ui/loading';
import { useFavoritesData } from './hooks/useFavoritesData';
import { 
  FavoritesHeader, 
  FavoritesGrid, 
  FavoritesPromotionSection, 
  EmptyFavorites 
} from './components';

const FavoritesPage: React.FC = () => {
  const { favorites, pagination, loading, handlePageChange } = useFavoritesData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = `Mes Favoris - ${siteConfig.website.name}`;
  }, []);

  if (loading) {
    return <PageLoading message="Chargement des favoris..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <FavoritesHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {favorites.length === 0 && !loading ? (
          <EmptyFavorites />
        ) : (
          <FavoritesGrid
            favorites={favorites}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {favorites.length > 0 && <FavoritesPromotionSection />}
    </div>
  );
};

export default FavoritesPage;