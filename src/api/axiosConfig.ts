import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://modong-backend.site',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// JWT 토큰을 요청 헤더에 추가하는 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기
    console.log(token);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
