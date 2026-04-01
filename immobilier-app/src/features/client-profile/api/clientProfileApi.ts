import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";
import { ApiResponsePagination } from "@/types/apiResponsePagination";
import { ClientProfile } from "@/types/clientProfile";
import { ClientReview } from "@/types/review";

export const fetchClientProfile = async (clientId: number): Promise<ApiResponse<ClientProfile>> => {
  const response = await apiClient.get(`/client/profile/${clientId}`);
  return response.data;
};

export const fetchClientReviews = async (clientId: number, page: number = 1, perPage: number = 3): Promise<ApiResponsePagination<ClientReview>> => {
  const response = await apiClient.get(`/client/reviews/${clientId}`, {
    params: { page, perPage }
  });
  return response.data;
};
