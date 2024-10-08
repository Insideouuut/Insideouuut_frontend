import { applyForClub } from '@/api/clubApi';
import { applyForMeeting } from '@/api/meetingApi';
import { Button } from '@/components/ui/button';
import { ClubData } from '@/types/Clubs';
import { Result } from '@/types/Meetings';
import { AxiosError } from 'axios'; // AxiosError 타입을 가져옵니다.
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ClubRegistrationProps {
  clubData: Result | ClubData;
  type: 'club' | 'meeting';
}

const ClubRegistration: React.FC<ClubRegistrationProps> = ({
  clubData,
  type,
}) => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isInfoAgreed, setIsInfoAgreed] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    (type === 'club'
      ? (clubData as ClubData).joinQuestions
      : (clubData as Result).joinQuestions
    ).reduce(
      (acc: { [key: string]: string }, question: string, index: number) => {
        acc[`question-${index}`] = '';
        return acc;
      },
      {},
    ),
  );

  useEffect(() => {
    console.log('Club Data:', clubData);
    console.log('Type:', type);
  }, [clubData, type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const isFormValid = () => {
    return (
      isAgreed &&
      isInfoAgreed &&
      Object.values(formData).every((field) => field.trim() !== '')
    );
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken') || '';
    const answers = Object.entries(formData).map(([value], index) => ({
      question:
        type === 'club'
          ? (clubData as ClubData).joinQuestions[index]
          : (clubData as Result).joinQuestions[index],
      answer: value,
    }));

    try {
      if (type === 'meeting') {
        await applyForMeeting(clubData.id.toString(), token, answers);
        alert('모임 가입 신청이 성공적으로 이루어졌습니다.');
      } else if (type === 'club') {
        await applyForClub(clubData.id.toString(), token, answers);
        alert('동아리 가입 신청이 성공적으로 이루어졌습니다.');
      }
      navigate('/search');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 403) {
        alert('가입 연령에 맞지 않습니다.');
      } else {
        alert('가입 신청에 실패했습니다.');
      }
    }
  };

  return (
    <div className="flex bg-stone-100 flex-col min-h-[600px]">
      <div className="w-[920px] mx-auto mt-8 flex flex-col flex-grow">
        <h2 className="text-xl text-green-600 font-neoBold mb-10">
          개인정보 이용약관
        </h2>
        <h2 className="text-xl text-green-600 font-neoBold mb-4">가입 규칙</h2>
        <div className="border-2 border-[#B4E3BF] rounded-lg bg-white p-8 mb-4">
          <ol className="space-y-1.5 list-decimal list-inside">
            {(type === 'club'
              ? (clubData as ClubData).rules
              : (clubData as Result).rules
            ).map((rule: string, index: number) => (
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
          {(type === 'club'
            ? (clubData as ClubData).joinQuestions
            : (clubData as Result).joinQuestions
          ).map((question: string, index: number) => (
            <div key={index}>
              <label
                htmlFor={`question-${index}`}
                className="block mb-2 font-neoBold text-sm"
              >
                {question}
              </label>
              <input
                type="text"
                id={`question-${index}`}
                className="w-full h-8 p-2 border border-gray-300 rounded"
                value={formData[`question-${index}`]}
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
            <Button
              className="hover:bg-green-700"
              disabled={!isFormValid()}
              onClick={handleSubmit}
            >
              가입하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubRegistration;
