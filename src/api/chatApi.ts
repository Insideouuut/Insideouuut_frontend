import { ApiResponseListChatRoomResponseDTO } from '@/api/Apis'; // API 응답 타입
import axiosInstance from './axiosConfig';

export const getChatRoomsByUserId = async () => {
  try {
    const response =
      await axiosInstance.get<ApiResponseListChatRoomResponseDTO>(
        '/api/chatrooms',
      );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch chat rooms:', error);
    throw error;
  }
};

export const getMeetingRoomsByUserId = async () => {
  try {
    const response =
      await axiosInstance.get<ApiResponseListChatRoomResponseDTO>(
        '/api/chatrooms/meeting',
      );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch meeting rooms:', error);
    throw error;
  }
};

export const getClubRoomsByUserId = async () => {
  try {
    const response =
      await axiosInstance.get<ApiResponseListChatRoomResponseDTO>(
        '/api/chatrooms/club',
      );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch club rooms:', error);
    throw error;
  }
};
