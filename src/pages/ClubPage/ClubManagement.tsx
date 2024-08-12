import { getClubData, updateClubData } from '@/api/clubApi';
import {
  deleteMeetingData,
  endMeeting,
  getMeetingData,
  updateMeetingData, // 모임 데이터를 업데이트하기 위한 함수 import
} from '@/api/meetingApi';
import { Button } from '@/components/ui/button';
import { ClubData as ClubAPIData } from '@/types/Clubs';
import { Result, UpdateMeetingData } from '@/types/Meetings'; // 필요한 타입 import
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

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
            name: data.name,
            introduction: data.introduction,
            category: data.category,
            categoryDetail: data.categoryDetail,
            meetingPlace: {
              name: '',
              placeUrl: '',
              kakaoMapId: '',
              addressName: '',
              roadAddressName: '',
              latitude: 0,
              longitude: 0,
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
        if (type === 'club') {
          const formDataToSend = new FormData();

          const clubRequestDto = {
            category: formData.category,
            categoryDetail: formData.categoryDetail,
            level: formData.level,
            hasMembershipFee: formData.hasMembershipFee,
            membershipFeeAmount: formData.membershipFeeAmount,
            date: formData.date,
            participantLimit: formData.participantLimit,
            hasGenderRatio: formData.hasGenderRatio,
            ratio: formData.ratio,
            minAge: formData.ageRange[0],
            maxAge: formData.ageRange[1],
            name: formData.name,
            introduction: formData.introduction,
            rules: formData.rules,
            joinQuestions: formData.joinQuestions,
            activityRegion: formData.meetingPlace.addressName,
          };

          // clubRequestDto를 application/json으로 FormData에 추가
          formDataToSend.append(
            'clubRequestDto',
            new Blob([JSON.stringify(clubRequestDto)], {
              type: 'application/json',
            }),
          );

          // 이미지 파일을 FormData에 추가
          formData.imageFiles.forEach((file) => {
            formDataToSend.append('imageFiles', file);
          });

          // FormData의 내용을 확인하는 로그
          for (const pair of formDataToSend.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
          }

          // updateClubData 함수 호출
          await updateClubData(id!, formDataToSend, token);
        } else if (type === 'meeting') {
          const updateData: UpdateMeetingData = {
            title: formData.name,
            description: formData.introduction,
            category: formData.category,
            meetingPlace: {
              name: formData.meetingPlace.name,
              placeUrl: formData.meetingPlace.placeUrl,
              kakaoMapId: formData.meetingPlace.kakaoMapId,
              latitude: formData.meetingPlace.latitude,
              longitude: formData.meetingPlace.longitude,
            },
            participantLimit: formData.participantLimit,
            rule: formData.rules.join(', '),
            joinQuestion: formData.joinQuestions.join(', '),
            schedule: formData.date,
            level: formData.level,
            minimumAge: formData.ageRange[0],
            maximumAge: formData.ageRange[1],
            maleRatio: parseInt(formData.ratio.split(':')[0]),
            femaleRatio: parseInt(formData.ratio.split(':')[1]),
            hasMembershipFee: formData.hasMembershipFee,
            membershipFee: formData.membershipFeeAmount,
            hobby: '등산', // 기본적으로 하드코딩된 값
          };

          const imageFile =
            formData.imageFiles.length > 0 ? formData.imageFiles[0] : null;

          // updateMeetingData 함수 호출
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
        await deleteMeetingData(id!, token);
        alert('모임이 성공적으로 삭제되었습니다.');
        setDisbandText('');
        setDisbandError('');
      } catch (error) {
        console.error('Error deleting data:', error);
        alert('모임 삭제에 실패했습니다.');
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
              name="addressName"
              value={formData.meetingPlace.addressName}
              onChange={handleMeetingPlaceChange}
              placeholder="주소 이름"
              className="block w-full mt-1 p-2 border rounded"
            />
            <input
              name="roadAddressName"
              value={formData.meetingPlace.roadAddressName}
              onChange={handleMeetingPlaceChange}
              placeholder="도로명 주소"
              className="block w-full mt-1 p-2 border rounded"
            />
            <input
              name="latitude"
              value={formData.meetingPlace.latitude.toString()}
              onChange={handleMeetingPlaceChange}
              placeholder="위도"
              className="block w-full mt-1 p-2 border rounded"
            />
            <input
              name="longitude"
              value={formData.meetingPlace.longitude.toString()}
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
