import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://modong-backend.site',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;
