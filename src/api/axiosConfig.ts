import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // API의 기본 URL로 바꿔주세요
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업 (예: 토큰 추가)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 응답 오류 처리
    if (error.response && error.response.status === 401) {
      // 예: 인증 오류 처리
      console.error('Unauthorized, logging out ...');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
