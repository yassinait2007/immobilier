import apiClient from '@/api/apiClient';
import { Property } from '@/types/property';

export const fetchPendingAnounces = async () => {
  const response = await apiClient.get('../dashboard/anounces');
  return response.data;
};

export const approveAnounce = async (id: number) => {
  const response = await apiClient.patch(`../dashboard/anounces/${id}/accept`);
  return response.data;
};

export const refuseAnounce = async (id: number) => {
  const response = await apiClient.patch(`../dashboard/anounces/${id}/refuse`);
  return response.data;
};
