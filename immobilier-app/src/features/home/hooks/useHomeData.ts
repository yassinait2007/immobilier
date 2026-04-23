import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { fetchPropertiesByType } from '../api/homeApi';

export const useHomeData = () => {
  const [longTermProperties, setLongTermProperties] = useState<Property[]>([]);
  const [shortTermProperties, setShortTermProperties] = useState<Property[]>([]);
  const [forSaleProperties, setForSaleProperties] = useState<Property[]>([]);

  const [loading, setLoading] = useState({
    longTerm: true,
    shortTerm: true,
    forSale: true,
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setError(null);

        // Long term rentals
        setLoading((prev) => ({ ...prev, longTerm: true }));
        const longTermRes = await fetchPropertiesByType("rent");
        setLongTermProperties(longTermRes.data.items);
        setLoading((prev) => ({ ...prev, longTerm: false }));

        // Short term rentals
        setLoading((prev) => ({ ...prev, shortTerm: true }));
        const shortTermRes = await fetchPropertiesByType("vacation_rental");
        setShortTermProperties(shortTermRes.data.items);
        setLoading((prev) => ({ ...prev, shortTerm: false }));

        // Properties for sale
        setLoading((prev) => ({ ...prev, forSale: true }));
        const forSaleRes = await fetchPropertiesByType("sale");
        setForSaleProperties(forSaleRes.data.items);
        setLoading((prev) => ({ ...prev, forSale: false }));
      } catch (error) {
        console.error("Error loading properties:", error);
        setError("Erreur lors du chargement des propriétés");
        setLoading({
          longTerm: false,
          shortTerm: false,
          forSale: false,
        });
      }
    };

    loadProperties();
  }, []);

  return {
    longTermProperties,
    shortTermProperties,
    forSaleProperties,
    loading,
    error
  };
};