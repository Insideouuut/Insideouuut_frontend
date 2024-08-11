// src/components/NewCard.tsx

import {
  getColorByLevel,
  getColorByMeetingType,
  getColorByType,
  getDefaultImageByCategory,
  getLevel,
  getLinkByType,
} from '@/utils/cardUtils';
import { formatClubTime, formatEventTime } from '@/utils/timeUtils';
import { MapPin, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface NewCardProps {
  id: number;
  type: string;
  imageUrl: string;
  name: string;
  introduction: string;
  level: string;
  date: string;
  location: string;
  participantsNumber: number;
  createdAt: string;
  participantLimit: number;
  category: string;
}

const NewCard: React.FC<NewCardProps> = ({
  id,
  type,
  imageUrl,
  name,
  level,
  date,
  introduction,
  location,
  createdAt,
  participantsNumber,
  participantLimit,
  category,
}) => {
  const isAlmostFull = participantsNumber / participantLimit >= 0.8;

  const timeDisplay =
    type === '동아리' ? formatClubTime(createdAt) : formatEventTime(date);

  const mainImage = imageUrl ? imageUrl : getDefaultImageByCategory(category);

  const levelInKorean = getLevel(level);
  return (
    <Link
      to={`/${getLinkByType(type)}/${id}`}
      className="flex mx-auto mb-1 items-center bg-white border border-gray-200 rounded-lg p-4 shadow-md w-[430px] h-[160px] hover:scale-[103%] hover:duration-300 hover:cursor-pointer"
    >
      <div className="w-[100px] h-[100px]">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="ml-6 flex flex-col justify-between w-[70%]">
        <div>
          <h2 className="text-base font-neoBold mb-1">{name}</h2>
          <p className="text-gray-500 text-[12px]">
            {introduction.length > 10
              ? `${introduction.slice(0, 40)}...`
              : introduction}
          </p>
        </div>
        <div className="flex items-center space-x-2 mb-2 mt-4">
          <span
            className={`flex items-center justify-center px-2 py-[1.5px] rounded-lg text-[10.2px] ${getColorByType(type)}`}
          >
            {type}
          </span>
          <span
            className={`flex items-center justify-center px-2 py-[1.5px] rounded-lg text-[10.2px] ${getColorByMeetingType(category)}`}
          >
            {category}
          </span>
          {category === '운동' && (
            <span
              className={`flex items-center justify-center px-2 py-[1.5px] rounded-lg text-[10.2px] ${getColorByLevel(levelInKorean)}`}
            >
              {levelInKorean}
            </span>
          )}
          {isAlmostFull && (
            <span className="flex items-center justify-center px-2 py-[1.5px] rounded-lg text-[10.2px] bg-red-200 text-red-800">
              마감임박
            </span>
          )}
        </div>
        <div className="flex mt-1 items-center w-full text-gray-500 font-neoBold text-[12px]">
          <MapPin className="w-4 mr-1" />
          <p className="mr-4">
            {location.length > 10 ? `${location.slice(0, 10)}...` : location}
          </p>
          <Users className="w-4 mr-1" />
          <p className="mr-2">{`${participantsNumber}/${participantLimit}`}</p>
          <p className="text-gray-600">{timeDisplay}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewCard;
