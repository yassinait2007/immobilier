import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types/apiResponse";
import { ApiResponsePagination } from "@/types/apiResponsePagination";
import {
  ChatMessage,
  Conversation,
  SendMessageRequest,
} from "@/types/chat";

export const chatApi = {
  async getConversations(page: number = 1, perPage: number = 7): Promise<ApiResponsePagination<Conversation>> {
    const response = await apiClient.get<ApiResponsePagination<Conversation>>(
      "/chat/conversations",
      { params: { page, perPage } }
    );
    return response.data;
  },

  async getMessages(userId: number, page: number = 1, perPage: number = 100): Promise<ApiResponsePagination<ChatMessage>> {
    const response = await apiClient.get<ApiResponsePagination<ChatMessage>>(
      `/chat/${userId}/messages`,
      { params: { page, perPage } }
    );
    return response.data;
  },

  async sendMessage(
    userId: number,
    message: SendMessageRequest
  ): Promise<ApiResponse<ChatMessage>> {
    const response = await apiClient.post<ApiResponse<ChatMessage>>(
      `/chat/${userId}/send-message`,
      message
    );
    return response.data;
  },

  async getUserProfile(userId: number): Promise<ApiResponse<{ id: number; firstName: string; lastName: string; type: string; profile?: string }>> {
    const response = await apiClient.get(
      `/chat/profile/${userId}`
    );
    return response.data;
  },
};

export default chatApi;
