import { MapPin, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface GroupCardProps {
  id: number;
  type: string;
  imageUrl: string;
  name: string;
  introduction: string;
  date: string;
  location: string;
  participantsNumber: number;
  participantLimit: number;
  category: string;
}

const NewCard: React.FC<GroupCardProps> = ({
  id,
  type,
  imageUrl,
  name,
  introduction,
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

  const getDefaultImageByCategory = (category: string) => {
    switch (category) {
      case '사교/취미':
        return 'https://img.freepik.com/free-vector/hand-drawn-business-communication-concept_52683-76159.jpg?t=st=1723291187~exp=1723294787~hmac=33c5cd0b2c2ec164cb7dc4791b373c547b7b01ebcdcf8b2c88f6fbb7cd5ab7fd&w=996';
      case '운동':
        return 'https://img.freepik.com/free-vector/stretching-exercises-concept-illustration_114360-8922.jpg?t=st=1723291153~exp=1723294753~hmac=d3e3f118211a6b5fbe716604a75bd97539e3f34d54ef8847231ce3dd8a25dc2c&w=996';
      case '스터디':
        return 'https://img.freepik.com/free-vector/student-with-laptop-studying-online-course_74855-5293.jpg?t=st=1723291128~exp=1723294728~hmac=091e3ed23dadbc1bc1ddf3d1f8fd72a4d81a794afc6cb014bde7ac71ce9bfcab&w=996';
      default:
        return '';
    }
  };

  const mainImage = imageUrl ? imageUrl : getDefaultImageByCategory(category);

  return (
    <Link
      to={`/${type}/${id}`}
      className="flex mx-auto mb-1 items-center bg-white border border-gray-200 rounded-lg p-4 shadow-md w-[360px] h-[160px] hover:scale-[103%] hover:duration-300 hover:cursor-pointer"
    >
      <div className="w-[100px] h-[100px]">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="ml-6 flex flex-col justify-between w-[60%]">
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
          {isAlmostFull && (
            <span className="flex items-center justify-center px-2 py-[1.5px] rounded-lg text-[10.2px] bg-red-200 text-red-800">
              마감임박
            </span>
          )}
        </div>
        <div className="flex mt-1 items-center text-gray-500 font-neoBold text-[12px]">
          <MapPin className="w-4 mr-1" />
          <p className="mr-4">{location}</p>
          <Users className="w-4 mr-1" />
          <p>{`${participantsNumber}/${participantLimit}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewCard;
