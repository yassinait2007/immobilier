import { useEffect } from "react";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { useAuth } from "@/context/authentication/auth-context";
import { useAuthModal } from "@/context/authentication/auth-modal-context";
import { Property } from "@/types/property";

export const useFavoriteActions = (property: Property | null) => {
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { isFavorite, toggleFavorite, isLoading, initializeFavorite } = useFavoritesContext();

  useEffect(() => {
    if (isAuthenticated && property && property.isFavorite !== undefined) {
      initializeFavorite(property.id, property.isFavorite);
    }
  }, [property?.id, property?.isFavorite, isAuthenticated, initializeFavorite]);

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }
    
    if (property) {
      await toggleFavorite(property.id);
    }
  };

  const isFav = property ? isFavorite(property.id) : false;
  const favLoading = property ? isLoading(property.id) : false;

  return {
    isFav,
    favLoading,
    handleFavoriteClick,
  };
};
