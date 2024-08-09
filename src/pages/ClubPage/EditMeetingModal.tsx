import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Info } from './mymeetingdata';

interface EditMeetingModalProps {
  meeting: Info;
  onClose: () => void;
}

const EditMeetingModal: React.FC<EditMeetingModalProps> = ({
  meeting,
  onClose,
}) => {
  const [title, setTitle] = useState(meeting.title);
  const [description, setDescription] = useState(meeting.description);
  const [location, setLocation] = useState(meeting.location);
  const [memberLimit, setMemberLimit] = useState<string | number>(
    meeting.memberLimit,
  );
  const [date, setDate] = useState(meeting.date);
  const [fee, setFee] = useState<string | number>(meeting.fee);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSave = () => {
    // 저장 로직 추가
    onClose();
  };

  const handleMemberLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거
    setMemberLimit(Number(value));
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거
    setFee(Number(value));
  };

  const formatFee = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[820px] border-2 border-gray-200">
        <h2 className="text-xl font-bold mb-4">모임 정보 수정</h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <div className="flex">
              <label htmlFor="title" className="mb-2">제목</label>
              {errors.title && (
                <span className="mt-1 ml-1 text-red-500 text-[12px]">
                  {errors.title}
                </span>
              )}
            </div>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <label htmlFor="description" className="mb-2">설명</label>
              {errors.description && (
                <span className="mt-1 ml-1 text-red-500 text-[12px]">
                  {errors.description}
                </span>
              )}
            </div>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex w-full justify-between">
            <div className="flex flex-col w-[48%]">
              <div className="flex">
                <label htmlFor="location" className="mb-2">장소</label>
                {errors.location && (
                  <span className="mt-1 ml-1 text-red-500 text-[12px]">
                    {errors.location}
                  </span>
                )}
              </div>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex flex-col w-[48%]">
              <div className="flex">
                <label htmlFor="memberLimit" className="mb-2">최대 인원</label>
                {errors.memberLimit && (
                  <span className="mt-1 ml-1 text-red-500 text-[12px]">
                    {errors.memberLimit}
                  </span>
                )}
              </div>
              <select
                id="memberLimit"
                value={memberLimit}
                onChange={(e) => setMemberLimit(e.target.value)}
                className="p-2 border rounded h-[42px]"
              >
                <option value="">선택하세요</option>
                <option value="custom">직접 입력</option>
                <option value="1">1명</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
                <option value="5">5명</option>
                <option value="6">6명</option>
                <option value="7">7명</option>
                <option value="8">8명</option>
                <option value="9">9명</option>
                <option value="10">10명</option>
              </select>
              {(memberLimit === 'custom' ||
                typeof memberLimit === 'number') && (
                <input
                  id="memberLimitCustom"
                  value={typeof memberLimit === 'number' ? memberLimit : ''}
                  onChange={handleMemberLimitChange}
                  className="mt-2 p-2 border rounded"
                  placeholder="최대 인원을 입력하세요"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <label htmlFor="date" className="mb-2">일시</label>
              {errors.date && (
                <span className="mt-1 ml-1 text-red-500 text-[12px]">
                  {errors.date}
                </span>
              )}
            </div>
            <input
              id="date"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <label htmlFor="fee" className="mb-2">회비</label>
              {errors.fee && (
                <span className="mt-1 ml-1 text-red-500 text-[12px]">
                  {errors.fee}
                </span>
              )}
            </div>
            <select
              id="fee"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">선택하세요</option>
              <option value="custom">직접 입력</option>
              <option value="5000">5,000원</option>
              <option value="10000">10,000원</option>
              <option value="20000">20,000원</option>
            </select>
            {(fee === 'custom' || typeof fee === 'number') && (
              <div className="flex items-center mt-2">
                <input
                  id="feeCustom"
                  type="text"
                  value={typeof fee === 'number' ? formatFee(fee) : ''}
                  onChange={handleFeeChange}
                  className="p-2 border rounded flex-grow"
                  placeholder="회비를 입력하세요"
                />
                <span className="ml-2">원</span>
              </div>
            )}
          </div>
          <div className="w-full flex justify-end space-x-2">
            <Button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              onClick={handleSave}
            >
              저장
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMeetingModal;
