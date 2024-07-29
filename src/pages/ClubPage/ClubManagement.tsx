import React, { useState } from 'react';

interface ClubData {
  description: string;
  schedule: string;
  currentParticipants: number;
  membershipFee: number;
}

const ClubManagement: React.FC = () => {
  // 예시 데이터
  const initialData: ClubData = {
    description: '다같이 모여서 즐겁게 러닝해요!',
    schedule: '매주 화요일 오후 7시',
    currentParticipants: 10,
    membershipFee: 50000,
  };

  const [formData, setFormData] = useState<ClubData>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisbandModalOpen, setIsDisbandModalOpen] = useState(false);
  const [disbandText, setDisbandText] = useState('');
  const [disbandError, setDisbandError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 API를 통해 데이터를 저장할 수 있습니다.
    setIsModalOpen(true);
    console.log('Updated Club Data:', formData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDisbandClub = () => {
    if (disbandText === '해체하기') {
      // 동아리 해체 로직을 여기에 추가합니다.
      setIsDisbandModalOpen(false);
      console.log('Club disbanded');
      // 해체가 완료되면 상태 초기화
      setDisbandText('');
      setDisbandError('');
    } else {
      setDisbandError('해체하려면 &apos;해체하기&apos;를 입력하세요.');
    }
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <h2 className="text-xl font-bold mb-4">클럽 관리</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          설명:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          스케줄:
          <input
            type="text"
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          현재 멤버 수:
          <input
            type="number"
            name="currentParticipants"
            value={formData.currentParticipants}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          회비 (원):
          <input
            type="number"
            name="membershipFee"
            value={formData.membershipFee}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          저장
        </button>
      </form>
      <button
        onClick={() => setIsDisbandModalOpen(true)}
        className="bg-red-500 text-white p-2 rounded mt-4"
      >
        동아리 해체하기
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">알림</h2>
            <p>클럽 정보가 업데이트되었습니다.</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white p-2 rounded"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      {isDisbandModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">경고</h2>
            <p>정말로 동아리를 해체하시겠습니까?</p>
            <p>&apos;해체하기&apos;를 입력하여 확인하세요:</p>
            <input
              type="text"
              value={disbandText}
              onChange={(e) => setDisbandText(e.target.value)}
              className="block w-full mt-1 p-2 border rounded"
            />
            {disbandError && (
              <p className="text-red-500 text-sm mt-2">{disbandError}</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDisbandModalOpen(false)}
                className="bg-gray-500 text-white p-2 rounded mr-2"
              >
                취소
              </button>
              <button
                onClick={handleDisbandClub}
                className="bg-red-500 text-white p-2 rounded"
              >
                해체
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubManagement;
