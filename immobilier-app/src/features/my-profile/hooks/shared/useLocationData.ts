import { useState, useEffect, useCallback } from 'react';
import { fetchRegions, fetchCities } from '@/features/my-profile/api/profileApi';
import { Region, City } from '@/types/Address';

export const useLocationData = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingRegions, setLoadingRegions] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const loadRegions = async () => {
      try {
        setLoadingRegions(true);
        const response = await fetchRegions();
        setRegions(response.data || []);
      } catch (error) {
        console.error('Failed to load regions:', error);
      } finally {
        setLoadingRegions(false);
      }
    };

    loadRegions();
  }, []);

  const loadCitiesForRegion = useCallback(async (regionId: number) => {
    if (!regionId) {
      setCities([]);
      return;
    }

    try {
      setLoadingCities(true);
      const response = await fetchCities(regionId);
      setCities(response.data || []);
    } catch (error) {
      console.error('Failed to load cities for region', regionId, ':', error);
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  }, []);

  return {
    regions,
    cities,
    loadingRegions,
    loadingCities,
    loadCitiesForRegion,
    setCities
  };
};