// ClubDataPage.tsx
import React, { useState, useEffect } from 'react';
import { getClubData } from '@/api/meetingApi'; // 경로는 필요에 따라 조정하세요
import { Result } from '@/types/Meetings';

const ClubDataPage = () => {
  const [clubData, setClubData] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const clubId = '1'; // 임의로 1로 지정

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const data = await getClubData(clubId);
        setClubData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('알 수 없는 오류가 발생했습니다.'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;

  return (
    <div>
      <h1>클럽 데이터</h1>
      {clubData ? (
        <div>
          <h2>{clubData.name}</h2>
          <p>설명: {clubData.introduction}</p>
          <p>조회수: {clubData.view}</p>
          <p>좋아요: {clubData.like}</p>
          <p>회비: {clubData.hasMembershipFee ? `${clubData.membershipFeeAmount}원` : '없음'}</p>
          <p>진행 상태: {clubData.progress}</p>
          <p>레벨: {clubData.level}</p>
          <p>카테고리: {clubData.categoryDetail} ({clubData.category})</p>
          <p>일정: {new Date(clubData.date).toLocaleString()}</p>
          <p>참가자 수: {clubData.participantsNumber}/{clubData.participantLimit}</p>
          <p>성비: {clubData.ratio}</p>
          <p>연령대: {clubData.ageRange.join(', ')}</p>
          <h3>규칙</h3>
          <ul>
            {clubData.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
          <h3>가입 질문</h3>
          <ul>
            {clubData.joinQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
          <h3>호스트 정보</h3>
          <p>ID: {clubData.host.id}</p>
          <p>닉네임: {clubData.host.nickname}</p>
          {clubData.host.profileImage && <img src={clubData.host.profileImage.url} alt="Host Profile" />}
          <h3>장소 정보</h3>
          <p>이름: {clubData.place.name}</p>
          <p>지도 링크: <a href={clubData.place.placeUrl} target="_blank" rel="noopener noreferrer">{clubData.place.placeUrl}</a></p>
          <p>위도: {clubData.place.latitude}</p>
          <p>경도: {clubData.place.longitude}</p>
          <h3>이미지</h3>
          {clubData.images.map((image, index) => (
            <img key={index} src={image.url} alt={`Club Image ${index + 1}`} />
          ))}
        </div>
      ) : (
        <p>데이터를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default ClubDataPage;
