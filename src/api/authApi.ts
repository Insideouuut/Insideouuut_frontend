import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  UserInfoRequest,
} from '../types/Auth';
import { postData } from './api';
import axiosInstance from './axiosConfig';

// 로그인 함수
export const login = async (loginData: LoginRequest) => {
  const response = await axiosInstance.post('/api/login', loginData);
  return response;
};

// 회원가입 함수
export const signup = async (
  signupData: SignupRequest,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    '/api/join',
    signupData,
  );
  return response.data;
};

// 이메일 중복 확인 함수
export const checkEmail = async (email: string) => {
  const encodedEmail = encodeURIComponent(email);
  const response = await axiosInstance.get(
    `/api/check-email?email=${encodedEmail}`,
  );
  return response;
};

// 닉네임 중복 확인 함수
export const checkNickname = async (nickname: string) => {
  const encodedNickname = encodeURIComponent(nickname);
  const response = await axiosInstance.get(
    `/api/check-nickname?nickname=${encodedNickname}`,
  );
  return response;
};

// 사용자 정보 입력 함수
export const enterUserInfo = async (
  userInfoData: UserInfoRequest,
  token: string | null,
): Promise<AuthResponse> => {
  const response = await postData<UserInfoRequest, AuthResponse>(
    '/api/oauth2/userInfo',
    userInfoData,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return response;
};

// 토큰 재발급 함수
export const reissueToken = async () => {
  const response = axiosInstance.post('/api/reissue', {});
  return response;
};

// 첫 로그인 회원 확인(카카오) 함수
export const isFirstLoginWithKakao = async (token: string | null) => {
  const response = axiosInstance.get('/api/oauth2/userInfo', {
    headers: {
      Authorization: token,
    },
  });
  return response;
};
