// src/components/ClubManagement.tsx

import { deleteClub, getClubData, updateClubData } from '@/api/clubApi';
import {
  deleteMeetingData,
  endMeeting,
  getMeetingData,
  updateMeetingData,
} from '@/api/meetingApi';
import { Button } from '@/components/ui/button';
import { ClubData as ClubAPIData } from '@/types/Clubs';
import { Result, UpdateMeetingData } from '@/types/Meetings';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

interface MeetingPlace {
  name: string;
  placeUrl: string;
  kakaoMapId: string;
  address_name: string;
  road_address_name: string;
  latitude: string;
  longitude: string;
}

interface ClubData {
  type: string;
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
  imageFiles: File[];
}

const ClubManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [formData, setFormData] = useState<ClubData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisbandModalOpen, setIsDisbandModalOpen] = useState(false);
  const [disbandText, setDisbandText] = useState('');
  const [disbandError, setDisbandError] = useState('');

  const type = location.pathname.includes('/club') ? 'club' : 'meeting';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === 'club') {
          const data: ClubAPIData = await getClubData(id!);

          const clubData: ClubData = {
            type: '동아리',
            name: data.name,
            introduction: data.introduction,
            category: data.category,
            categoryDetail: data.categoryDetail,
            meetingPlace: {
              name: '',
              placeUrl: '',
              kakaoMapId: '',
              address_name: '',
              road_address_name: '',
              latitude: '0',
              longitude: '0',
            },
            participantLimit: data.participantLimit,
            rules: data.rules,
            joinQuestions: data.joinQuestions,
            date: data.date,
            level: data.level,
            ageRange: data.ageRange,
            hasGenderRatio: data.genderRatio ? 'true' : 'false',
            ratio: data.genderRatio,
            hasMembershipFee: data.hasMembershipFee,
            membershipFeeAmount: data.membershipFeeAmount,
            imageFiles: [],
          };

          setFormData(clubData);
        } else if (type === 'meeting') {
          const data: Result = await getMeetingData(id!);

          const meetingData: ClubData = {
            type: '모임',
            name: data.name,
            introduction: data.introduction,
            category: data.category,
            categoryDetail: data.categoryDetail,
            meetingPlace: {
              name: data.place.name,
              placeUrl: data.place.placeUrl,
              kakaoMapId: data.place.kakaoMapId,
              address_name: data.place.addressName || '',
              road_address_name: data.place.roadAddressName || '',
              latitude: data.place.latitude.toString(),
              longitude: data.place.longitude.toString(),
            },
            participantLimit: data.participantLimit,
            rules: data.rules,
            joinQuestions: data.joinQuestions,
            date: data.date,
            level: data.level,
            ageRange: data.ageRange,
            hasGenderRatio: data.ratio ? '지정' : '미지정',
            ratio: data.ratio,
            hasMembershipFee: data.hasMembershipFee,
            membershipFeeAmount: data.membershipFeeAmount,
            imageFiles: [],
          };

          setFormData(meetingData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, type]);

  const mapCategoryToEnglish = (category: string): string => {
    switch (category) {
      case '운동':
        return 'SPORTS';
      case '사교/취미':
        return 'SOCIAL';
      case '스터디':
        return 'STUDY';
      default:
        return category;
    }
  };

  const mapLevelToEnglish = (level: string): string => {
    switch (level) {
      case '하':
        return 'BEGINNER';
      case '중':
        return 'INTERMEDIATE';
      case '상':
        return 'ADVANCED';
      case '무관':
        return 'NONE';
      default:
        return level;
    }
  };

  const formatDate = (dateString: string): string => {
    return dateString.replace(/\./g, '-');
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(
        (prevData) => prevData && { ...prevData, imageFiles: filesArray },
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken') || '';
      if (formData) {
        // 카테고리와 날짜 변환
        const transformedCategory = mapCategoryToEnglish(formData.category);
        const transformedDate = formatDate(formData.date);
        const transformedLevel = mapLevelToEnglish(formData.level);

        if (type === 'club') {
          const formDataToSend = new FormData();

          const clubRequestDto = {
            type: formData.type,
            category: transformedCategory, // 변환된 카테고리 사용
            categoryDetail: formData.categoryDetail,
            level: transformedLevel, // 변환된 레벨 사용
            hasMembershipFee: formData.hasMembershipFee,
            membershipFeeAmount: formData.membershipFeeAmount,
            date: transformedDate, // 변환된 날짜 사용
            participantLimit: formData.participantLimit,
            hasGenderRatio: formData.hasGenderRatio,
            ratio: formData.ratio,
            minAge: formData.ageRange[0],
            maxAge: formData.ageRange[1],
            name: formData.name,
            introduction: formData.introduction,
            rules: formData.rules,
            joinQuestions: formData.joinQuestions,
            activityRegion: formData.meetingPlace.address_name,
          };

          formDataToSend.append(
            'clubRequestDto',
            new Blob([JSON.stringify(clubRequestDto)], {
              type: 'application/json',
            }),
          );

          formData.imageFiles.forEach((file) => {
            formDataToSend.append('imageFiles', file);
          });

          await updateClubData(id!, formDataToSend, token);
        } else if (type === 'meeting') {
          const updateData: UpdateMeetingData = {
            type: formData.type,
            name: formData.name,
            introduction: formData.introduction,
            category: transformedCategory, // 변환된 카테고리 사용
            categoryDetail: formData.categoryDetail,
            meetingPlace: {
              name: formData.meetingPlace.name,
              placeUrl: formData.meetingPlace.placeUrl,
              kakaoMapId: formData.meetingPlace.kakaoMapId,
              address_name: formData.meetingPlace.address_name,
              road_address_name: formData.meetingPlace.road_address_name,
              latitude: formData.meetingPlace.latitude,
              longitude: formData.meetingPlace.longitude,
            },
            participantLimit: formData.participantLimit,
            rules: formData.rules,
            joinQuestions: formData.joinQuestions,
            date: transformedDate, // 변환된 날짜 사용
            level: transformedLevel, // 변환된 레벨 사용
            ageRange: formData.ageRange,
            hasGenderRatio: formData.hasGenderRatio,
            ratio: formData.ratio,
            hasMembershipFee: formData.hasMembershipFee,
            membershipFeeAmount: formData.membershipFeeAmount,
          };

          const imageFile =
            formData.imageFiles.length > 0 ? formData.imageFiles[0] : null;

          await updateMeetingData(id!, updateData, imageFile, token);
        }

        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEndMeeting = async () => {
    try {
      const token = localStorage.getItem('accessToken') || '';
      await endMeeting(id!, token);
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
        if (type === 'club') {
          await deleteClub(id!, token); // 클럽 삭제 API 호출
        } else {
          await deleteMeetingData(id!, token); // 모임 삭제 API 호출
        }
        alert(
          `${type === 'club' ? '클럽이' : '모임이'} 성공적으로 삭제되었습니다.`,
        );
        setDisbandText('');
        setDisbandError('');
      } catch (error) {
        console.error('Error deleting data:', error);
        alert(`${type === 'club' ? '클럽' : '모임'} 삭제에 실패했습니다.`);
      }
    } else {
      setDisbandError('해체하려면 "해체하기"를 입력하세요.');
    }
  };

  if (!formData) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <h2 className="text-xl font-bold mb-4">
        {type === 'club' ? '클럽 관리' : '모임 관리'}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
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

        {/* Conditional fields based on type */}
        {type === 'meeting' && (
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
              name="placeUrl"
              value={formData.meetingPlace.placeUrl}
              onChange={handleMeetingPlaceChange}
              placeholder="장소 URL"
              className="block w-full mt-1 p-2 border rounded"
            />
            <input
              name="kakaoMapId"
              value={formData.meetingPlace.kakaoMapId}
              onChange={handleMeetingPlaceChange}
              placeholder="카카오 맵 ID"
              className="block w-full mt-1 p-2 border rounded"
            />
            <input
              name="address_name"
              value={formData.meetingPlace.address_name}
              onChange={handleMeetingPlaceChange}
              placeholder="주소 이름"
              className="block w-full mt-1 p-2 border rounded"
            />
            <input
              name="road_address_name"
              value={formData.meetingPlace.road_address_name}
              onChange={handleMeetingPlaceChange}
              placeholder="도로명 주소"
              className="block w-full mt-1 p-2 border rounded"
            />
            <input
              name="latitude"
              value={formData.meetingPlace.latitude}
              onChange={handleMeetingPlaceChange}
              placeholder="위도"
              className="block w-full mt-1 p-2 border rounded"
            />
            <input
              name="longitude"
              value={formData.meetingPlace.longitude}
              onChange={handleMeetingPlaceChange}
              placeholder="경도"
              className="block w-full mt-1 p-2 border rounded"
            />
          </div>
        )}

        {/* Image upload */}
        <label className="block mb-2">
          이미지 파일 업로드:
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>

        {/* More form fields */}
        <div className="block mb-2">
          규칙:
          {formData.rules.map((rule, index) => (
            <input
              key={index}
              name={`rule_${index}`}
              value={rule}
              onChange={(e) => {
                const newRules = [...formData.rules];
                newRules[index] = e.target.value;
                setFormData({ ...formData, rules: newRules });
              }}
              placeholder={`규칙 ${index + 1}`}
              className="block w-full mt-1 p-2 border rounded"
            />
          ))}
        </div>
        <div className="block mb-2">
          참가 질문:
          {formData.joinQuestions.map((question, index) => (
            <input
              key={index}
              name={`joinQuestion_${index}`}
              value={question}
              onChange={(e) => {
                const newQuestions = [...formData.joinQuestions];
                newQuestions[index] = e.target.value;
                setFormData({ ...formData, joinQuestions: newQuestions });
              }}
              placeholder={`질문 ${index + 1}`}
              className="block w-full mt-1 p-2 border rounded"
            />
          ))}
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
        <label className="block mb-2">
          성비:
          <input
            name="ratio"
            type="text"
            value={formData.ratio}
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

      {/* Modals */}
      <div className="mt-4">
        {type === 'meeting' && (
          <Button
            onClick={handleEndMeeting}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mr-2"
          >
            모임 종료하기
          </Button>
        )}
        <Button
          onClick={() => setIsDisbandModalOpen(true)}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
        >
          {type === 'club' ? '클럽 삭제하기' : '모임 삭제하기'}
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">알림</h2>
            <p>
              {type === 'club' ? '클럽 정보가' : '모임 정보가'}{' '}
              업데이트되었습니다.
            </p>
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
            <p>
              정말로 {type === 'club' ? '클럽을' : '모임을'} 삭제하시겠습니까?
            </p>
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
