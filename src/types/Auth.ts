import { AxiosResponseHeaders } from 'axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  birth: string;
  gender: 'MALE' | 'FEMALE';
  interests: string[];
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  nickName: string;
  phoneNumber: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  category: string[];
}

export interface LoginResponse {
  data: AuthResponse;
  headers: AxiosResponseHeaders;
}

export interface AuthResponse {
  status: {
    code: number;
    message: string;
  };
}

export interface UserInfoFormInput {
  nickname: string;
  phoneNumber: string;
  birth: string;
  gender: 'MALE' | 'FEMALE';
  interests: string[];
  location: string;
}

export interface UserInfoRequest {
  nickName: string;
  phoneNumber: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  category: string[];
  location: string;
}
