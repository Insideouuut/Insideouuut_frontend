import React, { useState } from 'react';
import { dummyData } from '@/components/dummyData';
import ApplyModal from './ApplyModal'; // 신청 모달 컴포넌트 가져오기

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
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedMeetings = dummyData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleMeetingClick = (meeting: any) => {
    setSelectedMeeting(meeting);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeeting(null);
  };

  const noticeData = [
    {
      title: '공지사항 1',
      description: '첫 번째 공지사항입니다.',
      date: '2024-07-22',
    },
    {
      title: '공지사항 2',
      description: '두 번째 공지사항입니다.',
      date: '2024-07-21',
    },
  ];

  return (
    <div className="border-2 rounded-lg min-h-screen">
      <div className="mx-auto bg-white p-6 rounded-lg shadow-md space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="w-full md:w-[50%]">
              <h2 className="text-2xl font-bold text-gray-900">{clubData.name}</h2>
              <p className="text-md text-gray-700 mt-2">{clubData.description}</p>
            </div>
            <div className="w-full md:w-[50%] mt-4 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-800">모임 시간</h3>
              <p className="text-md text-gray-700 mt-2">{clubData.meetingTimes}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="w-full md:w-[50%] mt-4 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-800">위치</h3>
              <p className="text-md text-gray-700 mt-2">{clubData.location}</p>
            </div>
            <div className="w-full md:w-[50%] mt-4 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-800">참가자 정원</h3>
              <p className="text-md text-gray-700 mt-2">
                현재 참가자 수: {clubData.currentParticipants} / {clubData.maxParticipants}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">공지사항</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-5 border-b">제목</th>
                  <th className="py-3 px-5 border-b">설명</th>
                  <th className="py-3 px-5 border-b">일시</th>
                </tr>
              </thead>
              <tbody>
                {noticeData.map((notice, index) => (
                  <tr key={index} className="cursor-pointer hover:bg-gray-100">
                    <td className="py-3 px-5 border-b text-gray-800">{notice.title}</td>
                    <td className="py-3 px-5 border-b text-gray-600">{notice.description}</td>
                    <td className="py-3 px-5 border-b text-gray-500">{notice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">최근 생성된 모임 목록</h3>
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
                {sortedMeetings.slice(0, 4).map((meeting, index) => (
                  <tr key={index} className="cursor-pointer hover:bg-gray-100" onClick={() => handleMeetingClick(meeting)}>
                    <td className="py-3 px-5 border-b text-gray-800">{meeting.title}</td>
                    <td className="py-3 px-5 border-b text-gray-600">{meeting.description}</td>
                    <td className="py-3 px-5 border-b text-gray-500">{meeting.location}</td>
                    <td className="py-3 px-5 border-b text-gray-500">
                      {meeting.members.current}/{meeting.members.total}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-500">{meeting.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isModalOpen && selectedMeeting && (
          <ApplyModal meeting={selectedMeeting} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default ClubMain;
