import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";

export const verifyEmail = async (
  id: string,
  hash: string,
  expires: string,
  signature: string
): Promise<ApiResponse<{ message: string }>> => {
  const response = await apiClient.get(
    `/email/verify/${id}/${hash}?signature=${signature}&expires=${expires}`
  );
  return response.data;
};
