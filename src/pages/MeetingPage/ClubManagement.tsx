import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

interface ClubData {
  description: string;
  schedule: string[];
  currentParticipants: number;
  membershipFee: string;
}

const daysOfWeek = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

const ClubManagement: React.FC = () => {
  // 예시 데이터
  const initialData: ClubData = {
    description: '다같이 모여서 즐겁게 러닝해요!',
    schedule: [],
    currentParticipants: 10,
    membershipFee: '50,000',
  };

  const [formData, setFormData] = useState<ClubData>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisbandModalOpen, setIsDisbandModalOpen] = useState(false);
  const [disbandText, setDisbandText] = useState('');
  const [disbandError, setDisbandError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScheduleChange = (day: string) => {
    setFormData((prevData) => ({
      ...prevData,
      schedule: prevData.schedule.includes(day)
        ? prevData.schedule.filter((d) => d !== day)
        : [...prevData.schedule, day],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    console.log('Updated Club Data:', formData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDisbandClub = () => {
    if (disbandText === '해체하기') {
      setIsDisbandModalOpen(false);
      console.log('Club disbanded');
      setDisbandText('');
      setDisbandError('');
    } else {
      setDisbandError('해체하려면 &apos;해체하기&apos;를 입력하세요.');
    }
  };

  const handleMembershipFeeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자 제거
    setFormData({
      ...formData,
      membershipFee: new Intl.NumberFormat().format(Number(value)),
    });
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
        <div className="block mb-2">
          스케줄:
          <div className="flex flex-wrap mt-1">
            {daysOfWeek.map((day) => (
              <Button
                type="button"
                key={day}
                onClick={() => handleScheduleChange(day)}
                className={`p-2 m-1 rounded  ${formData.schedule.includes(day) ? 'bg-primary hover:bg-green-600' : 'bg-gray-300 hover:bg-slate-400'}`}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center w-[70%]">
          <label className="flex h-10 w-full mb-2">
            <p className="w-[25%] my-auto">정원 수:</p>
            <select
              name="currentParticipants"
              value={formData.currentParticipants}
              onChange={handleChange}
              className="block w-[30%] mt-1 mr-10 p-2 border rounded"
            >
              {Array.from({ length: 10 }, (_, i) => (i + 1) * 5).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
          <label className="flex h-10 w-full mb-2">
            <p className="w-[30%] my-auto">회비 (원):</p>
            <input
              type="text"
              name="membershipFee"
              value={formData.membershipFee}
              onChange={handleMembershipFeeChange}
              className="block w-[50%] h-[32px] my-auto mr-10 p-2 border rounded"
            />
          </label>
        </div>
        <Button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700"
        >
          저장
        </Button>
      </form>
      <Button
        onClick={() => setIsDisbandModalOpen(true)}
        className="bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-700"
      >
        동아리 해체하기
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">알림</h2>
            <p>클럽 정보가 업데이트되었습니다.</p>
            <div className="flex justify-end mt-4">
              <Button
                onClick={closeModal}
                className="bg-blue-500 text-white p-2 rounded"
              >
                닫기
              </Button>
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
              <Button
                onClick={() => setIsDisbandModalOpen(false)}
                className="bg-gray-500 text-white p-2 rounded mr-2"
              >
                취소
              </Button>
              <Button
                onClick={handleDisbandClub}
                className="bg-red-500 text-white p-2 rounded"
              >
                해체
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubManagement;
