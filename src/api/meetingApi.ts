import { MeetingListResponse } from '@/types/Meeting';
import axiosInstance from './axiosConfig';

// 모임 목록 조회
export const getMeetings = async (): Promise<MeetingListResponse[]> => {
  const response =
    await axiosInstance.get<MeetingListResponse[]>('/api/meetings');
  return response.data;
};
