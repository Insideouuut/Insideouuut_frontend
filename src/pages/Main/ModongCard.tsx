import React from 'react';

interface ModongCardProps {
  clubTypes: string[];
  meetingTypes: string[];
  imageUrl: string;
  title: string;
  description: string;
  createdAt: string;
  members: {
    current: number;
    total: number;
  };
}

const ModongCard: React.FC<ModongCardProps> = ({
  clubTypes,
  meetingTypes,
  imageUrl,
  title,
  description,
  createdAt,
  members,
}) => {
  const isAlmostFull = members.current / members.total >= 0.8;

  const getColorByClubType = (type: string) => {
    switch (type) {
      case '동아리':
        return 'bg-green-200 text-green-800';
      case '모임':
        return 'bg-gray-200 text-gray-800';
      default:
        return '';
    }
  };

  const getColorByMeetingType = (type: string) => {
    switch (type) {
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
    <div className="flex mx-auto mb-1 items-center border  bg-white  p-4  w-[450px] h-[150px]">
      <div className="w-[100px] h-[100px] ">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full rounded-full object-cover "
        />
      </div>
      <div className="ml-6 flex flex-col justify-between w-[60%]">
        <div>
          <h2 className="text-base font-neoBold mb-1">{title}</h2>
          <p className="text-gray-500 text-[12px]">{description}</p>
        </div>

        <div className="flex items-center space-x-2 mb-2 mt-4">
          {clubTypes.map((tag, index) => (
            <span
              key={index}
              className={`flex items-center justify-center px-2 py-[1.5px] rounded-lg text-[10.2px] ${getColorByClubType(tag)}`}
            >
              {tag}
            </span>
          ))}
          {meetingTypes.map((tag, index) => (
            <span
              key={index}
              className={`flex items-center justify-center px-2 py-[1.5px] rounded-lg text-[10.2px] ${getColorByMeetingType(tag)}`}
            >
              {tag}
            </span>
          ))}
          {isAlmostFull && (
            <span className="flex items-center justify-center px-2 py-[1.5px] rounded-lg text-[10.2px] bg-red-200 text-red-800">
              마감임박
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModongCard;
