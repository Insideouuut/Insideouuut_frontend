import axios from 'axios';
import { reissueToken } from './authApi';

const axiosInstance = axios.create({
  baseURL: 'https://modong-backend.site',
  withCredentials: true,
});

// JWT 토큰을 요청 헤더에 추가하는 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || '';
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// access 토큰 만료 시 재발급하는 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');

      try {
        const response = await reissueToken();
        const statusCode = response.data.status.code;
        const statusMessage = response.data.status.message;
        const token = response.headers['authorization'];

        if (statusCode === 200) {
          localStorage.setItem('accessToken', token);
          return axiosInstance(originalRequest);
        } else {
          alert(statusMessage);
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('reissueToken:', error);
        alert('Failed to reissue token: ' + error);
        window.location.href = '/login';
      }
    }
  },
);

export default axiosInstance;
