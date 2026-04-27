import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property } from '@/types/property';
import apiClient from '@/api/apiClient';
import { useAuth } from './authentication/auth-context';

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refreshProperties: () => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;
  pauseProperty: (id: number) => Promise<void>;
  activateProperty: (id: number) => Promise<void>;
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
      } else if (data && data.data && Array.isArray(data.data.items)) {
        propertiesArray = data.data.items;
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

  const handleDeleteProperty = async (id: number) => {
    try {
      setLoading(true);
      const { deleteProperty: apiDeleteProperty } = await import('@/features/host-space/api/propertiesApi');
      await apiDeleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting property:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlePauseProperty = async (id: number) => {
    try {
      const { pauseProperty: apiPauseProperty } = await import('@/features/host-space/api/propertiesApi');
      await apiPauseProperty(id);
      await fetchProperties();
    } catch (err) {
      console.error('Error pausing property:', err);
      throw err;
    }
  };

  const handleActivateProperty = async (id: number) => {
    try {
      const { activateProperty: apiActivateProperty } = await import('@/features/host-space/api/propertiesApi');
      await apiActivateProperty(id);
      await fetchProperties();
    } catch (err) {
      console.error('Error activating property:', err);
      throw err;
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
    <PropertyContext.Provider value={{ 
      properties, 
      loading, 
      error, 
      refreshProperties: fetchProperties,
      deleteProperty: handleDeleteProperty,
      pauseProperty: handlePauseProperty,
      activateProperty: handleActivateProperty
    }}>
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
