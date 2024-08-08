import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Info } from './mymeetingdata';

interface ConfirmModalProps {
  action: string;
  meeting: Info;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  action,
  meeting,
  onClose,
}) => {
  const [input, setInput] = useState('');

  const handleConfirm = () => {
    if (
      (action === '나가기' && input === '나가기') ||
      (action === '해체하기' && input === '해체하기')
    ) {
      // 처리 로직 추가
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{action}</h2>
        <p className="mb-4">
          {meeting.title} 모임을 {action} 하시겠습니까?
        </p>
        <p className="mb-4">확인을 위해 &quot;{action}&quot;을 입력해주세요.</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
            onClick={handleConfirm}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
