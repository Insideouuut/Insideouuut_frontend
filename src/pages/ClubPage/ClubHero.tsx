import { Button } from '@/components/ui/button';
import { ClubData } from '@/types/Clubs';
import { Result } from '@/types/Meetings';
import {
  CalendarDays,
  ClipboardList,
  Eye,
  Heart,
  MapPin,
  MessageCircleMore,
  Users,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface ClubHeroProps {
  data: Result | ClubData;
  userProfile: { nickname: string; profileImage: string } | null;
  userAuthority: string;
  type: 'club' | 'meeting'; // 타입을 명시적으로 정의
}

const ClubHero: React.FC<ClubHeroProps> = ({
  data,
  userProfile,
  userAuthority,
  type, // 타입을 받아옴
}) => {
  const isMeeting = (data: Result | ClubData): data is Result => {
    return (data as Result).participantsNumber !== undefined;
  };

  const translateCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'sports':
        return '운동';
      case 'social':
        return '사교/취미';
      case 'study':
        return '스터디';
      default:
        return category;
    }
  };

  const getColorByType = (type: string) => {
    switch (type) {
      case '동아리':
        return 'bg-green-200 text-green-800';
      case '모임':
        return 'bg-gray-200 text-gray-800';
      default:
        return '';
    }
  };

  const getColorByCategory = (category: string) => {
    const translatedCategory = translateCategory(category);
    switch (translatedCategory) {
      case '사교/취미':
        return 'bg-yellow-200 text-yellow-800';
      case '운동':
        return 'bg-blue-200 text-blue-800';
      case '스터디':
        return 'bg-purple-200 text-purple-800';
      default:
        return '';
    }
  };

  return (
    <section className="relative w-full h-72 py-8 px-4 flex justify-center text-left bg-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75"
        style={{
          backgroundImage: `url(${data.images[0]?.url})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="relative flex items-center mx-auto w-[920px] justify-between z-10">
        <div className="flex flex-col h-[55%]">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`flex items-center justify-center h-5 px-3 py-[1.5px] rounded-lg font-neoBold text-[11px] ${getColorByType(
                data.type,
              )}`}
            >
              {data.type}
            </span>
            <span
              className={`flex items-center justify-center h-5 px-3 py-[1.5px] rounded-lg font-neoBold text-[11px] ${getColorByCategory(
                data.category,
              )}`}
            >
              {translateCategory(data.category)}
            </span>
          </div>

          <h1
            className="text-[30px] font-neoExtraBold text-black mb-3"
            style={{
              textShadow: '2px 2px 0px #FFF, 0 0 5px #FFF, 0 0 5px #FFF',
            }}
          >
            {data.name}
          </h1>

          <p
            className="text-[17px] text-black font-neoBold mt-2"
            style={{
              textShadow: '1px 1px 0px #FFF, 0 0 3px #FFF, 0 0 3px #FFF',
            }}
          >
            {data.introduction}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <Eye className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{data.view}</span>
            <Heart className="w-4 h-4 text-red-600" />
            <span className="text-sm text-gray-600">{data.like}</span>
          </div>
        </div>
        <div className="relative flex flex-col items-end w-[30%] mt-12">
          <div className="flex w-28 flex-col gap-y-[2px]">
            <div className="flex bg-white bg-opacity-80 justify-between px-2 py-[2px] text-[12px] font-neoBold rounded-md items-center">
              <CalendarDays className="w-[17px]" />
              <span className="w-[80%] text-center text-[11px]">
                {isMeeting(data)
                  ? new Date(data.date).toLocaleString(undefined, {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                    })
                  : data.date}
              </span>
            </div>
            <div className="flex bg-white bg-opacity-80 justify-between px-2 py-[2px] text-[12px] font-neoBold rounded-md items-center">
              <MapPin className="w-[17px]" />
              <span className="w-[80%] text-center">
                {isMeeting(data) ? data.place.name : data.activityRegion}
              </span>
            </div>
            <div className="flex bg-white bg-opacity-80 justify-between px-2 py-[2px] text-sm font-neoBold rounded-md items-center">
              <Users className="w-[17px]" />
              <span className="w-[80%] text-center">{`${isMeeting(data) ? data.participantsNumber : data.participantNumber} / ${data.participantLimit}`}</span>
            </div>
          </div>
          {userAuthority === '호스트' || userAuthority === '멤버' ? (
            <div className="flex w-[195px] h-[90px] rounded-lg bg-white bg-opacity-80 items-center mt-4">
              <img
                src={
                  userProfile?.profileImage ||
                  'https://w7.pngwing.com/pngs/665/132/png-transparent-user-defult-avatar.png'
                }
                alt="Profile"
                className="w-10 h-10 object-cover rounded-full ml-4"
              />
              <div className="w-full">
                <div className="flex justify-center w-full">
                  <p className="text-black font-neo flex items-end">
                    {userProfile?.nickname || 'Unknown'}
                  </p>
                </div>
                <div className="flex justify-center mt-2">
                  <button className="w-6 h-6 p-[2px] text-white font-neo flex items-center justify-center bg-gray-500 rounded-md hover:bg-opacity-70">
                    <ClipboardList />
                  </button>
                  <button className="w-6 h-6 p-[2px] text-white font-neo flex items-center justify-center bg-gray-500 rounded-md ml-[10px] hover:bg-opacity-70">
                    <MessageCircleMore />
                  </button>
                  <button className="w-6 h-6 p-[2px] text-white font-neo flex items-center justify-center bg-gray-500 rounded-md ml-[10px] hover:bg-opacity-70">
                    <Users />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to={`/groupjoin/${data.id}?type=${type}`}>
              <Button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                가입하기
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClubHero;
