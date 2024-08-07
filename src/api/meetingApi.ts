import { MeetingListResponse } from '@/types/meeting';
import axiosInstance from './axiosConfig';

// 모임 목록 조회
export const getMeetings = async (): Promise<MeetingListResponse[]> => {
  try {
    const response =
      await axiosInstance.get<MeetingListResponse[]>('/api/meetings');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch meetings:', error);
    throw error;
  }
};
