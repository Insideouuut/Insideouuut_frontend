import GroupCard from '@/components/GroupCard';
import { dummyData } from '@/components/dummyData'; // dummyData를 가져오는 경로를 맞게 설정하세요
import React from 'react';

interface ClubInfo {
  name: string;
  description: string;
  meetingTimes: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  contact: string;
}

interface ClubMainProps {
  clubData: ClubInfo;
}

const ClubMain: React.FC<ClubMainProps> = ({ clubData }) => {
  return (
    <div className="flex p-6 bg-gray-50 rounded-lg shadow-md w-[820px] border-2 border-gray-200 space-x-6">
      <div className="w-[40%] p-4 bg-white rounded-lg shadow space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{clubData.name}</h2>
          <p className="text-sm text-gray-600 mt-2">{clubData.description}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">모임 시간</h3>
          <p className="text-sm text-gray-600 mt-2">{clubData.meetingTimes}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">위치</h3>
          <p className="text-sm text-gray-600 mt-2">{clubData.location}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">참가자 정원</h3>
          <p className="text-sm text-gray-600 mt-2">
            현재 참가자 수: {clubData.currentParticipants} /{' '}
            {clubData.maxParticipants}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">문의</h3>
          <p className="text-sm text-gray-600 mt-2">{clubData.contact}</p>
        </div>
      </div>
      <div className="w-[60%] p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          최근 생성된 모임 목록
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {dummyData.map((meeting) => (
            <GroupCard key={meeting.id} {...meeting} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubMain;
