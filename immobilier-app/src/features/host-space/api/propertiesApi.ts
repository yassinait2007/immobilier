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

export const updateProperty = async (id: number, data: Partial<PropertyPayload>) => {
  const formData = new FormData();
  formData.append('_method', 'PATCH'); // Laravel requirement for PATCH/PUT with multipart/form-data
  
  Object.keys(data).forEach((key) => {
    const value = (data as any)[key];
    if (value !== undefined && value !== null) {
      if (key === 'images' && Array.isArray(value)) {
        value.forEach((image) => formData.append('images[]', image));
      } else if (key === 'features' && Array.isArray(value)) {
        value.forEach((fId) => formData.append('features[]', String(fId)));
      } else {
        formData.append(key, String(value));
      }
    }
  });

  const response = await apiClient.post(`/host/realestates/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteProperty = async (id: number) => {
  const response = await apiClient.delete(`/host/realestates/${id}`);
  return response.data;
};

export const pauseProperty = async (id: number) => {
  const response = await apiClient.patch(`/host/realestates/${id}/pause`);
  return response.data;
};

export const activateProperty = async (id: number) => {
  const response = await apiClient.patch(`/host/realestates/${id}/activate`);
  return response.data;
};
