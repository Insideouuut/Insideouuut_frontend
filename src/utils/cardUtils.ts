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

export const getColorByMeetingType = (category: string): string => {
  const trimmedCategory = category.trim();

  if (trimmedCategory.includes('사교') || trimmedCategory.includes('취미')) {
    return 'bg-yellow-200 text-yellow-800';
  } else if (trimmedCategory.includes('운동')) {
    return 'bg-blue-200 text-blue-800';
  } else if (trimmedCategory.includes('스터디')) {
    return 'bg-red-200 text-red-800';
  } else {
    console.log(`No match found for category: '${trimmedCategory}'`);
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

export const getLevel = (level: string) => {
  switch (level) {
    case 'BEGINNER':
      return '하';
    case 'INTERMEDIATE':
      return '중';
    case 'ADVANCED':
      return '상';
    default:
      return '무관';
  }
};

// 타입에 따른 색상 반환
export const getColorByLevel = (level: string): string => {
  switch (level) {
    case '상':
      return 'bg-red-200 text-red-800';
    case '중':
      return 'bg-orange-200 text-orange-800';
    case '하':
      return 'bg-yellow-200 text-orange-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};
