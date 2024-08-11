import { ClubApiResponse, ClubData } from '@/types/Clubs';
import axiosInstance from './axiosConfig';

//동아리 단건 조회
export const getClubData = async (id: string): Promise<ClubData> => {
  try {
    const response = await axiosInstance.get<ClubApiResponse>(
      `/api/clubs/${id}`,
    );
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching club data:', error);
    throw error;
  }
};

// 동아리 멤버 조회
export const getClubMemberList = async (clubId: string) => {
  const response = await axiosInstance.get(`/api/clubs/${clubId}/members`);
  return response;
};

// 모임 멤버 조회
export const getMeetingMemberList = async (meetingId: string) => {
  const response = await axiosInstance.get(
    `/api/meetings/${meetingId}/members`,
  );
  return response;
};
