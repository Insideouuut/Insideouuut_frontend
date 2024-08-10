// src/components/GroupCard.tsx

import {
  getColorByMeetingType,
  getColorByType,
  getDefaultImageByCategory,
  getLinkByType,
} from '@/utils/cardUtils';
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
  name = '',
  introduction = '',
  date,
  location = '',
  participantsNumber,
  participantLimit,
  category,
}) => {
  const isAlmostFull = participantsNumber / participantLimit >= 0.8;
  const mainImage = imageUrl ? imageUrl : getDefaultImageByCategory(category);

  // type에 따라 링크를 다르게 설정
  const linkTo = `/${getLinkByType(type)}/${id}`;

  return (
    <Link
      to={linkTo}
      className="flex mx-auto mb-1 items-center bg-white border border-gray-200 rounded-lg p-4 shadow-md w-[400px] h-[170px] hover:scale-[103%] hover:duration-300 hover:cursor-pointer"
    >
      <div className="w-[140px] h-[135px]">
        <img
          src={mainImage}
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
          <h2 className="text-base font-neoBold mb-1">
            {name.length > 18 ? `${name.slice(0, 18)}...` : name}
          </h2>
          <p className="text-gray-500 text-[12px]">
            {introduction.length > 20
              ? `${introduction.slice(0, 20)}...`
              : introduction}
          </p>
        </div>
        <div className="text-gray-500 font-neoBold text-[12px] mt-1">
          <p>{date}</p>
          <div className="flex mt-1 items-center">
            <MapPin className="w-4 mr-1" />
            <p className="mr-4">
              {location.length > 10 ? `${location.slice(0, 10)}...` : location}
            </p>
            <Users className="w-4 mr-1" />
            <p>{`${participantsNumber}/${participantLimit}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
