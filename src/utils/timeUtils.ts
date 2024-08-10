// 상대 시간을 포맷하는 함수
export const formatClubTime = (createdAt: string): string => {
  const now = new Date();
  const created = new Date(createdAt);
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
