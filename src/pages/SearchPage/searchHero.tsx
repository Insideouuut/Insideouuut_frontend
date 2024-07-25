import search from '@/assets/icons/search_24dp_5CB270.png';
import studyImg from '@/assets/icons/study.png';
import React, { useEffect, useRef, useState } from 'react';
import SearchResults from './SearchResults';

const topTabs = ['전체', '모임', '동아리'];
const bottomTabs = ['전체', '사교/취미', '운동', '스터디'];

const Search: React.FC = () => {
  const [activeTopTab, setActiveTopTab] = useState<string>('전체');
  const [activeBottomTab, setActiveBottomTab] = useState<string>('전체');
  const [underlineStyle, setUnderlineStyle] = useState<React.CSSProperties>({});
  const [bottomUnderlineStyle, setBottomUnderlineStyle] =
    useState<React.CSSProperties>({});
  const topTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const bottomTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState<string>('');

  useEffect(() => {
    const activeTab = topTabRefs.current[topTabs.indexOf(activeTopTab)];
    if (activeTab) {
      setUnderlineStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeTopTab]);

  useEffect(() => {
    const activeTab =
      bottomTabRefs.current[bottomTabs.indexOf(activeBottomTab)];
    if (activeTab) {
      setBottomUnderlineStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeBottomTab]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSubmittedSearchQuery(searchQuery);
    }
  };

  return (
    <section className="w-full pt-8 flex-col bg-primary flex justify-center">
      <div className="flex items-center mx-auto w-[920px] justify-between">
        <div className="flex flex-col">
          <h1 className="text-4xl font-neoExtraBold text-white mb-10">
            함께 할 취미를 찾아보세요.
          </h1>
          <p className="text-white font-neoLight mt-2">
            취향에 맞는 모임을 찾아
          </p>
          <p className=" text-white font-neoLight mt-2">
            같이 취미를 즐겨봐요.
          </p>
        </div>
        <img src={studyImg} style={{ height: 200, width: 200 }} alt="Study" />
      </div>
      <div className="flex justify-center w-[960px] my-3 h-40 mx-auto border-2 rounded-xl bg-white">
        <div className="flex justify-evenly flex-col w-[70%] relative">
          <div className="flex mx-auto justify-between w-[80%] relative">
            {topTabs.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => (topTabRefs.current[index] = el)}
                className={`px-4 py-2 ${activeTopTab === tab ? 'text-primary' : 'text-black'}`}
                onClick={() => setActiveTopTab(tab)}
              >
                {tab}
              </button>
            ))}
            <div
              className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
              style={underlineStyle}
            />
          </div>
          <div className="flex mx-auto justify-between w-[80%] relative mt-4">
            {bottomTabs.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => (bottomTabRefs.current[index] = el)}
                className={`px-4 py-2 ${activeBottomTab === tab ? 'text-primary' : 'text-black'}`}
                onClick={() => setActiveBottomTab(tab)}
              >
                {tab}
              </button>
            ))}
            <div
              className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
              style={bottomUnderlineStyle}
            />
          </div>
        </div>
        <div className="flex flex-col justify-end items-center ml-4">
          <div className="flex mb-5">
            <input
              type="text"
              className="border-b-2 border-primary text-center px-4 w-52 text-sm focus:outline-none focus:border-green-600"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button
              className="ml-2 text-primary"
              onClick={() => setSubmittedSearchQuery(searchQuery)}
            >
              <img src={search} alt="search" className="w-[23px]" />
            </button>
          </div>
        </div>
      </div>
      <SearchResults
        activeTopTab={activeTopTab}
        activeBottomTab={activeBottomTab}
        searchQuery={submittedSearchQuery}
      />
    </section>
  );
};

export default Search;
