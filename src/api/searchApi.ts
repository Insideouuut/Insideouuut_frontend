// src/api/searchApi.ts
import axiosInstance from './axiosConfig';
import { ApiResponse, Result } from '@/types/Search';

const getCategoryParam = (category: string) => {
  switch (category) {
    case '전체':
      return 'all';
    case '사교/취미':
      return 'social';
    case '운동':
      return 'sports';
    case '스터디':
      return 'study';
    default:
      return 'all';
  }
};

const getQueryParam = (query: string) => {
  return query.trim() === '' ? 'all' : query;
};

export const searchMeetings = async (
  query: string = '',
  category: string = '전체',
  sort: string = 'date',
  token: string
): Promise<Result[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse>('/api/search/meeting', {
      params: { query: getQueryParam(query), category: getCategoryParam(category), sort },
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log('Request URL:', response.config.url);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};
