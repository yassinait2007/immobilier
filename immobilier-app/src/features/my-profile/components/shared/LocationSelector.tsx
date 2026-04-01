import React, { useEffect, useState } from 'react';
import { FormSelect } from '@/features/host-space/shared/components/FormComponents';
import { useLocationData } from '../../hooks/shared/useLocationData';
import { extractAddressData } from '@/utils/addressExtraction';

interface LocationSelectorProps {
  cityId: number;
  user?: any; // Add user prop to extract region from user data
  onCityChange: (field: string, value: string) => void;
  errors: {
    city?: string;
  };
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  cityId,
  user,
  onCityChange,
  errors
}) => {
  const { regions, cities, loadingRegions, loadingCities, loadCitiesForRegion } = useLocationData();
  const [selectedRegion, setSelectedRegion] = useState<number>(0);

  useEffect(() => {
    if (user && user.address && selectedRegion === 0) {
      try {
        const addressData = extractAddressData(user);
        
        if (addressData.regionId > 0) {
          setSelectedRegion(addressData.regionId);
          return;
        }
      } catch (error) {
        console.error('Error with addressExtraction:', error);
      }
      
      const directRegionId = user.address?.city?.region?.id;
      if (directRegionId && directRegionId > 0) {
        setSelectedRegion(directRegionId);
      }
    }
  }, [user, selectedRegion]);

  useEffect(() => {
    if (selectedRegion && selectedRegion > 0) {
      loadCitiesForRegion(selectedRegion);
    }
  }, [selectedRegion, loadCitiesForRegion]);


  const handleRegionChange = (_field: string, value: string) => {
    const regionId = parseInt(value) || 0;
    if (regionId > 0) {
      setSelectedRegion(regionId);
      onCityChange('city', '0');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormSelect
        label="Région"
        name="region" 
        value={selectedRegion > 0 ? selectedRegion : ''}
        onChange={handleRegionChange}
        options={regions}
        disabled={loadingRegions}
        placeholder={loadingRegions ? "Chargement..." : "Sélectionnez une région"}
        required
      />
      
      <FormSelect
        label="Ville"
        name="city"
        value={cityId > 0 ? cityId : ''}
        onChange={onCityChange}
        options={cities}
        error={errors.city}
        disabled={loadingCities || !selectedRegion}
        placeholder={
          !selectedRegion 
            ? "Sélectionnez d'abord une région" 
            : loadingCities 
              ? "Chargement..." 
              : "Sélectionnez une ville"
        }
        required
      />
    </div>
  );
};

export default LocationSelector;