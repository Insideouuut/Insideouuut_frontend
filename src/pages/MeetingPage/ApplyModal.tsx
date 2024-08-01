import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
interface Meeting {
  name: string;
}

interface ApplyModalProps {
  meeting: Meeting;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ meeting, onClose }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 신청 로직을 추가할 수 있습니다.
    alert(`신청 완료: ${name}, ${contact}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">모임 신청</h2>
        <p className="mb-4">{meeting.name}</p>
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
