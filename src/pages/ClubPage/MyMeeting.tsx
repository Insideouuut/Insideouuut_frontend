import React, { useState } from "react";
import { Separator } from '@/components/ui/separator';
import mymeetingdata, { Info } from "./mymeetingdata";
import EditMeetingModal from './EditMeetingModal';
import AttendanceModal from './AttendanceModal';
import ConfirmModal from './ConfirmModal';
import { Button } from '@/components/ui/button';

const Mymeeting: React.FC = () => {
  const [editMeeting, setEditMeeting] = useState<Info | null>(null);
  const [showAttendance, setShowAttendance] = useState<Info | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ action: string, meeting: Info | null }>({ action: "", meeting: null });

  const handleEditMeeting = (meeting: Info) => {
    setEditMeeting(meeting);
  };

  const handleShowAttendance = (meeting: Info) => {
    setShowAttendance(meeting);
  };

  const handleConfirmAction = (action: string, meeting: Info) => {
    setConfirmModal({ action, meeting });
  };

  const createdMeetings = mymeetingdata.slice(0, 2); // 생성한 모임
  const joinedMeetings = mymeetingdata.slice(2); // 참여 중인 모임

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <div>
        <h2 className="text-xl font-bold mb-4">나의 모임</h2>
        <div className="max-h-[700px] overflow-scroll space-y-4">
          <h3 className="text-lg font-semibold mb-2">생성한 모임</h3>
          {createdMeetings.map((meeting: Info, index: number) => (
            <React.Fragment key={index}>
              <div className="p-4 border rounded-lg shadow-sm bg-white flex flex-col space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{meeting.title}</h3>
                    <p>{meeting.description}</p>
                    <p>장소: {meeting.location}</p>
                    <p>인원: {meeting.currentMembers}/{meeting.memberLimit}</p>
                    <p>일시: {meeting.date}</p>
                    <p>회비: {meeting.fee === 0 ? "무료" : `${meeting.fee.toLocaleString()}원`}</p>
                  </div>
                  <div className="flex flex-col space-y-2 justify-center items-end">
                    <Button className="px-4 py-2 bg-blue-500 bg-opacity-80 text-white rounded-md hover:bg-blue-700" onClick={() => handleEditMeeting(meeting)}>정보 수정</Button>
                    <Button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-green-700" onClick={() => handleShowAttendance(meeting)}>출석 체크</Button>
                    <Button className="px-4 py-2 bg-red-500 bg-opacity-80 text-white rounded-md hover:bg-red-700" onClick={() => handleConfirmAction("해체하기", meeting)}>모임 해체</Button>
                  </div>
                </div>
              </div>
              {index < createdMeetings.length - 1 && <Separator />}
            </React.Fragment>
          ))}

          <h3 className="text-lg font-semibold mt-4 mb-2">참여 중인 모임</h3>
          {joinedMeetings.map((meeting: Info, index: number) => (
            <React.Fragment key={index}>
              <div className="p-4 border rounded-lg shadow-sm bg-white flex flex-col space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{meeting.title}</h3>
                    <p>{meeting.description}</p>
                    <p>장소: {meeting.location}</p>
                    <p>인원: {meeting.currentMembers}/{meeting.memberLimit}</p>
                    <p>일시: {meeting.date}</p>
                    <p>회비: {meeting.fee === 0 ? "무료" : `${meeting.fee.toLocaleString()}원`}</p>
                  </div>
                  <div className="flex flex-col space-y-2 justify-center items-end">
                    <Button className="px-4 py-2 bg-red-500 bg-opacity-80 text-white rounded-md hover:bg-red-700" onClick={() => handleConfirmAction("나가기", meeting)}>모임 나가기</Button>
                  </div>
                </div>
              </div>
              {index < joinedMeetings.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {editMeeting && <EditMeetingModal meeting={editMeeting} onClose={() => setEditMeeting(null)} />}
      {showAttendance && <AttendanceModal meeting={showAttendance} onClose={() => setShowAttendance(null)} />}
      {confirmModal.meeting && <ConfirmModal action={confirmModal.action} meeting={confirmModal.meeting} onClose={() => setConfirmModal({ action: "", meeting: null })} />}
    </div>
  );
};

export default Mymeeting;
