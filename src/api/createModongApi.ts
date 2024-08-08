import { Meeting } from '@/types/Modong';
import axiosInstance from './axiosConfig';

export const createMeeting = async (
  meetingData: Meeting,
  meetingId: number,
) => {
  const response = await axiosInstance.post(
    `api/meetings/${meetingId}`,
    meetingData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response;
};

export const createClub = async (clubData: FormData) => {
  const response = await axiosInstance.post('api/clubs', clubData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
