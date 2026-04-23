import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";

export interface Contract {
  id: number;
  signedDate: string;
  expirationDate: string;
  note?: string;
  price?: number;
  type: 'client' | 'owner';
  owner?: { id: number; name: string };
  client?: { id: number; fullName: string };
  realestate?: { id: number; title: string };
  documents?: { url: string; id: number }[];
}

export const fetchContracts = async (realestateId?: number) => {
  const url = realestateId ? `host/realestates/${realestateId}/contracts` : 'host/contracts';
  const response = await apiClient.get<ApiResponse<Contract[]>>(url);
  return response.data;
};

export const addContract = async (formData: FormData) => {
  const response = await apiClient.post<ApiResponse<Contract>>('host/contracts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
