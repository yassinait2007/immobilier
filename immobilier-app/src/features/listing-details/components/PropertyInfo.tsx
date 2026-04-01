import React from 'react';
import { MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import { AddressDisplay } from '@/components/ui/AddressComponents';
import { StarRating, PriceDisplay, PropertyStats } from './shared';

interface PropertyInfoProps {
  property: Property;
}

export const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  const getPeriod = () => property.typeTransaction?.value !== "selle" ? "par nuit" : undefined;

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            {property.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-primary" />
              <AddressDisplay address={property.address} format="short" />
            </div>
            
            {property.rate > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rating={property.rate} size="md" showValue />
                <span className="text-sm text-gray-600 font-medium">
                  ({property.rateCount || 0} avis)
                </span>
              </div>
            )}
          </div>

          <PropertyStats property={property} layout="inline" size="sm" />
        </div>

        <div className="text-center lg:text-right">
          <PriceDisplay 
            amount={property.price} 
            size="xl" 
            period={getPeriod()}
          />
        </div>
      </div>
    </div>
  );
};
