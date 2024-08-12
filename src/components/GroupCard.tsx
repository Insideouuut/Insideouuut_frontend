import { ClubResult, MeetingResult } from '@/types/Search';
import {
  getColorByMeetingType,
  getColorByType,
  getDefaultImageByCategory,
  getLinkByType,
} from '@/utils/cardUtils';
import { MapPin, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

type GroupCardProps = {
  data: ClubResult | MeetingResult;
};

const typeMap: Record<string, string> = {
  club: '동아리',
  meeting: '모임',
  동아리: '동아리',
  모임: '모임',
};

const categoryMap: Record<string, string> = {
  sports: '운동',
  social: '사교/취미',
  study: '스터디',
  운동: '운동',
  '사교/취미': '사교/취미',
  스터디: '스터디',
};

const GroupCard: React.FC<GroupCardProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const { id, type, images, name, introduction, date, category } = data;

  const isClub = type === '동아리';
  const isMeeting = type === '모임';

  const displayLocation = isClub
    ? (data as ClubResult).activityRegion
    : (data as MeetingResult).place.name;
  const participantsNumber = isMeeting
    ? (data as MeetingResult).participantsNumber
    : (data as ClubResult).participantNumber;
  const participantLimit = isMeeting
    ? (data as MeetingResult).participantLimit
    : (data as ClubResult).participantLimit;

  const displayParticipants =
    participantsNumber !== undefined && participantLimit !== undefined
      ? `${participantsNumber} / ${participantLimit}`
      : '';

  const isAlmostFull =
    participantsNumber !== undefined && participantLimit !== undefined
      ? participantsNumber / participantLimit >= 0.8
      : false;

  const mainImage =
    images.length > 0 ? images[0].url : getDefaultImageByCategory(category);

  const translateType = (type: string) => typeMap[type.toLowerCase()] || type;

  const translateCategory = (category: string) =>
    categoryMap[category.toLowerCase()] || category;

  const translatedType = translateType(type);
  const translatedCategory = translateCategory(category);

  const linkTo = `/${getLinkByType(translatedType)}/${id}`;

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
              className={`flex px-2 py-[1.5px] rounded-lg text-[10.2px] ${getColorByType(translatedType)}`}
            >
              {translatedType}
            </span>
            <span
              className={`flex px-2 py-[1.5px] rounded-lg text-[10.2px] ${getColorByMeetingType(translatedCategory)}`}
            >
              {translatedCategory}
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
            {introduction && introduction.length > 20
              ? `${introduction.slice(0, 20)}...`
              : introduction}
          </p>
        </div>
        <div className="text-gray-500 font-neoBold text-[12px] mt-1">
          <p>{date}</p>
          <div className="flex mt-1 items-center">
            <MapPin className="w-4 mr-1" />
            <p className="mr-4">
              {displayLocation.length > 10
                ? `${displayLocation.slice(0, 10)}...`
                : displayLocation}
            </p>
            {displayParticipants && (
              <>
                <Users className="w-4 mr-1" />
                <p>{displayParticipants}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
