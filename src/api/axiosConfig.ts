import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://modong-backend.site',
  withCredentials: true,
});

export default axiosInstance;
