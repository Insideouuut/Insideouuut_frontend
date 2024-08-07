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
  { name: '참가자4', status: '결석' },
  { name: '참가자5', status: '출석' },
  { name: '참가자6', status: '결석' },
  { name: '참가자7', status: '출석' },
  { name: '참가자8', status: '결석' },
  { name: '참가자9', status: '출석' },
  { name: '참가자10', status: '결석' },
  // 추가 예시 데이터
  { name: '참가자11', status: '출석' },
  { name: '참가자12', status: '결석' },
  { name: '참가자13', status: '출석' },
  { name: '참가자14', status: '결석' },
  { name: '참가자15', status: '출석' },
  { name: '참가자16', status: '결석' },
  { name: '참가자17', status: '출석' },
  { name: '참가자18', status: '결석' },
  { name: '참가자19', status: '출석' },
  { name: '참가자20', status: '결석' },
  { name: '참가자21', status: '출석' },
  { name: '참가자22', status: '결석' },
  { name: '참가자23', status: '출석' },
  { name: '참가자24', status: '결석' },
  { name: '참가자25', status: '출석' },
  { name: '참가자26', status: '결석' },
  { name: '참가자27', status: '출석' },
  { name: '참가자28', status: '결석' },
  { name: '참가자29', status: '출석' },
  { name: '참가자30', status: '결석' },
  { name: '참가자31', status: '출석' },
  { name: '참가자32', status: '결석' },
  { name: '참가자33', status: '출석' },
  { name: '참가자34', status: '결석' },
  { name: '참가자35', status: '출석' },
  { name: '참가자36', status: '결석' },
  { name: '참가자37', status: '출석' },
  { name: '참가자38', status: '결석' },
  { name: '참가자39', status: '출석' },
  { name: '참가자40', status: '결석' },
  { name: '참가자41', status: '출석' },
  { name: '참가자42', status: '결석' },
  { name: '참가자43', status: '출석' },
  { name: '참가자44', status: '결석' },
  { name: '참가자45', status: '출석' },
  { name: '참가자46', status: '결석' },
  { name: '참가자47', status: '출석' },
  { name: '참가자48', status: '결석' },
  { name: '참가자49', status: '출석' },
  { name: '참가자50', status: '결석' },
];

const AttendanceModal: React.FC<AttendanceModalProps> = ({
  meeting,
  onClose,
}) => {
  const [participantList, setParticipantList] =
    useState<Participant[]>(initialParticipants);

  const toggleStatus = (index: number) => {
    const updatedParticipants = [...participantList];
    updatedParticipants[index].status =
      updatedParticipants[index].status === '출석' ? '결석' : '출석';
    setParticipantList(updatedParticipants);
  };

  const presentParticipants = participantList.filter(
    (participant) => participant.status === '출석',
  );
  const absentParticipants = participantList.filter(
    (participant) => participant.status === '결석',
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-h-[80%] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">출석 체크</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">출석</h3>
          <div className="space-y-2 max-h-[200px] overflow-y-scroll">
            {presentParticipants.map((participant, index) => (
              <div
                key={index}
                className="flex h-11 justify-between items-center bg-green-50 p-2 rounded-md"
              >
                <span>{participant.name}</span>
                <Button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                  onClick={() =>
                    toggleStatus(participantList.indexOf(participant))
                  }
                >
                  {participant.status}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">결석</h3>
          <div className="space-y-2 max-h-[200px] overflow-y-scroll">
            {absentParticipants.map((participant, index) => (
              <div
                key={index}
                className="flex h-11 justify-between items-center bg-red-50 p-2 rounded-md"
              >
                <span>{participant.name}</span>
                <Button
                  type="button"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-green-700"
                  onClick={() =>
                    toggleStatus(participantList.indexOf(participant))
                  }
                >
                  {participant.status}
                </Button>
              </div>
            ))}
          </div>
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
