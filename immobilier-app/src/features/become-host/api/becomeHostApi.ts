import apiClient from "@/api/apiClient";
import { BecomeHostFormData } from '@/types/becomeHost';

export const becomeHostRequest = async (formData: BecomeHostFormData) => {
  const data = new FormData();
  
  data.append('tel', formData.tel);
  data.append('city', formData.city.toString());
  data.append('address', formData.address);
  
  if (formData.rib) {
    data.append('rib', formData.rib);
  }
  
  data.append('identityFront', formData.identityFront);
  data.append('identityBack', formData.identityBack);
  data.append('profile', formData.profile);

  return await apiClient.post('/become-host', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getCitiesRequest = async (regionId?: number) => {
  const params = regionId ? { region: regionId.toString() } : {};
  return await apiClient.get('/cities', { params });
};

export const getRegionsRequest = async () => {
  return await apiClient.get('/regions');
};
