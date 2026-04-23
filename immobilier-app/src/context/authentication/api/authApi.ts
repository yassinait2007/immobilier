// api/authApi.ts

import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";
import { User } from "@/types/user";

export const loginRequest = (email: string, password: string) =>
  apiClient.post("login", { email, password });

export const registerRequest = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => apiClient.post("register", { firstName, lastName, email, password });

export const fetchCurrentUser = async (): Promise<ApiResponse<User>> => {
  const response = await apiClient.get<ApiResponse<User>>("me");
  console.log("============me", response);
  return response.data;
};

export const forgotPasswordRequest = (email: string) =>
  apiClient.post("forget-password", { email });

export const resetPasswordRequest = (password: string, token: string) =>
  apiClient.post(
    "reset-password",
    { password },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const verifyOtpRequest = (otp: string, email: string) =>
  apiClient.post("check-otp", { email, otp });
