"use client";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Bed,
  Bath,
  Square,
  Eye,
  Star
} from "lucide-react";
import type { Property } from "../types/property";
import { formatCurrency } from "@/utils/formaters";
import { AddressDisplay } from "@/components/ui/AddressComponents";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { useAuth } from "@/context/authentication/auth-context";
import { useAuthModal } from "@/context/authentication/auth-modal-context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { isFavorite, toggleFavorite, isLoading, initializeFavorite } = useFavoritesContext();
  const navigationPrevClass = `swiper-button-prev-${property.id}`;
  const navigationNextClass = `swiper-button-next-${property.id}`;

  useEffect(() => {
    if (isAuthenticated && property.isFavorite !== undefined) {
      initializeFavorite(property.id, property.isFavorite);
    }
  }, [property.id, property.isFavorite, isAuthenticated, initializeFavorite]);

  // Simple favorite state using context
  const isFav = isFavorite(property.id);
  const isLoadingFav = isLoading(property.id);

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleFavoriteClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }

    await toggleFavorite(property.id);
  };

  const handleSwiperClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // Use 'media' array for images, fallback to placeholder
  const images = property.media?.map((m) => m.url) ?? [];

  const getPriceLabel = () => {
    return property.typeTransaction?.value === "selle" ? "" : "/ nuit";
  };

  const renderStarRating = (rating: number, ratingCount: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
      );
    }
    
    // Add half star if needed
    if (hasHalfStar && stars.length < 5) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-3 h-3 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      );
    }
    
    // Add empty stars to make 5 total
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      );
    }
    
    return (
      <div className="flex items-center gap-1">
        <div className="flex items-center">
          {stars}
        </div>
        {ratingCount > 0 && (
          <span className="text-xs text-gray-500 ml-1">({ratingCount})</span>
        )}
      </div>
    );
  };

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 hover:border-cyan-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 h-full flex flex-col"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden flex-shrink-0">
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              prevEl: `.${navigationPrevClass}`,
              nextEl: `.${navigationNextClass}`,
            }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white !opacity-60 !w-2 !h-2',
              bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100 !bg-cyan-500'
            }}
            className="w-full h-48"
          >
            {images.length > 0 ? (
              images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // If image fails to load, hide the img and show placeholder
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                    {/* Placeholder for broken images */}
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center" style={{ display: 'none' }}>
                      <div className="text-gray-400 text-center">
                        <div className="text-2xl mb-2">🏠</div>
                        <div className="text-xs">Image non disponible</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="relative w-full h-48 overflow-hidden">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="text-4xl mb-2">🏠</div>
                      <div className="text-sm font-medium">Aucune image disponible</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className={`${navigationPrevClass} absolute top-1/2 left-2 z-10 transform -translate-y-1/2 w-6 h-6 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md`}
              onClick={handleSwiperClick}
            >
              <ChevronLeft className="h-3 w-3 text-gray-700" />
            </button>
            <button
              className={`${navigationNextClass} absolute top-1/2 right-2 z-10 transform -translate-y-1/2 w-6 h-6 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md`}
              onClick={handleSwiperClick}
            >
              <ChevronRight className="h-3 w-3 text-gray-700" />
            </button>
          </>
        )}

        {/* Enhanced Favorite Button */}
        <button
          className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 ${
            isFav 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-white/90 hover:bg-white'
          } ${isLoadingFav ? 'opacity-70 cursor-not-allowed' : ''}`}
          onClick={handleFavoriteClick}
          disabled={isLoadingFav}
          title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {isLoadingFav ? (
            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Heart
              className={`h-3.5 w-3.5 transition-colors duration-300 ${
                isFav 
                  ? "fill-white text-white" 
                  : "text-gray-600 hover:text-red-500"
              }`}
            />
          )}
        </button>

        {/* Image Count Badge */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-full z-10 flex items-center gap-1">
            <Eye className="w-2.5 h-2.5" />
            <span>{images.length}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0 mr-2">
            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-cyan-600 transition-colors duration-300 min-h-[2.5rem]">
              {property.title || property.category?.name || "Beautiful Property"}
            </h3>
            
            {/* Location */}
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-3 h-3 text-cyan-500 flex-shrink-0" />
              <span className="text-xs truncate">
                <AddressDisplay address={property.address} format="short" />
              </span>
            </div>
          </div>
          
          {/* Rating */}
          {(property.rate > 0 || property.rateCount > 0) && (
            <div className="flex-shrink-0">
              {renderStarRating(property.rate, property.rateCount)}
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-3 mb-2 text-gray-600">
          <div className="flex items-center gap-0.5">
            <Bed className="w-3 h-3 text-cyan-500" />
            <span className="text-xs font-medium">{property.nbRooms || 0}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Bath className="w-3 h-3 text-cyan-500" />
            <span className="text-xs font-medium">{property.nbBathroom || 0}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Square className="w-3 h-3 text-cyan-500" />
            <span className="text-xs font-medium">{property.surface || 0}m²</span>
          </div>
        </div>

        {/* Property Type */}
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700 border border-cyan-200 max-w-[120px]">
            <span className="truncate">
              {property.category?.name || 'Appartement'}
            </span>
          </span>
          {property.typeTransaction && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 max-w-[100px]">
              <span className="truncate">
                {property.typeTransaction.name}
              </span>
            </span>
          )}
        </div>

        {/* Price - Always at bottom */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-primary">
                {formatCurrency(property.price || 0)}
              </span>
              <span className="text-sm font-medium text-cyan-600">
                {getPriceLabel()}
              </span>
            </div>
          </div>

          {/* View Details Button */}
          <button 
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-medium rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            Voir
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
