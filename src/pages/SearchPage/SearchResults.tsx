import { dummyData } from '@/components/dummyData';
import React, { useState } from 'react';
import GroupCard from '../../components/GroupCard';

interface SearchResultsProps {
  activeTopTab: string;
  activeBottomTab: string;
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  activeTopTab,
  activeBottomTab,
  searchQuery,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredData = dummyData.filter(
    (item) =>
      (activeTopTab === '전체' || item.clubTypes.includes(activeTopTab)) &&
      (activeBottomTab === '전체' ||
        item.meetingTypes.includes(activeBottomTab)) &&
      (item.title.includes(searchQuery) ||
        item.description.includes(searchQuery)),
  );

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

  return (
    <div className="w-full bg-stone-200">
      <div className="mx-auto py-5 px-8 flex-col  w-[1040px] bg-white">
        <h2 className="font-neoBold text-lg mb-2">모임 목록</h2>
        <ul className="w-full flex pr-16 space-x-5 justify-end text-[12px] font-neoBold mb-4">
          <li>인기순</li>
          <li>날짜순</li>
          <li>가까운순</li>
        </ul>
        {filteredData.length === 0 ? (
          <div className="w-full flex justify-center items-center h-40">
            <p className="text-lg font-neoBold">
              &#39;{searchQuery}&#39;에 대한 검색결과가 없습니다.
            </p>
          </div>
        ) : (
          <div className="w-full mx-auto grid grid-cols-2 gap-4 pb-5">
            {currentItems.map((item, index) => (
              <GroupCard
                key={index}
                clubTypes={item.clubTypes}
                meetingTypes={item.meetingTypes}
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                date={item.date}
                location={item.location}
                members={item.members}
              />
            ))}
          </div>
        )}
        {filteredData.length > 0 && (
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
                    ? 'bg-green-600 text-white'
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
        )}
      </div>
    </div>
  );
};

export default SearchResults;
