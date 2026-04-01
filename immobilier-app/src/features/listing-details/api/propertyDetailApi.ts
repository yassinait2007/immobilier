import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";
import { ApiResponsePagination } from "@/types/apiResponsePagination";
import { Booking } from "@/types/clientBooking";
import { Property } from "@/types/property";
import { Review } from "@/types/review";

export const fetchPropertyDetails = async (
  id: number
): Promise<ApiResponse<Property>> => {
  const response = await apiClient.get<ApiResponse<Property>>(
    `/realestates/${id}`
  );
  return response.data;
};

export const fetchPropertiesByType = async (
  typeTransaction?: String
): Promise<ApiResponsePagination<Property>> => {
  const response = await apiClient.get<ApiResponsePagination<Property>>(
    `/realestates`,
    {
      params: typeTransaction ? { typeTransaction } : {},
    }
  );
  return response.data;
};

export const fetchPropertyReviews = async (
  property: number
): Promise<ApiResponsePagination<Review>> => {
  const response = await apiClient.get<ApiResponsePagination<Review>>(
    `/realestate/reviews/${property}`
  );
  return response.data;
};

interface BookingRequest {
  checkin: string;
  checkout: string;
  guest: number;
  realestate: number;
}

export const bookProperty = async (
  request: BookingRequest
): Promise<ApiResponse<Booking>> => {
  const response = await apiClient.post<ApiResponse<Booking>>(
    "/client/bookings",
    request
  );
  return response.data;
};
