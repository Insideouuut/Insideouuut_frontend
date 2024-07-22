import gameImg from '@/assets/icons/game.png';
import runImg from '@/assets/icons/run.png';
import studyImg from '@/assets/icons/study.png';
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

  const exampleData = [
    {
      clubTypes: ['동아리'],
      meetingTypes: ['운동'],
      imageSrc: runImg,
      title: '한강 러닝 크루 1',
      subtitle: '20~30대 러닝크루입니다.',
      date: '7월 19일 오후 5시',
      location: '광진구',
      participants: '(7/8)',
    },
    {
      clubTypes: ['모임'],
      meetingTypes: ['사교/취미'],
      imageSrc: studyImg,
      title: '독서 모임 1',
      subtitle: '매주 독서 토론을 합니다.',
      date: '7월 20일 오후 3시',
      location: '강남구',
      participants: '(5/6)',
    },
    {
      clubTypes: ['동아리'],
      meetingTypes: ['사교/취미'],
      imageSrc: gameImg,
      title: '게임 동아리 1',
      subtitle: '다양한 게임을 함께 즐겨요.',
      date: '7월 21일 오후 4시',
      location: '서초구',
      participants: '(10/10)',
    },
    {
      clubTypes: ['모임'],
      meetingTypes: ['운동'],
      imageSrc: runImg,
      title: '조깅 모임 1',
      subtitle: '조깅을 통해 건강을 챙겨요.',
      date: '7월 22일 오전 6시',
      location: '송파구',
      participants: '(8/10)',
    },
    {
      clubTypes: ['동아리'],
      meetingTypes: ['스터디'],
      imageSrc: studyImg,
      title: '스터디 동아리 1',
      subtitle: '함께 공부하며 지식을 나눠요.',
      date: '7월 23일 오후 2시',
      location: '용산구',
      participants: '(3/5)',
    },
    {
      clubTypes: ['모임'],
      meetingTypes: ['사교/취미'],
      imageSrc: gameImg,
      title: '보드게임 모임 1',
      subtitle: '보드게임을 함께 즐겨요.',
      date: '7월 24일 오후 7시',
      location: '종로구',
      participants: '(6/8)',
    },
    {
      clubTypes: ['동아리'],
      meetingTypes: ['운동'],
      imageSrc: runImg,
      title: '한강 러닝 크루 2',
      subtitle: '20~30대 러닝크루입니다.',
      date: '7월 25일 오후 5시',
      location: '광진구',
      participants: '(7/8)',
    },
    {
      clubTypes: ['모임'],
      meetingTypes: ['사교/취미'],
      imageSrc: studyImg,
      title: '독서 모임 2',
      subtitle: '매주 독서 토론을 합니다.',
      date: '7월 26일 오후 3시',
      location: '강남구',
      participants: '(5/6)',
    },
    {
      clubTypes: ['동아리'],
      meetingTypes: ['사교/취미'],
      imageSrc: gameImg,
      title: '게임 동아리 2',
      subtitle: '다양한 게임을 함께 즐겨요.',
      date: '7월 27일 오후 4시',
      location: '서초구',
      participants: '(10/10)',
    },
    {
      clubTypes: ['모임'],
      meetingTypes: ['운동'],
      imageSrc: runImg,
      title: '조깅 모임 2',
      subtitle: '조깅을 통해 건강을 챙겨요.',
      date: '7월 28일 오전 6시',
      location: '송파구',
      participants: '(8/10)',
    },
    {
      clubTypes: ['동아리'],
      meetingTypes: ['스터디'],
      imageSrc: studyImg,
      title: '스터디 동아리 2',
      subtitle: '함께 공부하며 지식을 나눠요.',
      date: '7월 29일 오후 2시',
      location: '용산구',
      participants: '(3/5)',
    },
    {
      clubTypes: ['모임'],
      meetingTypes: ['사교/취미'],
      imageSrc: gameImg,
      title: '보드게임 모임 2',
      subtitle: '보드게임을 함께 즐겨요.',
      date: '7월 30일 오후 7시',
      location: '종로구',
      participants: '(6/8)',
    },
    {
      clubTypes: ['동아리'],
      meetingTypes: ['사교/취미'],
      imageSrc: gameImg,
      title: '보드게임 할사람',
      subtitle: '보드게임을 함께 즐겨요.',
      date: '7월 30일 오후 7시',
      location: '종로구',
      participants: '(6/8)',
    },
  ];

  const fullData = [...Array(3).fill(exampleData)].flat();

  const filteredData = fullData.filter(
    (item) =>
      (activeTopTab === '전체' || item.clubTypes.includes(activeTopTab)) &&
      (activeBottomTab === '전체' ||
        item.meetingTypes.includes(activeBottomTab)) &&
      (item.title.includes(searchQuery) || item.subtitle.includes(searchQuery)),
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
                imageSrc={item.imageSrc}
                title={item.title}
                subtitle={item.subtitle}
                date={item.date}
                location={item.location}
                participants={item.participants}
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
