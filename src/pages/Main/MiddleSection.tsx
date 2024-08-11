import { Api, ClubBoardResponseDto } from '@/api/Apis';
import axiosInstance from '@/api/axiosConfig';
import GroupCard from '@/components/GroupCard';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';
import { Result } from '@/types/Search';
import { MoveRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomImg from './BottomBG.png';
import NewCard from './NewCard';

const apiInstance = new Api();

const MiddleSection: React.FC = () => {
  const [data, setData] = useState<Result[]>([]);
  const [clubs, setClubs] = useState<ClubBoardResponseDto[]>([]);

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
        setData(response.data.results || []); // 빈 배열을 기본값으로 설정
      } catch (error) {
        console.error('Failed to fetch meetings:', error);
        setData([]); // 오류 발생 시에도 빈 배열로 설정
      }
    };

    fetchMeetings();
  }, []);

  console.log(data);
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await apiInstance.api.findByType();

        // 응답 데이터의 results 속성을 확인하고 빈 배열을 기본값으로 설정
        setClubs(response.results || []);
      } catch (error) {
        console.error('Failed to fetch clubs:', error);
        setClubs([]); // 오류 발생 시 빈 배열로 설정
      }
    };

    fetchClubs(); // 함수 호출
  }, []);

  const { interests } = useUserStore();
  // 관심사와 매핑되는 카테고리 객체
  const categoryMap: { [key: string]: string } = {
    STUDY: '스터디',
    SOCIAL: '사교/취미',
    SPORTS: '운동',
  };

  // 관심사에 맞는 카테고리 추가
  const transformedInterests = interests.reduce<string[]>(
    (acc, interest) => {
      if (categoryMap[interest]) {
        acc.push(categoryMap[interest]);
      }
      return acc;
    },
    [...interests],
  );

  // 관심사와 일치하는 모임 필터링
  const filteredData = data
    .filter(
      (item) => item.category && transformedInterests.includes(item.category),
    )
    .slice(0, 5); // 최대 5개 항목 선택

  // 관심사와 일치하는 동아리 필터링
  const filteredClubs = clubs
    .filter(
      (item) => item.category && transformedInterests.includes(item.category),
    )
    .slice(0, 5); // 최대 5개 항목 선택

  // 데이터를 createdAt을 기준으로 정렬하는 함수
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortByCreatedAt = (items: any[]) => {
    return items.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  // 정렬된 데이터와 클럽
  const sortedData = sortByCreatedAt(data).slice(0, 5); // 최대 5개
  const sortedClubs = sortByCreatedAt(clubs).slice(0, 5); // 최대 5개

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
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <GroupCard key={item.id} data={item} />
          ))
        ) : (
          <p>모임: 마이페이지에서 관심 카테고리를 설정해주세요</p>
        )}
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <GroupCard key={item.id} data={item} />
          )))
         : (
          <p>동아리: 마이페이지에서 관심 카테고리를 설정해주세요</p>
        )}
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
          {sortedData.length > 0 ? (
            sortedData.map((item) => (
              <NewCard
                key={item.id}
                id={item.id}
                type={item.type}
                imageUrl={item.images[0]?.url || ''}
                name={item.name}
                introduction={item.introduction}
                date={item.date}
                createdAt={''}
                location={item.place.name}
                participantsNumber={item.participantsNumber}
                participantLimit={item.participantLimit}
                category={item.category}
              />
            ))
          ) : (
            <p>모임 데이터를 불러올 수 없습니다.</p>
          )}
          {sortedClubs.length > 0 ? (
            sortedClubs.map((item) => {
              // category 변환 함수
              const getCategory = (category: string | undefined): string => {
                switch (category) {
                  case 'SPORTS':
                    return '운동';
                  case 'SOCIAL':
                    return '사교/취미';
                  case 'STUDY':
                    return '스터디';
                  default:
                    return '';
                }
              };

              return (
                <NewCard
                  key={item.id}
                  id={item.id ?? 0}
                  type={item.type ?? ''}
                  imageUrl={item.images?.[0]?.url ?? ''}
                  name={item.name ?? ''}
                  introduction={item.introduction ?? ''}
                  date={item.date ?? ''}
                  location={item.activityRegion ?? ''}
                  participantsNumber={item.participantNumber ?? 0}
                  participantLimit={item.participantLimit ?? 0}
                  category={getCategory(item.category) ?? ''}
                  createdAt={item.createdAt ?? ''}
                />
              );
            })
          ) : (
            <p>동아리 데이터를 불러올 수 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
