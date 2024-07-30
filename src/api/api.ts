import axiosInstance from './axiosConfig';

// GET 요청 함수
export const getData = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

// POST 요청 함수
export const postData = async <T, R>(url: string, data: T): Promise<R> => {
  const response = await axiosInstance.post<R>(url, data);
  return response.data;
};
