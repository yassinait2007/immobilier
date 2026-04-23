import apiClient from '@/api/apiClient';

export interface PropertyPayload {
  title: string;
  description: string;
  price: number;
  surface: number;
  category: string;   // code: apartment|villa|studio|commercial
  etat: string;       // code: new|good|to-renovate
  typeTransaction: string; // code: sale|rent
  address: string;
  latitude: number;
  longitude: number;
  city: number;       // city ID (integer)
  nbRooms?: number;
  nbBathrooms?: number;
  nbEtages?: number;
  images: File[];
  features?: number[]; // feature IDs (integers)
}

export const addProperty = async (data: PropertyPayload) => {
  const formData = new FormData();
  
  // Append basic scalar fields
  const scalarFields = ['title', 'description', 'price', 'surface', 'category', 'etat', 
    'typeTransaction', 'address', 'latitude', 'longitude', 'city', 
    'nbRooms', 'nbBathrooms', 'nbEtages'];
  
  scalarFields.forEach((key) => {
    const value = (data as any)[key];
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  // Append features as numeric IDs
  if (data.features && data.features.length > 0) {
    data.features.forEach((featureId) => {
      formData.append('features[]', String(featureId));
    });
  }

  // Append images
  if (data.images && data.images.length > 0) {
    data.images.forEach((image) => {
      formData.append('images[]', image);
    });
  }

  const response = await apiClient.post('/host/realestates', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};
