import locationImg from '@/assets/icons/location.svg';
import peopleImg from '@/assets/icons/people.png';
import React from 'react';

interface GroupCardProps {
  clubTypes: string[];
  meetingTypes: string[];
  imageSrc: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  participants: string;
}

const GroupCard: React.FC<GroupCardProps> = ({
  clubTypes,
  meetingTypes,
  imageSrc,
  title,
  subtitle,
  date,
  location,
  participants,
}) => {
  const participantRatio =
    parseInt(participants.split('/')[0].replace('(', '')) /
    parseInt(participants.split('/')[1].replace(')', ''));
  const isAlmostFull = participantRatio >= 0.8;

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
    <div className="flex mx-auto mb-1 items-center border border-gray-200 rounded-lg p-4 shadow-md w-[400px] h-[160px]">
      <div className="w-[140px] h-[135px]">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <div className="ml-6 flex flex-col justify-between w-[60%]">
        <div>
          <div className="flex items-center space-x-2 mb-2">
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
          <h2 className="text-base font-neoBold mb-1">{title}</h2>
          <p className="text-gray-500 text-[12px]">{subtitle}</p>
        </div>
        <div className="text-gray-500 font-neoBold text-[12px] mt-1">
          <p>{date}</p>
          <div className="flex mt-1 items-center">
            <img
              src={locationImg}
              alt="Location Icon"
              className="w-[13px] h-[13px] mr-1"
            />
            <p className="mr-4">{location}</p>
            <img src={peopleImg} alt="People Icon" className="w-4 h-4 mr-1" />
            <p>{participants}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
