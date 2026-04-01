import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Share2, Heart } from 'lucide-react';

interface PropertyHeaderProps {
  onShare: () => void;
  onFavoriteClick: () => void;
  isFav: boolean;
  favLoading: boolean;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  onShare,
  onFavoriteClick,
  isFav,
  favLoading,
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-medium">Retour</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onShare}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Partager</span>
            </button>
            <button
              onClick={onFavoriteClick}
              disabled={favLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isFav
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "border border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
              } ${favLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {favLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
              )}
              <span className="text-sm">
                {isFav ? "Favoris" : "Ajouter aux favoris"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
