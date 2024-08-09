import axiosInstance from '@/api/axiosConfig';
import GroupCard from '@/components/GroupCard';
import { Button } from '@/components/ui/button';
import { Result } from '@/types/Search';
import { MoveRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomImg from './BottomBG.png';
import ModongCard from './ModongCard';

const MiddleSection: React.FC = () => {
  const [data, setData] = useState<Result[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axiosInstance.get('/api/search/meeting', {
          params: {
            query: 'all',
            category: 'all',
            sort: 'date',
          },
        });
        setData(response.data.results);
      } catch (error) {
        console.error('Failed to fetch meetings:', error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="container flex flex-col items-center">
      <section
        className="m-16 pt-24 pl-20 w-full max-w-screen-lg"
        style={{
          height: '400px',
          backgroundColor: '#B4E3BF',
          clipPath:
            'polygon(80px 0, 100% 0, 100% calc(100% - 80px), calc(100% - 80px) 100%, 0 100%, 0 80px)',
        }}
      >
        <div className="font-neoBold text-2xl md:text-3xl lg:text-4xl space-y-2 text-white">
          <p>지금 참여하고</p>
          <p>자기계발의</p>
          <p>기회를 누리세요!</p>
        </div>
        <Button className="mt-16 bg-slate-100 hover:bg-slate-200 text-black font-neo">
          참여중인 모임/동아리 목록 가기
        </Button>
      </section>

      <p className="text-grey-900 text-3xl py-10">관심 카테고리의 모동</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.map((item) => (
          <GroupCard
            key={item.id}
            id={item.id}
            type={item.type}
            imageUrl={item.images[0]?.url || ''}
            name={item.name}
            introduction={item.introduction}
            date={item.date}
            location={item.place.name}
            participantsNumber={item.participantsNumber}
            participantLimit={item.participantLimit}
            category={item.category}
          />
        ))}
      </div>

      <div
        className="mt-16 relative w-full pt-4 max-w-screen-lg flex flex-col"
        style={{ height: '650px' }}
      >
        <img
          src={BottomImg}
          alt="Background"
          className="absolute inset-0 h-full object-cover"
        />
        <div className="pl-6 pr-6 flex py-10 items-center justify-between">
          <p className="text-grey-900 pl-16 text-2xl md:text-3xl lg:text-4xl relative z-30">
            방금 개설된 모동이에요
          </p>
          <div className="font-neoExtraBold text-sm hidden md:flex lg:flex space-x-4 text-primary items-center">
            <Link
              to="/"
              className="z-30 hover:text-green-500 hover:underline  flex items-center"
            >
              <span>모두 보러 가기</span>
              <MoveRight className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-2 z-30 overflow-y-auto">
          {data.map((item) => (
            <ModongCard
              clubTypes={[]}
              meetingTypes={[]}
              imageUrl={''}
              description={''}
              createdAt={''}
              memberCount={0}
              memberLimit={0}
              key={item.id}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
