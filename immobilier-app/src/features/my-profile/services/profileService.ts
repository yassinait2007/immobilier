import { CurrentUser } from "@/types/currentUser";
import { ProfileBasicInfoData } from "@/schemas/profile";
import { 
  fetchCurrentUser as apiGetCurrentUser,
  updateBasicInfo as apiUpdateBasicInfo,
  updatePassword as apiUpdatePassword,
  updateProfileImage as apiUpdateProfileImage,
  updateIdentityImages as apiUpdateIdentityImages,
} from "../api/profileApi";

export interface PasswordUpdateData {
  oldPassword: string;
  newPassword: string;
}

export interface IdentityUpdateData {
  identityFront?: File;
  identityBack?: File;
}

export class ProfileService {
  static async getCurrentUser(): Promise<CurrentUser> {
    const response = await apiGetCurrentUser();
    if (!response.success) {
      throw new Error('Failed to fetch user profile');
    }
    return response.data;
  }

  static async updateBasicInfo(data: ProfileBasicInfoData): Promise<CurrentUser> {
    const response = await apiUpdateBasicInfo(data);
    if (!response.success) {
      throw new Error('Failed to update basic information');
    }
    return response.data;
  }

  static async updatePassword(data: PasswordUpdateData): Promise<void> {
    const response = await apiUpdatePassword(data);
    if (!response.success) {
      throw new Error('Failed to update password');
    }
  }

  static async updateProfileImage(image: File): Promise<CurrentUser> {
    const response = await apiUpdateProfileImage(image);
    if (!response.success) {
      throw new Error('Failed to update profile image');
    }
    return response.data;
  }

  static async updateIdentityDocuments(data: IdentityUpdateData): Promise<CurrentUser> {
    const response = await apiUpdateIdentityImages(data);
    if (!response.success) {
      throw new Error('Failed to update identity documents');
    }
    return response.data;
  }
}
