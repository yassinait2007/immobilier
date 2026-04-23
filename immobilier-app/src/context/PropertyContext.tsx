import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property } from '@/types/property';
import apiClient from '@/api/apiClient';
import { useAuth } from './authentication/auth-context';

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refreshProperties: () => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();

  const fetchProperties = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      setError(null);
      // This endpoint should return properties for the currently authenticated host
      const response = await apiClient.get('/host/realestates');
      let data = response.data;
      // Handle different possible API response structures
      let propertiesArray = [];
      if (Array.isArray(data)) {
        propertiesArray = data;
      } else if (data && Array.isArray(data.data)) {
        propertiesArray = data.data;
      } else if (data && data.data && Array.isArray(data.data.data)) {
        propertiesArray = data.data.data;
      }
      setProperties(propertiesArray);
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      setError('Impossible de charger vos propriétés.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProperties();
    } else {
      setProperties([]);
    }
  }, [isAuthenticated]);

  return (
    <PropertyContext.Provider value={{ properties, loading, error, refreshProperties: fetchProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
