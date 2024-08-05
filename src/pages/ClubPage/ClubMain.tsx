import React, { useState } from 'react';
import ApplyModal from './ApplyModal';
import joggingData, { Info } from './joggingdata';

interface ClubInfo {
  clubTypes: string[];
  meetingTypes: string[];
  imageUrl: string;
  name: string;
  description: string;
  date: string;
  location: string;
  memberCount: number;
  memberLimit: number;
}

interface ClubMainProps {
  clubData: ClubInfo;
}

const ClubMain: React.FC<ClubMainProps> = ({ clubData }) => {
  const [selectedMeeting, setSelectedMeeting] = useState<Info | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMeetingClick = (meeting: Info) => {
    setSelectedMeeting(meeting);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeeting(null);
  };

  const truncateDescription = (description: string) => {
    return description.length > 10
      ? `${description.slice(0, 10)}...`
      : description;
  };

  const isClub = clubData.clubTypes.includes('동아리');
  const isMeeting = clubData.clubTypes.includes('모임');

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <div className="">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="w-full md:w-[50%]">
              <h2 className="text-2xl font-bold text-gray-900">
                {clubData.name}
              </h2>
              <p className="text-md text-gray-700 mt-2">
                {clubData.description}
              </p>
            </div>
            <div className="w-full md:w-[50%] mt-4 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-800">모임 시간</h3>
              <p className="text-md text-gray-700 mt-2">{clubData.date}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="w-full md:w-[50%] mt-4 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-800">위치</h3>
              <p className="text-md text-gray-700 mt-2">{clubData.location}</p>
            </div>
            <div className="w-full md:w-[50%] mt-4 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-800">
                참가자 정원
              </h3>
              <p className="text-md text-gray-700 mt-2">
                현재 참가자 수: {clubData.memberCount} / {clubData.memberLimit}
              </p>
            </div>
          </div>
          {isClub && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                최근 생성된 모임 목록
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-3 px-5 border-b">제목</th>
                      <th className="py-3 px-5 border-b">설명</th>
                      <th className="py-3 px-5 border-b">장소</th>
                      <th className="py-3 px-5 border-b">인원</th>
                      <th className="py-3 px-5 border-b">일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    {joggingData.slice(0, 5).map((meeting, index) => (
                      <tr
                        key={index}
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => handleMeetingClick(meeting)}
                      >
                        <td className="py-3 px-5 text-sm border-b text-gray-800">
                          {meeting.title}
                        </td>
                        <td className="py-3 px-5 text-sm border-b text-gray-600">
                          {truncateDescription(meeting.description)}
                        </td>
                        <td className="py-3 px-5 text-sm border-b text-gray-500">
                          {meeting.location}
                        </td>
                        <td className="py-3 px-5  text-sm border-b text-gray-500">
                          {meeting.currentMembers}/{meeting.memberLimit}
                        </td>
                        <td className="py-3 px-5 border-b text-gray-500">
                          {meeting.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {isMeeting && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                모임 규칙
              </h3>
              <p className="text-md text-gray-700 mt-2">
                1. 시간 엄수: 늦지 않게 참석해주세요.<br />
                2. 준비물: 개인 물품을 지참해주세요.<br />
                3. 참여도: 적극적으로 활동에 참여해주세요.<br />
                4. 예의: 다른 회원들을 존중해주세요.
              </p>
            </div>
          )}
        </div>
        {isModalOpen && selectedMeeting && (
          <ApplyModal meeting={selectedMeeting} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default ClubMain;
