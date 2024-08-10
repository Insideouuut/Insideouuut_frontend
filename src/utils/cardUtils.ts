// 타입에 따른 색상 반환
export const getColorByType = (type: string): string => {
  switch (type) {
    case '동아리':
      return 'bg-green-200 text-green-800';
    case '모임':
      return 'bg-gray-200 text-gray-800';
    default:
      return '';
  }
};

// 모임 카테고리에 따른 색상 반환
export const getColorByMeetingType = (category: string): string => {
  switch (category) {
    case '사교/취미':
      return 'bg-yellow-200 text-yellow-800';
    case '운동':
      return 'bg-blue-200 text-blue-800';
    case '스터디':
      return 'bg-purple-200 text-purple-800';
    default:
      return '';
  }
};

// 카테고리에 따른 기본 이미지 반환
export const getDefaultImageByCategory = (category: string): string => {
  switch (category) {
    case '사교/취미':
      return 'https://img.freepik.com/free-vector/hand-drawn-business-communication-concept_52683-76159.jpg?t=st=1723291187~exp=1723294787~hmac=33c5cd0b2c2ec164cb7dc4791b373c547b7b01ebcdcf8b2c88f6fbb7cd5ab7fd&w=996';
    case '운동':
      return 'https://img.freepik.com/free-vector/stretching-exercises-concept-illustration_114360-8922.jpg?t=st=1723291153~exp=1723294753~hmac=d3e3f118211a6b5fbe716604a75bd97539e3f34d54ef8847231ce3dd8a25dc2c&w=996';
    case '스터디':
      return 'https://img.freepik.com/free-vector/student-with-laptop-studying-online-course_74855-5293.jpg?t=st=1723291128~exp=1723294728~hmac=091e3ed23dadbc1bc1ddf3d1f8fd72a4d81a794afc6cb014bde7ac71ce9bfcab&w=996';
    default:
      return '';
  }
};

// 타입에 따른 영문 변환
export const getLinkByType = (type: string) => {
  switch (type) {
    case '동아리':
      return 'club';
    case '모임':
      return 'meeting';
    default:
      return '';
  }
};
