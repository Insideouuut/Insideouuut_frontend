import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Info } from './mymeetingdata';

interface AttendanceModalProps {
  meeting: Info;
  onClose: () => void;
}

interface Participant {
  name: string;
  status: '출석' | '결석';
}

const initialParticipants: Participant[] = [
  { name: '참가자1', status: '출석' },
  { name: '참가자2', status: '결석' },
  { name: '참가자3', status: '출석' },
  // ... (추가 참가자 데이터 생략)
  { name: '참가자49', status: '출석' },
  { name: '참가자50', status: '결석' },
];

const AttendanceModal: React.FC<AttendanceModalProps> = ({ onClose }) => {
  const [participantList, setParticipantList] =
    useState<Participant[]>(initialParticipants);

  const toggleStatus = (index: number) => {
    setParticipantList((prevList) =>
      prevList.map((participant, i) =>
        i === index
          ? {
              ...participant,
              status: participant.status === '출석' ? '결석' : '출석',
            }
          : participant,
      ),
    );
  };

  const presentParticipants = participantList.filter(
    (participant) => participant.status === '출석',
  );
  const absentParticipants = participantList.filter(
    (participant) => participant.status === '결석',
  );

  const renderParticipantList = (
    participants: Participant[],
    bgClass: string,
    buttonBgClass: string,
  ) => (
    <div className="space-y-2 max-h-[200px] overflow-y-scroll">
      {participants.map((participant, index) => (
        <div
          key={index}
          className={`flex h-11 justify-between items-center ${bgClass} p-2 rounded-md`}
        >
          <span>{participant.name}</span>
          <Button
            type="button"
            className={`px-4 py-2 ${buttonBgClass} text-white rounded-md hover:${buttonBgClass}-hover`}
            onClick={() => toggleStatus(participantList.indexOf(participant))}
          >
            {participant.status}
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-h-[80%] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">출석 체크</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">출석</h3>
          {renderParticipantList(
            presentParticipants,
            'bg-green-50',
            'bg-red-500',
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">결석</h3>
          {renderParticipantList(absentParticipants, 'bg-red-50', 'bg-primary')}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
