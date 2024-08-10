import { MapPin, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface GroupCardProps {
  id: number;
  type: string;
  imageUrl: string;
  name: string;
  introduction: string | undefined;
  date: string;
  location: string;
  participantsNumber: number;
  participantLimit: number;
  category: string;
}

const GroupCard: React.FC<GroupCardProps> = ({
  id,
  type,
  imageUrl,
  name,
  introduction = '', // 기본값을 빈 문자열로 설정
  date,
  location,
  participantsNumber,
  participantLimit,
  category,
}) => {
  const isAlmostFull = participantsNumber / participantLimit >= 0.8;

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

  const getColorByMeetingType = (category: string) => {
    switch (category) {
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
    <Link
      to={`/club/${id}`}
      className="flex mx-auto mb-1 items-center bg-white border border-gray-200 rounded-lg p-4 shadow-md w-[360px] h-[160px] hover:scale-[103%] hover:duration-300 hover:cursor-pointer"
    >
      <div className="w-[140px] h-[135px]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <div className="ml-6 flex flex-col justify-between w-[60%]">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`flex px-2 py-[1.5px] rounded-lg text-[10.2px] ${getColorByType(type)}`}
            >
              {type}
            </span>
            <span
              className={`flex px-2 py-[1.5px] rounded-lg text-[10.2px] ${getColorByMeetingType(category)}`}
            >
              {category}
            </span>
            {isAlmostFull && (
              <span className="flex items-center justify-center h-5 px-2 py-[1.5px] rounded-lg text-[10.2px] bg-red-200 text-red-800">
                마감임박
              </span>
            )}
          </div>
          <h2 className="text-base font-neoBold mb-1">{name}</h2>
          <p className="text-gray-500 text-[12px]">
            {introduction.length > 10
              ? `${introduction.slice(0, 10)}...`
              : introduction}
          </p>
        </div>
        <div className="text-gray-500 font-neoBold text-[12px] mt-1">
          <p>{date}</p>
          <div className="flex mt-1 items-center">
            <MapPin className="w-4 mr-1" />
            <p className="mr-4">{location}</p>
            <Users className="w-4 mr-1" />
            <p>{`${participantsNumber}/${participantLimit}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
