import { ApiResponse, Result } from '@/types/Meetings';
import axiosInstance from './axiosConfig';

export const getClubData = async (id: string): Promise<Result> => {
  try {
    const response = await axiosInstance.get<ApiResponse>(
      `/api/meetings/${id}`,
    );
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching club data:', error);
    throw error;
  }
};
