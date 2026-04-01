import apiClient from "@/api/apiClient";
import type { Property } from "@/types/property";
import type { ApiResponsePagination } from "@/types/apiResponsePagination";

export interface FavoritesResponse {
  items: Property[];
  totalItems: number;
}

export const getFavorites = async (page: number = 1, perPage: number = 12): Promise<ApiResponsePagination<Property>> => {
  const response = await apiClient.get("/client/favorites", {
    params: { page, perPage }
  });
  return response.data;
};

export const addToFavorites = async (propertyId: number): Promise<{ success: boolean }> => {
  const response = await apiClient.post("/client/add-favorite", {
    realestate: propertyId
  });
  return { success: response.data.success };
};

export const removeFromFavorites = async (propertyId: number): Promise<{ success: boolean }> => {
  const response = await apiClient.post("/client/remove-favorite", {
    realestate: propertyId
  });
  return { success: response.data.success };
};
