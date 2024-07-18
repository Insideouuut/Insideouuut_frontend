import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const ClubRegistration: React.FC = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isInfoAgreed, setIsInfoAgreed] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    mbti: '',
    age: '',
    participation: ''
  });

  // 예시 데이터
  const rules = [
    '가입 후 3개월 동안 참여 횟수 3회 미만일 경우 강퇴!!',
    '상호 존중',
    '이성적 만남, 영업 등 동아리와 관련되지 않은 목적 적발시 강퇴!!',
    '가입 후 일주일 내 인사 등록 및 한달 내 모임 참여',
  ];

  const questions = [
    { id: 'mbti', label: '1. MBTI (잘 모르면 외향형, 내향형 정도로 작성해주세요.)' },
    { id: 'age', label: '2. 나이 (만 나이)' },
    { id: 'participation', label: '3. 가입 시 잘 참여하겠습니까?' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const isFormValid = () => {
    return isAgreed && isInfoAgreed && Object.values(formData).every(field => field.trim() !== '');
  };

  return (
    <div className="flex bg-stone-100 flex-col min-h-screen">
      <div className="w-[920px] mx-auto mt-8 flex flex-col flex-grow">
        <h2 className="text-xl text-green-600 font-neoBold mb-10">
          개인정보 이용약관
        </h2>
        <h2 className="text-xl text-green-600 font-neoBold mb-4">가입 규칙</h2>
        <div className="border-2 border-[#B4E3BF] rounded-lg bg-white p-8 mb-4">
          <ol className="space-y-1.5 list-decimal list-inside">
            {rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ol>
        </div>
        <label className="flex justify-end items-center mb-5">
          <input
            type="checkbox"
            className="form-checkbox"
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <span className="ml-2 text-sm">위 가입 규칙에 동의합니다.</span>
        </label>

        <h2 className="text-xl text-green-600 font-neoBold mb-4">가입 질문</h2>
        <div className="space-y-4 bg-white p-8 border-2 border-[#B4E3BF] rounded-lg">
          {questions.map((question) => (
            <div key={question.id}>
              <label htmlFor={question.id} className="block mb-2 font-neoBold text-sm">
                {question.label}
              </label>
              <input
                type="text"
                id={question.id}
                className="w-full h-8 p-2 border border-gray-300 rounded"
                value={formData[question.id]}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>

        <div className="mt-auto mb-10">
          <label className="flex justify-end items-center mt-4 mb-3">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={(e) => setIsInfoAgreed(e.target.checked)}
            />
            <span className="text-sm ml-2">
              위 가입 내용의 정보 이용에 동의합니다.
            </span>
          </label>
          <div className="flex justify-end">
            <Button disabled={!isFormValid()}>가입하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubRegistration;
