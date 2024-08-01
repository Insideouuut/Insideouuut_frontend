import { Club, Meeting } from '@/types/Modong';
import axiosInstance from './axiosConfig';

export const createMeeting = async (
  meetingData: Meeting,
  meetingId: number,
) => {
  const response = await axiosInstance.post(
    `api/meetings/${meetingId}`,
    meetingData,
  );
  return response;
};

export const createClub = async (clubData: Club) => {
  const response = await axiosInstance.post('api/clubs', clubData);
  return response;
};
