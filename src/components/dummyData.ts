interface Info {
  clubTypes: string[];
  meetingTypes: string[];
  title: string;
  description: string;
  date: string;
  location: string;
  members: {
    current: number;
    total: number;
  };
  imageUrl: string;
  createdAt: string; // 생성 시간 추가
}

export const dummyData: Info[] = [
  {
    clubTypes: ['동아리'],
    meetingTypes: ['운동'],
    title: '한강 러닝 크루',
    description: '20~30대 러닝크루입니다.',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 7,
      total: 8,
    },
    imageUrl: 'https://via.placeholder.com/100',
    createdAt: '2023-07-13T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['모임'],
    meetingTypes: ['사교/취미'],
    title: '이번주 영화보러 가실분',
    description: '인사이드 아웃 보러가실분 계시나요?',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 3,
      total: 8,
    },
    imageUrl: 'https://via.placeholder.com/100',
    createdAt: '2023-07-20T14:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['동아리'],
    meetingTypes: ['스터디'],
    title: '개발 프로젝트 구해요',
    description: '모동 페이지 만드실분?',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 4,
      total: 8,
    },
    imageUrl: 'https://via.placeholder.com/100',
    createdAt: '2023-07-16T09:30:00Z', // 생성 시간
  },
  {
    clubTypes: ['동아리'],
    meetingTypes: ['운동'],
    title: '한강 러닝 크루',
    description: '20~30대 러닝크루입니다.',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 7,
      total: 8,
    },
    imageUrl: 'https://via.placeholder.com/100',
    createdAt: '2023-07-15T16:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['동아리'],
    meetingTypes: ['운동'],
    title: '한강 러닝 크루',
    description: '20~30대 러닝크루입니다.',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 5,
      total: 8,
    },
    imageUrl: 'https://via.placeholder.com/100',
    createdAt: '2023-07-14T11:45:00Z', // 생성 시간
  },
  {
    clubTypes: ['동아리'],
    meetingTypes: ['운동'],
    title: '한강 러닝 크루',
    description: '20~30대 러닝크루입니다.',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 8,
      total: 10,
    },
    imageUrl: 'https://via.placeholder.com/100',
    createdAt: '2023-07-30T13:20:00Z', // 생성 시간
  },
];
