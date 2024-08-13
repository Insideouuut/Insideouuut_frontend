import { getMyMeetings } from '@/api/clubApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailsModal from './DetailsModal';
import { MeetingInfo } from './MeetingList';

const MyMeetingList: React.FC = () => {
  const [myMeetings, setMyMeetings] = useState<MeetingInfo[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingInfo | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  const { id: clubId } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchMyMeetings = async () => {
      if (!clubId) {
        setError('클럽 ID를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('accessToken') || '';
        const myMeetingsData = await getMyMeetings(clubId, token);
        setMyMeetings(myMeetingsData);
      } catch (err) {
        setError('나의 미팅 목록을 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false); // 로딩 완료 후 로딩 상태를 false로 설정
      }
    };

    fetchMyMeetings();
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
        <h2 className="text-xl font-bold mb-6 text-left">나의 모임 목록</h2>
        {loading && <p>로딩 중...</p>} {/* 로딩 상태 표시 */}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
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
              {myMeetings.map((meeting: MeetingInfo, index: number) => (
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
                    {meeting.participantsNumber} / {meeting.participantLimit}
                  </td>
                  <td className="py-3 px-5 border-b text-sm text-gray-500">
                    {meeting.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedMeeting && (
        <DetailsModal meeting={selectedMeeting} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MyMeetingList;
