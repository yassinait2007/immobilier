import apiClient from "@/api/apiClient";

import { Category, Etat, Feature, Property } from "@/types/property";
import { City } from "@/types/Address";
import { PropertyQueryParams, QueryBuilder } from "./queryBuilder";
import { ApiResponsePagination } from "@/types/apiResponsePagination";
import { ApiResponse } from "@/types/apiResponse";

export const fetchEtats = async (): Promise<ApiResponse<Etat[]>> => {
  const response = await apiClient.get<ApiResponse<Etat[]>>(
    "/realestates/etats"
  );
  return response.data;
};

export const fetchCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await apiClient.get<ApiResponse<Category[]>>(
    "/realestates/categories"
  );
  return response.data;
};

export const fetchFeatures = async (): Promise<ApiResponse<Feature[]>> => {
  const response = await apiClient.get<ApiResponse<Feature[]>>("/features");
  return response.data;
};

export const fetchCities = async (): Promise<ApiResponse<City[]>> => {
  const response = await apiClient.get<ApiResponse<City[]>>("/cities");
  return response.data;
};

export const fetchPropertiesWithFilters = async (
  filters: PropertyQueryParams
): Promise<ApiResponsePagination<Property>> => {
  const query = QueryBuilder(filters);
  const response = await apiClient.get<ApiResponsePagination<Property>>(
    `/realestates?${query}`
  );
  return response.data;
};
