import { getClubMeetings } from '@/api/clubApi'; // API 호출 함수 임포트
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApplyModal from './ApplyModal';

interface HostInfo {
  id: number;
  nickname: string;
  profileImage: {
    name: string;
    url: string;
  };
}

interface PlaceInfo {
  name: string;
  placeUrl: string;
  kakaoMapId: string;
  addressName: string | null;
  roadAddressName: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface MeetingInfo {
  id: number;
  type: string;
  name: string;
  introduction: string;
  chatRoomId: number;
  view: number;
  like: number;
  hasMembershipFee: boolean;
  membershipFeeAmount: number;
  progress: string;
  level: string;
  categoryDetail: string;
  category: string;
  date: string;
  participantsNumber: number;
  participantLimit: number;
  ratio: string;
  ageRange: [number, number];
  rules: string[];
  joinQuestions: string[];
  host: HostInfo;
  place: PlaceInfo;
  images: { name: string; url: string }[];
}

const MeetingList: React.FC = () => {
  const [meetings, setMeetings] = useState<MeetingInfo[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingInfo | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const { id: clubId } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchMeetings = async () => {
      if (!clubId) {
        setError('클럽 ID를 찾을 수 없습니다.');
        return;
      }

      try {
        const token = localStorage.getItem('accessToken') || '';
        const meetingsData = await getClubMeetings(clubId, token);
        setMeetings(meetingsData);
      } catch (err) {
        setError('모임 목록을 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      }
    };

    fetchMeetings();
  }, [clubId]);

  const handleRowClick = (meeting: MeetingInfo) => {
    setSelectedMeeting(meeting);
  };

  const handleCloseModal = () => {
    setSelectedMeeting(null);
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <div className="overflow-x-auto">
        <h2 className="text-xl font-bold mb-6 text-left">모임 목록</h2>
        {error && <p className="text-red-500">{error}</p>}
        <table className="min-w-full bg-white border-y-2">
          <thead>
            <tr>
              <th className="py-2 px-5 border-b text-lg">제목</th>
              <th className="py-2 px-5 border-b text-lg">설명</th>
              <th className="py-2 px-5 border-b text-lg">장소</th>
              <th className="py-2 px-5 border-b text-lg">인원</th>
              <th className="py-2 px-5 border-b text-lg">일시</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting: MeetingInfo, index: number) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(meeting)}
              >
                <td className="py-3 px-5 border-b text-sm text-gray-800">
                  {meeting.name}
                </td>
                <td className="py-3 px-5 border-b text-sm text-gray-600">
                  {meeting.introduction.length > 10
                    ? `${meeting.introduction.slice(0, 10)}...`
                    : meeting.introduction}
                </td>
                <td className="py-3 px-5 border-b text-sm text-gray-500">
                  {meeting.place.name}
                </td>
                <td className="py-3 px-5 border-b text-center text-sm text-gray-500">
                  {meeting.participantLimit}
                </td>
                <td className="py-3 px-5 border-b text-sm text-gray-500">
                  {meeting.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedMeeting && (
        <ApplyModal meeting={selectedMeeting} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MeetingList;
