import { ApiResponse, Result } from '@/types/Search';
import axiosInstance from './axiosConfig';

const getCategoryParam = (category: string) => {
  switch (category) {
    case '전체':
      return 'all';
    case '사교/취미':
      return '사교/취미';
    case '운동':
      return '운동';
    case '스터디':
      return '스터디';
    default:
      return 'all';
  }
};

const getQueryParam = (query: string) => {
  return query.trim() === '' ? 'all' : query;
};

const getApiEndpoint = (topTab: string) => {
  switch (topTab) {
    case '모임':
      return '/api/search/meeting';
    case '동아리':
      return '/api/search/club';
    case '전체':
    default:
      return '/api/search/all';
  }
};

export const searchMeetings = async (
  query: string = '',
  category: string = '전체',
  sort: string = 'date',
  topTab: string = '전체',
  token: string,
): Promise<Result[]> => {
  try {
    const endpoint = getApiEndpoint(topTab);
    const response = await axiosInstance.get<ApiResponse>(endpoint, {
      params: {
        query: getQueryParam(query),
        category: getCategoryParam(category),
        sort,
      },
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
