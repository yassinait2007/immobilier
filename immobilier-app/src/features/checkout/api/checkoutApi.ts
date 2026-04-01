import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";
import { Booking } from "@/types/clientBooking";

export const getBookingById = async (
  id: number
): Promise<ApiResponse<Booking>> => {
  const response = await apiClient.get<ApiResponse<Booking>>(
    `/client/bookings/${id}`
  );
  return response.data;
};

export const fetchClientSecret = async (
  id: number
): Promise<{ clientSecret: string }> => {
  const response = await apiClient.get<ApiResponse<{ clientSecret: string }>>(
    `/client/bookings/${id}/pay`
  );
  return response.data.data;
};
