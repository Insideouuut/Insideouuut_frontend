export const formatClubTime = (createdAt: string): string => {
  const now = new Date(); // 현재 로컬 시간
  const created = new Date(createdAt); // 생성된 시간 (UTC로 제공되는 경우)

  // 로컬 시간대와 UTC 시간대의 차이를 계산
  const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전 생성`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes}분 전 생성`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours}시간 전 생성`;
  } else {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return `${diffInDays}일 전 생성`;
  }
};

// 이벤트 시간을 포맷하는 함수
export const formatEventTime = (eventDate: string): string => {
  const now = new Date();
  const event = new Date(eventDate);
  const diffInSeconds = Math.floor((event.getTime() - now.getTime()) / 1000);

  if (diffInSeconds < 0) {
    return '이벤트가 종료되었습니다';
  } else if (diffInSeconds < 60) {
    return `${Math.floor(diffInSeconds)}초 남음`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분 남음`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간 남음`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)}일 남음`;
  }
};

export const formatDate = (createDate: string): string => {
  const date = new Date(createDate);

  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month} ${day}일 ${hours}시 ${minutes}분`;
};
