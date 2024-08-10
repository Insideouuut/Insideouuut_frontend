import {
  deleteMeetingData,
  endMeeting,
  getMeetingData,
  updateMeetingData,
} from '@/api/meetingApi';
import { Button } from '@/components/ui/button';
import { Result } from '@/types/Meetings';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface MeetingPlace {
  name: string;
  placeUrl: string;
  kakaoMapId: string;
  addressName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
}

interface ClubData {
  name: string;
  introduction: string;
  category: string;
  categoryDetail: string;
  meetingPlace: MeetingPlace;
  participantLimit: number;
  rules: string[];
  joinQuestions: string[];
  date: string;
  level: string;
  ageRange: number[];
  hasGenderRatio: string;
  ratio: string;
  hasMembershipFee: boolean;
  membershipFeeAmount: number;
  imageFiles: string[]; // 이미지 파일 필드 추가
}

const ClubManagement: React.FC = () => {
  const { id: meetingId } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<ClubData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisbandModalOpen, setIsDisbandModalOpen] = useState(false);
  const [disbandText, setDisbandText] = useState('');
  const [disbandError, setDisbandError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Result = await getMeetingData(meetingId!);

        const clubData: ClubData = {
          name: data.name,
          introduction: data.introduction,
          category: data.category,
          categoryDetail: data.categoryDetail,
          meetingPlace: {
            name: data.place.name,
            placeUrl: data.place.placeUrl,
            kakaoMapId: data.place.kakaoMapId,
            addressName: data.place.addressName || '',
            roadAddressName: data.place.roadAddressName || '',
            latitude: data.place.latitude,
            longitude: data.place.longitude,
          },
          participantLimit: data.participantLimit,
          rules: data.rules,
          joinQuestions: data.joinQuestions,
          date: data.date,
          level: data.level,
          ageRange: data.ageRange,
          hasGenderRatio: data.ratio ? 'true' : 'false',
          ratio: data.ratio,
          hasMembershipFee: data.hasMembershipFee,
          membershipFeeAmount: data.membershipFeeAmount,
          imageFiles: [], // 이미지 파일 필드 초기화
        };

        setFormData(clubData);
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    fetchData();
  }, [meetingId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => prevData && { ...prevData, [name]: value });
  };

  const handleMeetingPlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(
      (prevData) =>
        prevData && {
          ...prevData,
          meetingPlace: {
            ...prevData.meetingPlace,
            [name]: value,
          },
        },
    );
  };

  const handleRulesChange = (index: number, value: string) => {
    if (formData) {
      const newRules = [...formData.rules];
      newRules[index] = value;
      setFormData({ ...formData, rules: newRules });
    }
  };

  const handleAddRule = () => {
    setFormData(
      (prevData) => prevData && { ...prevData, rules: [...prevData.rules, ''] },
    );
  };

  const handleJoinQuestionsChange = (index: number, value: string) => {
    if (formData) {
      const newQuestions = [...formData.joinQuestions];
      newQuestions[index] = value;
      setFormData({ ...formData, joinQuestions: newQuestions });
    }
  };

  const handleAddQuestion = () => {
    setFormData(
      (prevData) =>
        prevData && {
          ...prevData,
          joinQuestions: [...prevData.joinQuestions, ''],
        },
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken') || '';
      if (formData) {
        await updateMeetingData(meetingId!, formData, token);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error updating club data:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEndMeeting = async () => {
    try {
      const token = localStorage.getItem('accessToken') || '';
      await endMeeting(meetingId!, token);
      alert('모임이 성공적으로 종료되었습니다.');
    } catch (error) {
      console.error('Error ending meeting:', error);
      alert('모임 종료에 실패했습니다.');
    }
  };

  const handleDisbandClub = async () => {
    if (disbandText === '해체하기') {
      setIsDisbandModalOpen(false);
      try {
        const token = localStorage.getItem('accessToken') || '';
        await deleteMeetingData(meetingId!, token);
        alert('모임이 성공적으로 삭제되었습니다.');
        setDisbandText('');
        setDisbandError('');
      } catch (error) {
        console.error('Error deleting club data:', error);
        alert('모임 삭제에 실패했습니다.');
      }
    } else {
      setDisbandError('해체하려면 &apos;해체하기&apos;를 입력하세요.');
    }
  };

  if (!formData) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <h2 className="text-xl font-bold mb-4">클럽 관리</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          이름:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          소개:
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          카테고리:
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          카테고리 세부:
          <input
            name="categoryDetail"
            value={formData.categoryDetail}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <div className="block mb-2">
          장소:
          <input
            name="name"
            value={formData.meetingPlace.name}
            onChange={handleMeetingPlaceChange}
            placeholder="장소 이름"
            className="block w-full mt-1 p-2 border rounded"
          />
          <input
            name="addressName"
            value={formData.meetingPlace.addressName}
            onChange={handleMeetingPlaceChange}
            placeholder="주소"
            className="block w-full mt-1 p-2 border rounded"
          />
        </div>
        <div className="block mb-2">
          규칙:
          {formData.rules.map((rule, index) => (
            <input
              key={index}
              value={rule}
              onChange={(e) => handleRulesChange(index, e.target.value)}
              placeholder={`규칙 ${index + 1}`}
              className="block w-full mt-1 p-2 border rounded"
            />
          ))}
          <Button
            type="button"
            onClick={handleAddRule}
            className="bg-gray-300 text-black p-2 rounded mt-2"
          >
            규칙 추가
          </Button>
        </div>
        <div className="block mb-2">
          참가 질문:
          {formData.joinQuestions.map((question, index) => (
            <input
              key={index}
              value={question}
              onChange={(e) => handleJoinQuestionsChange(index, e.target.value)}
              placeholder={`질문 ${index + 1}`}
              className="block w-full mt-1 p-2 border rounded"
            />
          ))}
          <Button
            type="button"
            onClick={handleAddQuestion}
            className="bg-gray-300 text-black p-2 rounded mt-2"
          >
            질문 추가
          </Button>
        </div>
        <label className="block mb-2">
          정원 수:
          <input
            name="participantLimit"
            type="number"
            value={formData.participantLimit}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          회비:
          <input
            name="membershipFeeAmount"
            type="number"
            value={formData.membershipFeeAmount}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <Button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700"
        >
          저장
        </Button>
      </form>

      <div className="mt-4">
        <Button
          onClick={handleEndMeeting}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mr-2"
        >
          모임 종료하기
        </Button>
        <Button
          onClick={() => setIsDisbandModalOpen(true)}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
        >
          모임 삭제하기
        </Button>
      </div>

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
            <p>정말로 모임을 삭제하시겠습니까?</p>
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
