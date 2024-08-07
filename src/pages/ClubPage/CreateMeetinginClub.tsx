import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const CreateMeeting: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [memberLimit, setMemberLimit] = useState<string | number>('');
  const [date, setDate] = useState('');
  const [fee, setFee] = useState<string | number>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!title) newErrors.title = '필수 입력입니다.';
    else if (title.length < 3 || title.length > 10)
      newErrors.title = '제목은 3~10글자 내로 작성해주세요.';

    if (!description) newErrors.description = '필수 입력입니다.';
    else if (description.length < 10 || description.length > 100)
      newErrors.description = '설명은 10~100글자 내로 작성해주세요.';

    if (!location) newErrors.location = '필수 입력입니다.';
    else if (location.length < 3 || location.length > 10)
      newErrors.location = '장소는 3~10글자 내로 작성해주세요.';

    if (!memberLimit) newErrors.memberLimit = '필수 입력입니다.';

    if (!date) newErrors.date = '필수 입력입니다.';

    if (!fee) newErrors.fee = '필수 입력입니다.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newMeeting = {
      title,
      description,
      location,
      memberLimit:
        typeof memberLimit === 'string' ? parseInt(memberLimit) : memberLimit,
      date,
      fee: typeof fee === 'string' ? parseInt(fee) : fee,
    };
    console.log('New Meeting Created: ', newMeeting);
    // 여기에 서버로 데이터를 전송하거나 다른 처리를 할 수 있습니다.
  };

  const formatFee = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleMemberLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거
    setMemberLimit(Number(value));
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거
    setFee(Number(value));
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <h2 className="text-xl font-bold mb-6">모임 생성</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <div className="flex">
            <label className="mb-2">제목</label>
            {errors.title && (
              <span className="mt-1 ml-1 text-red-500 text-[12px]">
                {errors.title}
              </span>
            )}
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <label className="mb-2">설명</label>
            {errors.description && (
              <span className="mt-1 ml-1 text-red-500 text-[12px]">
                {errors.description}
              </span>
            )}
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex w-full justify-between">
          <div className="flex flex-col w-[48%]">
            <div className="flex ">
              <label className="mb-2">장소</label>
              {errors.location && (
                <span className="mt-1 ml-1 text-red-500 text-[12px]">
                  {errors.location}
                </span>
              )}
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <div className="flex">
              <label className="mb-2">최대 인원</label>
              {errors.memberLimit && (
                <span className="mt-1 ml-1 text-red-500 text-[12px]">
                  {errors.memberLimit}
                </span>
              )}
            </div>
            <select
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
            {(memberLimit === 'custom' || typeof memberLimit === 'number') && (
              <input
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
            <label className="mb-2">일시</label>
            {errors.date && (
              <span className="mt-1 ml-1 text-red-500 text-[12px]">
                {errors.date}
              </span>
            )}
          </div>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <label className="mb-2">회비</label>
            {errors.fee && (
              <span className="mt-1 ml-1 text-red-500 text-[12px]">
                {errors.fee}
              </span>
            )}
          </div>
          <select
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
        <div className="w-full flex justify-end ">
          <Button
            type="submit"
            className=" px-4 py-2 bg-primary w-28 text-white text-sm font-neoBold rounded-md hover:bg-green-700"
          >
            생성
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateMeeting;
