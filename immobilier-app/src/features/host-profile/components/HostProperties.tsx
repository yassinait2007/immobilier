import React, { useRef } from "react";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Property } from "@/types/property";
import PropertyCard from "@/components/PropertyCard";

interface HostPropertiesProps {
  properties: Property[];
  totalProperties: number;
  isLoading?: boolean;
}

export const HostProperties: React.FC<HostPropertiesProps> = ({ 
  properties, 
  totalProperties, 
  isLoading = false 
}) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Loading Header */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Loading Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Propriétés</h2>
              <p className="text-gray-600 text-sm">Les biens de cet hôte</p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Home size={24} className="text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-1">Aucune propriété pour le moment</h3>
            <p className="text-gray-600 text-sm">
              Les propriétés de cet hôte apparaîtront ici.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Propriétés</h2>
            <p className="text-gray-600 text-sm">{totalProperties} {totalProperties === 1 ? 'propriété' : 'propriétés'}</p>
          </div>
          
          {properties.length > 2 && (
            <div className="flex items-center gap-2">
              <button
                ref={prevRef}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                ref={nextRef}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Suivant"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      {properties.length > 2 ? (
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              320: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
            }}
            className="properties-swiper"
          >
            {properties.map((property) => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};
