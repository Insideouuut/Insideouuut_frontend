import axiosInstance from './axiosConfig';

export const createMeeting = async (meetingData: FormData) => {
  const response = await axiosInstance.post('api/meetings', meetingData);
  return response;
};

export const createClub = async (clubData: FormData) => {
  const response = await axiosInstance.post('api/clubs', clubData);
  return response;
};
