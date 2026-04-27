import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";

export interface Charge {
  id: number;
  name: string;
  description?: string;
  amount: number;
  type: 'fixed' | 'variable';
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  realestate?: {
    id: number;
    title: string;
  };
}

export interface ScheduledCharge extends Charge {
  recurrenceType: 'weekly' | 'monthly' | 'yearly';
  recurrenceValue: string;
}

export const fetchCharges = async (realestateId?: number) => {
  const url = realestateId ? `host/realestates/${realestateId}/charges` : 'host/charges';
  const response = await apiClient.get<ApiResponse<Charge[]>>(url);
  return response.data;
};

export const fetchScheduledCharges = async (realestateId?: number) => {
  const url = realestateId ? `host/realestates/${realestateId}/scheduled_charges` : 'host/scheduled_charges';
  const response = await apiClient.get<ApiResponse<ScheduledCharge[]>>(url);
  return response.data;
};

export const addCharge = async (data: Partial<Charge>) => {
  const response = await apiClient.post<ApiResponse<Charge>>('host/charges', data);
  return response.data;
};

export const addScheduledCharge = async (data: Partial<ScheduledCharge>) => {
  const response = await apiClient.post<ApiResponse<ScheduledCharge>>('host/scheduled_charges', data);
  return response.data;
};

export const validateChargePayment = async (chargeId: number, formData?: FormData) => {
  const response = await apiClient.post<ApiResponse<Charge>>(`host/charges/${chargeId}/validate`, formData, {
    headers: {
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
    },
  });
  return response.data;
};

export const cancelCharge = async (chargeId: number) => {
  const response = await apiClient.post<ApiResponse<Charge>>(`host/charges/${chargeId}/cancel`);
  return response.data;
};
