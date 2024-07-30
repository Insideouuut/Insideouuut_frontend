// src/types/Auth.ts
export interface LoginRequest {
  email: string;
  password: string;
}

// export interface SocialLoginRequest {
//   provider: string; // 예: 'google', 'facebook'
//   token: string; // 소셜 로그인 액세스 토큰
// }

export interface SignupRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  birth: string;
  gender: string;
  interests: string[];
  location: string;
  mbti: string;
}

export interface AuthResponse {
  status: {
    code: number;
    message: string;
  };
  //   token?: string;
  //   user?: {
  //     id: number;
  //     name: string;
  //     email: string;
  //   };
}
