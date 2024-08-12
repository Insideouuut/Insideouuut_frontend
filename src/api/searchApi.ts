import {
  ApiResponseForAll,
  ApiResponseForSpecific,
  Result,
} from '@/types/Search';
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

const getQueryParam = (query: string, topTab: string, bottomTab: string) => {
  if (topTab === '전체') {
    return bottomTab === '전체' ? 'all' : ''; // 하단 탭에서 카테고리가 선택되면 query를 빈 문자열로 설정
  } else if (topTab === '모임' || topTab === '동아리') {
    return bottomTab === '전체' ? 'all' : ''; // 하단 탭이 전체가 아니면 query를 빈 문자열로 설정
  } else {
    return query.trim() === '' ? 'all' : query;
  }
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
    const response = await axiosInstance.get<
      ApiResponseForAll | ApiResponseForSpecific
    >(endpoint, {
      params: {
        query: getQueryParam(query, topTab, category),
        category: getCategoryParam(category),
        sort,
      },
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log('Request URL:', response.config.url);

    const { results } = response.data as ApiResponseForAll;

    if (topTab === '전체' && Array.isArray(results) && results.length > 0) {
      // 전체 탭일 경우 첫 번째 객체에서 clubSearchResults와 meetingSearchResults를 합쳐서 반환
      const combinedResults: Result[] = [
        ...(results[0].clubSearchResults || []),
        ...(results[0].meetingSearchResults || []),
      ];
      return combinedResults;
    } else if (Array.isArray(results)) {
      // 모임 또는 동아리 탭일 경우 해당 결과 반환
      return results as Result[];
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};
