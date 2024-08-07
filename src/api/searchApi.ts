import axiosInstance from './axiosConfig';

interface SearchParams {
  query: string;
  category: string;
  sort: string;
  page: number;
  size: number;
}

export const getSearchResults = async <T>(params: SearchParams): Promise<T> => {
  const { query, category, sort, page, size } = params;
  const response = await axiosInstance.get<T>(`/api/search/all`, {
    params: {
      query,
      category,
      sortBy: sort,
      page,
      size,
    },
  });
  return response.data;
};
