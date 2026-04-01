import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";
import { ApiResponsePagination } from "@/types/apiResponsePagination";
import { HostProfile } from "@/types/hostProfile";
import { HostReview } from "@/types/review";
import { Property } from "@/types/property";

export const fetchHostProfile = async (hostId: number): Promise<ApiResponse<HostProfile>> => {
  const response = await apiClient.get(`/host/profile/${hostId}`);
  return response.data;
};

export const fetchHostReviews = async (hostId: number, page: number = 1, perPage: number = 3): Promise<ApiResponsePagination<HostReview>> => {
  const response = await apiClient.get(`/host/reviews/${hostId}`, {
    params: { page, perPage }
  });
  return response.data;
};

export const fetchHostProperties = async (hostId: number, page: number = 1): Promise<ApiResponsePagination<Property>> => {
  const response = await apiClient.get(`/realestates?host=${hostId}&page=${page}`);
  return response.data;
};
