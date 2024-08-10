import { searchMeetings } from '@/api/searchApi';
import { Result } from '@/types/Search';
import React, { useEffect, useState } from 'react';
import GroupCard from '../../components/GroupCard';

// 로딩 스피너 컴포넌트
const Spinner: React.FC = () => (
  <div className="w-full flex justify-center items-center h-[1000px]">
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

interface SearchResultsProps {
  activeTopTab: string;
  activeBottomTab: string;
  searchQuery: string;
  token: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  activeTopTab,
  activeBottomTab,
  searchQuery,
  token,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [filteredData, setFilteredData] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<string>('date');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchMeetings(
          searchQuery,
          activeBottomTab,
          sort,
          activeTopTab,
          token,
        );

        // 필터링 로직 추가: name 또는 introduction 속성에서 searchQuery와 일치하는 결과 필터링
        const filteredResults = results.filter(
          (item) =>
            item.name.includes(searchQuery) ||
            item.introduction.includes(searchQuery),
        );

        setFilteredData(filteredResults || []);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
        setFilteredData([]); // API 호출 실패 시 빈 배열로 설정
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, activeBottomTab, sort, activeTopTab, token]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, activeBottomTab]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.max(prev - 1, 1);
      window.scrollTo({ top: 484, behavior: 'smooth' });
      return newPage;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev + 1, totalPages);
      window.scrollTo({ top: 484, behavior: 'smooth' });
      return newPage;
    });
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto py-5 flex-col w-[960px]">
        <h2 className="font-neo text-2xl mb-2 ml-5">모임 목록</h2>
        <ul className="w-full flex pr-16 space-x-5 justify-end text-[12px] font-neoBold mb-4">
          <button
            className={`cursor-pointer ${sort === 'like' ? 'text-primary' : ''}`}
            onClick={() => handleSortChange('like')}
          >
            인기순
          </button>
          <button
            className={`cursor-pointer ${sort === 'date' ? 'text-primary' : ''}`}
            onClick={() => handleSortChange('date')}
          >
            최신순
          </button>
          <button
            className={`cursor-pointer ${sort === 'rdate' ? 'text-primary' : ''}`}
            onClick={() => handleSortChange('rdate')}
          >
            오래된순
          </button>
        </ul>

        {loading && <Spinner />}

        {!loading && !error && filteredData.length === 0 && (
          <div className="w-full flex justify-center items-center h-40">
            <p className="text-lg font-neoBold">
              &#39;{searchQuery}&#39;에 대한 검색결과가 없습니다.
            </p>
          </div>
        )}

        {!loading && !error && filteredData.length > 0 && (
          <>
            <div className="w-[900px] mx-auto grid grid-cols-2 gap-4 pb-5">
              {currentItems.map((item) => (
                <GroupCard
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  imageUrl={item.images?.[0]?.url || ''}
                  name={item.name}
                  introduction={item.introduction}
                  date={item.date}
                  location={item.place?.name || ''}
                  participantsNumber={item.participantsNumber}
                  participantLimit={item.participantLimit}
                  category={item.category}
                />
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrevPage}
                className="mx-1 px-2 py-1 rounded hover:bg-stone-200"
                disabled={currentPage === 1}
              >
                {'<'}
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(index + 1);
                    window.scrollTo({ top: 484, behavior: 'smooth' });
                  }}
                  className={`mx-1 px-2 py-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-primary text-white'
                      : 'hover:bg-stone-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                className="mx-1 px-2 py-1 rounded hover:bg-stone-200"
                disabled={currentPage === totalPages}
              >
                {'>'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
