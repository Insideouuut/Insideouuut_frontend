import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { MeetingInfo } from './joggingdata';

interface ApplyModalProps {
  meeting: MeetingInfo;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ meeting, onClose }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`신청 완료: ${name}, ${contact}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">모임 신청</h2>
        <div className="mb-4">
          <label
            htmlFor="meeting-title"
            className="block text-sm font-medium text-gray-700"
          >
            제목
          </label>
          <p id="meeting-title" className="mt-1">
            {meeting.title}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="meeting-description"
            className="block text-sm font-medium text-gray-700"
          >
            설명
          </label>
          <p id="meeting-description" className="mt-1">
            {meeting.description}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="meeting-place"
            className="block text-sm font-medium text-gray-700"
          >
            장소
          </label>
          <p id="meeting-place" className="mt-1">
            {meeting.meetingPlace.name}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="meeting-participants"
            className="block text-sm font-medium text-gray-700"
          >
            인원
          </label>
          <p id="meeting-participants" className="mt-1">
            {meeting.participantLimit}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="meeting-date"
            className="block text-sm font-medium text-gray-700"
          >
            일시
          </label>
          <p id="meeting-date" className="mt-1">
            {meeting.schedule}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              연락처
            </label>
            <input
              id="contact"
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              신청
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
