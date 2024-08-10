// apiService.ts

import { ProfileUpdateRequest } from '@/api/Apis';
import axiosInstance from './axiosConfig';

// 사용자 프로필을 확인할 수 있는 API
export const getMyProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch my profile:', error);
    throw error;
  }
};

// 사용자 정보를 수정할 수 있는 API (닉네임과 비밀번호)
export const updateUserProfile = async (data: ProfileUpdateRequest) => {
  try {
    const response = await axiosInstance.patch('/api/users', data);
    return response.data;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
};

// 프로필 이미지 수정할 수 있는 API
export const updateUserProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axiosInstance.patch('/api/users/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user profile image:', error);
    throw error;
  }
};
