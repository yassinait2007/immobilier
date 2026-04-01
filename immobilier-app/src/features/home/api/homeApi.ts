import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";
import { ApiResponsePagination } from "@/types/apiResponsePagination";
import { Property } from "@/types/property";

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

export const fetchHomeImages = async (): Promise<ApiResponse<string[]>> => {
  const response = await apiClient.get<ApiResponse<string[]>>("/home-images");
  return response.data;
};
