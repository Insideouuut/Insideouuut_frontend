import { MyProfileResponse } from '@/types/User';
import axiosInstance from './axiosConfig';

// 유저 프로필 조회
export const getUser = async (): Promise<MyProfileResponse> => {
  const response = await axiosInstance.get<MyProfileResponse>('/api/users');
  return response.data;
};
