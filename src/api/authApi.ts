import { AuthResponse, LoginRequest, SignupRequest } from '../types/Auth';
import axiosInstance from './axiosConfig';

// 로그인 함수
export const login = async (loginData: LoginRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    '/api/login',
    loginData,
  );
  return response.data;
};

// 소셜 로그인 함수
// export const socialLogin = async (socialLoginData: SocialLoginRequest): Promise<AuthResponse> => {
//   const response = await axiosInstance.post<AuthResponse>('/oauth2/authorization/kakao', socialLoginData);
//   return response.data;
// };

// 회원가입 함수
export const signup = async (
  signupData: SignupRequest,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    '/api/users/join',
    signupData,
  );
  return response.data;
};
