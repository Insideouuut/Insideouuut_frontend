interface Info {
  title: string;
  description: string;
  date: string;
  location: string;
  members: {
    current: number;
    total: number;
  };
  tags: string[];
  imageUrl: string;
}

export const dummyData: Info[] = [
  {
    title: '한강 러닝 크루',
    description: '20~30대 러닝크루입니다.',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 7,
      total: 8,
    },
    tags: ['동아리', '운동', '마감임박'],
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    title: '이번주 영화보러 가실분',
    description: '인사이드 아웃 보러가실분 계시나요?',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 7,
      total: 8,
    },
    tags: ['모임', '사교/취미', '마감임박'],
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    title: '개발 프로젝트 구해요',
    description: '모동 페이지 만드실분?',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 7,
      total: 8,
    },
    tags: ['모임', '공부'],
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    title: '한강 러닝 크루',
    description: '20~30대 러닝크루입니다.',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 7,
      total: 8,
    },
    tags: ['동아리', '운동', '마감임박'],
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    title: '한강 러닝 크루',
    description: '20~30대 러닝크루입니다.',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 7,
      total: 8,
    },
    tags: ['동아리', '운동', '마감임박'],
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    title: '한강 러닝 크루',
    description: '20~30대 러닝크루입니다.',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 7,
      total: 8,
    },
    tags: ['동아리', '운동', '마감임박'],
    imageUrl: 'https://via.placeholder.com/100',
  },
];
