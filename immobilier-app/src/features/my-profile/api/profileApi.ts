import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";
import { CurrentUser } from "@/types/currentUser";
import { Region, City } from "@/types/Address";

export const fetchCurrentUser = async (): Promise<ApiResponse<CurrentUser>> => {
  const response = await apiClient.get("/me");
  return response.data;
};

export const fetchRegions = async (): Promise<ApiResponse<Region[]>> => {
  const response = await apiClient.get("/regions");
  return response.data;
};

export const fetchCities = async (regionId?: number): Promise<ApiResponse<City[]>> => {
  const url = regionId ? `/cities?region=${regionId}` : "/cities";
  const response = await apiClient.get(url);
  return response.data;
};

export const updateBasicInfo = async (data: {
  firstName: string;
  lastName: string;
  tel: string;
  address: string;
  city: number;
}): Promise<ApiResponse<CurrentUser>> => {
  const formData = new FormData();
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("tel", data.tel.replace(/^\+/, ''));
  formData.append("address", data.address);
  formData.append("city", data.city.toString());

  const response = await apiClient.post("/profile/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updatePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}): Promise<ApiResponse<CurrentUser>> => {
  const formData = new FormData();
  formData.append("oldPassword", data.oldPassword);
  formData.append("newPassword", data.newPassword);

  const response = await apiClient.post("/profile/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProfileImage = async (profileImage: File): Promise<ApiResponse<CurrentUser>> => {
  const formData = new FormData();
  formData.append("profile", profileImage);

  const response = await apiClient.post("/profile/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateIdentityImages = async (data: {
  identityFront?: File;
  identityBack?: File;
}): Promise<ApiResponse<CurrentUser>> => {
  const formData = new FormData();
  
  if (data.identityFront) {
    formData.append("identityFront", data.identityFront);
  }
  
  if (data.identityBack) {
    formData.append("identityBack", data.identityBack);
  }

  const response = await apiClient.post("/profile/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const resendVerificationEmail = async (): Promise<ApiResponse<null>> => {
  const response = await apiClient.get("/resend-verification");
  return response.data;
};
