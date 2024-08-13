import { Button } from '@/components/ui/button';
import React from 'react';
import { MeetingInfo } from './MeetingList';

interface DetailsModalProps {
  meeting: MeetingInfo;
  onClose: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ meeting, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[530px] max-w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-center">{meeting.name}</h2>
        <p className="text-lg mb-4 text-gray-800">{meeting.introduction}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="block text-xs font-medium text-gray-500">
              카테고리
            </span>
            <p className="text-sm mt-1">
              {meeting.category} - {meeting.categoryDetail}
            </p>
          </div>
          <div>
            <span className="block text-xs font-medium text-gray-500">
              레벨
            </span>
            <p className="text-sm mt-1">{meeting.level}</p>
          </div>
          <div>
            <span className="block text-xs font-medium text-gray-500">
              일시
            </span>
            <p className="text-sm mt-1">{meeting.date}</p>
          </div>
          <div>
            <span className="block text-xs font-medium text-gray-500">
              장소
            </span>
            <p className="text-sm mt-1">{meeting.place.name}</p>
          </div>
          <div>
            <span className="block text-xs font-medium text-gray-500">
              인원
            </span>
            <p className="text-sm mt-1">
              {meeting.participantsNumber} / {meeting.participantLimit}
            </p>
          </div>
          <div>
            <span className="block text-xs font-medium text-gray-500">
              성비
            </span>
            <p className="text-sm mt-1">{meeting.ratio}</p>
          </div>
          <div>
            <span className="block text-xs font-medium text-gray-500">
              연령대
            </span>
            <p className="text-sm mt-1">
              {meeting.ageRange[0]} - {meeting.ageRange[1]}세
            </p>
          </div>
          <div>
            <span className="block text-xs font-medium text-gray-500">
              회비
            </span>
            <p className="text-sm mt-1">
              {meeting.hasMembershipFee
                ? `${meeting.membershipFeeAmount}원`
                : '없음'}
            </p>
          </div>
          <div className="col-span-2">
            <h3 className="text-md font-semibold text-gray-700 mt-4">규칙</h3>
            <ul className="mt-1 list-disc list-inside text-sm text-gray-700">
              {meeting.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="text-md font-semibold text-gray-700 mt-4">
              참가 질문
            </h3>
            <ul className="mt-1 list-disc list-inside text-sm text-gray-700">
              {meeting.joinQuestions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-end">
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

export default DetailsModal;
