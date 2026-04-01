import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";
import { ApiResponsePagination } from "@/types/apiResponsePagination";
import { Booking, BookingStatus } from "@/types/clientBooking";

export const getBookingByStatus = async (
  status?: BookingStatus,
  page = 1
): Promise<ApiResponsePagination<Booking>> => {
  const response = await apiClient.get<ApiResponsePagination<Booking>>(
    "/client/bookings",
    {
      params: status ? { status: status.code, page: page } : { page: page },
    }
  );
  return response.data;
};

export const getBookingsStatus = async (): Promise<
  ApiResponse<BookingStatus[]>
> => {
  const response = await apiClient.get<ApiResponse<BookingStatus[]>>(
    "/bookings/status"
  );
  return response.data;
};

interface ClientRatingRequest {
  comment: string;
  cleanliness: number;
  communication: number;
  accuracy: number;
  location: number;
}

export const rateBooking = async (
  bookingId: number,
  request: ClientRatingRequest
): Promise<ApiResponse<Booking>> => {
  const response = await apiClient.post<ApiResponse<Booking>>(
    `/client/bookings/${bookingId}/rate`,
    request
  );
  return response.data;
};
