import apiClient from "@/api/apiClient";

export interface GlobalStats {
  totalPlatform: number;
  totalRealworld: number;
  totalCharges: number;
  platform: Array<{ period: string; amount: number }>;
  realworld: Array<{ period: string; amount: number }>;
  charges: Array<{ period: string; amount: number }>;
}

export const fetchGlobalStats = async (from: string, to: string, groupBy: string = 'day') => {
  // Use relative path to go up from /api/app to /api/ and then into /dashboard
  const response = await apiClient.get('../dashboard/global-stats', {
    params: { from, to, groupBy }
  });
  return response.data;
};
