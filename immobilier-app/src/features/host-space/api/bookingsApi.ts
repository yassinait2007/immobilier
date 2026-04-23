import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";
import { Booking } from "@/types/clientBooking";

export const fetchHostBookings = async (realestateId?: number) => {
  const url = realestateId ? `host/realestates/${realestateId}/bookings` : 'host/bookings';
  const response = await apiClient.get<ApiResponse<Booking[]>>(url);
  return response.data;
};
