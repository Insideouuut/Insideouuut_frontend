import { Button } from '@/components/ui/button';
import { ClubData } from '@/types/Clubs';
import { Result } from '@/types/Meetings';
import {
  getColorByMeetingType,
  getColorByType,
  getDefaultImageByCategory,
} from '@/utils/cardUtils'; // 리팩토링
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
  clubData: Result | ClubData;
  userProfile: { nickname: string; profileImage: string } | null;
  userAuthority: string;
}

const ClubHero: React.FC<ClubHeroProps> = ({
  clubData,
  userProfile,
  userAuthority,
}) => {
  const isMeeting = (data: Result | ClubData): data is Result => {
    return (data as Result).participantsNumber !== undefined;
  };

  return (
    <section className="relative w-full h-72 py-8 px-4 flex justify-center text-left bg-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75"
        style={{
          backgroundImage: `url(${clubData.images[0]?.url || getDefaultImageByCategory(clubData.category)})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="relative flex items-center mx-auto w-[920px] justify-between z-10">
        <div className="flex flex-col h-[55%]">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`flex items-center justify-center h-5 px-3 py-[1.5px] rounded-lg font-neoBold text-[11px] ${getColorByType(
                clubData.type,
              )}`}
            >
              {clubData.type}
            </span>
            <span
              className={`flex items-center justify-center h-5 px-3 py-[1.5px] rounded-lg font-neoBold text-[11px] ${getColorByMeetingType(
                clubData.category,
              )}`}
            >
              {clubData.category}
            </span>
          </div>
          <h1 className="text-[30px] font-neoExtraBold text-black mb-3">
            {clubData.name}
          </h1>
          <p className="text-[17px] text-black font-neoBold mt-2">
            {clubData.introduction}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <Eye className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{clubData.view}</span>
            <Heart className="w-4 h-4 text-red-600" />
            <span className="text-sm text-gray-600">{clubData.like}</span>
          </div>
        </div>
        <div className="relative flex flex-col items-end w-[30%] mt-12">
          {isMeeting(clubData) ? (
            <div className="flex w-28 flex-col gap-y-[2px]">
              <div className="flex bg-black bg-opacity-10 justify-between px-2 py-[2px] text-[12px] font-neoBold rounded-md items-center">
                <CalendarDays className="w-[17px]" />
                <span className="w-[80%] text-center text-[11px]">
                  {new Date(clubData.date).toLocaleString(undefined, {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </span>
              </div>
              <div className="flex bg-black bg-opacity-10 justify-between px-2 py-[2px] text-[12px] font-neoBold rounded-md items-center">
                <MapPin className="w-[17px]" />
                <span className="w-[80%] text-center">
                  {clubData.place.name}
                </span>
              </div>
              <div className="flex bg-black bg-opacity-10 justify-between px-2 py-[2px] text-sm font-neoBold rounded-md items-center">
                <Users className="w-[17px]" />
                <span className="w-[80%] text-center">{`${clubData.participantsNumber} / ${clubData.participantLimit}`}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 text-gray-600" />
                <span className="text-md text-gray-600 ml-2">
                  {clubData.date}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-md text-gray-600 ml-2">
                  {clubData.activityRegion}
                </span>
              </div>
            </div>
          )}
          {userAuthority === '호스트' || userAuthority === '멤버' ? (
            <div className="flex w-[195px] h-[90px] rounded-lg bg-gray-100  items-center mt-4">
              <img
                src={userProfile?.profileImage || ''}
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
            <Link to={`/groupjoin/${clubData.id}`}>
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
