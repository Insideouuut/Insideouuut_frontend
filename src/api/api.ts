import { AxiosRequestConfig } from 'axios';
import axiosInstance from './axiosConfig';

// GET 요청 함수
export const getData = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

// POST 요청 함수
export const postData = async <T, R>(
  url: string,
  data: T,
  config?: AxiosRequestConfig,
): Promise<R> => {
  const response = await axiosInstance.post<R>(url, data, config);
  return response.data;
};

// PATCH 요청 함수
export const patchData = async <T, R>(
  url: string,
  data: T,
  config?: AxiosRequestConfig,
): Promise<R> => {
  const response = await axiosInstance.patch<R>(url, data, config);
  return response.data;
};
