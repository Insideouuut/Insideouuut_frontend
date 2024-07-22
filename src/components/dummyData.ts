import gameImg from '@/assets/icons/game.png';
import runImg from '@/assets/icons/run.png';
import studyImg from '@/assets/icons/study.png';

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
    title: '한강 러닝 크루 1',
    description: '20~30대 러닝크루입니다.',
    date: '7월 19일 오후 5시',
    location: '광진구',
    members: {
      current: 7,
      total: 8,
    },
    imageUrl: runImg,
    createdAt: '2023-07-13T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['모임'],
    meetingTypes: ['사교/취미'],
    title: '독서 모임 1',
    description: '매주 독서 토론을 합니다.',
    date: '7월 20일 오후 3시',
    location: '강남구',
    members: {
      current: 5,
      total: 8,
    },
    imageUrl: studyImg,
    createdAt: '2023-07-14T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['동아리'],
    meetingTypes: ['사교/취미'],
    title: '게임 동아리 1',
    description: '다양한 게임을 함께 즐겨요.',
    date: '7월 21일 오후 4시',
    location: '서초구',
    members: {
      current: 10,
      total: 10,
    },
    imageUrl: gameImg,
    createdAt: '2023-07-15T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['모임'],
    meetingTypes: ['운동'],
    title: '조깅 모임 1',
    description: '조깅을 통해 건강을 챙겨요.',
    date: '7월 22일 오전 6시',
    location: '송파구',
    members: {
      current: 8,
      total: 10,
    },
    imageUrl: runImg,
    createdAt: '2023-07-16T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['동아리'],
    meetingTypes: ['스터디'],
    title: '스터디 동아리 1',
    description: '함께 공부하며 지식을 나눠요.',
    date: '7월 23일 오후 2시',
    location: '용산구',
    members: {
      current: 3,
      total: 5,
    },
    imageUrl: studyImg,
    createdAt: '2023-07-17T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['모임'],
    meetingTypes: ['사교/취미'],
    title: '보드게임 모임 1',
    description: '보드게임을 함께 즐겨요.',
    date: '7월 24일 오후 7시',
    location: '종로구',
    members: {
      current: 6,
      total: 8,
    },
    imageUrl: gameImg,
    createdAt: '2023-07-18T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['동아리'],
    meetingTypes: ['운동'],
    title: '한강 러닝 크루 2',
    description: '20~30대 러닝크루입니다.',
    date: '7월 25일 오후 5시',
    location: '광진구',
    members: {
      current: 7,
      total: 8,
    },
    imageUrl: runImg,
    createdAt: '2023-07-19T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['모임'],
    meetingTypes: ['사교/취미'],
    title: '독서 모임 2',
    description: '매주 독서 토론을 합니다.',
    date: '7월 26일 오후 3시',
    location: '강남구',
    members: {
      current: 5,
      total: 6,
    },
    imageUrl: studyImg,
    createdAt: '2023-07-20T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['동아리'],
    meetingTypes: ['사교/취미'],
    title: '게임 동아리 2',
    description: '다양한 게임을 함께 즐겨요.',
    date: '7월 27일 오후 4시',
    location: '서초구',
    members: {
      current: 10,
      total: 10,
    },
    imageUrl: gameImg,
    createdAt: '2023-07-21T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['모임'],
    meetingTypes: ['운동'],
    title: '조깅 모임 2',
    description: '조깅을 통해 건강을 챙겨요.',
    date: '7월 28일 오전 6시',
    location: '송파구',
    members: {
      current: 8,
      total: 10,
    },
    imageUrl: runImg,
    createdAt: '2023-07-22T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['동아리'],
    meetingTypes: ['스터디'],
    title: '스터디 동아리 2',
    description: '함께 공부하며 지식을 나눠요.',
    date: '7월 29일 오후 2시',
    location: '용산구',
    members: {
      current: 3,
      total: 5,
    },
    imageUrl: studyImg,
    createdAt: '2023-07-23T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['모임'],
    meetingTypes: ['사교/취미'],
    title: '보드게임 모임 2',
    description: '보드게임을 함께 즐겨요.',
    date: '7월 30일 오후 7시',
    location: '종로구',
    members: {
      current: 6,
      total: 8,
    },
    imageUrl: gameImg,
    createdAt: '2023-07-24T10:00:00Z', // 생성 시간
  },
  {
    clubTypes: ['동아리'],
    meetingTypes: ['사교/취미'],
    title: '보드게임 할사람',
    description: '보드게임을 함께 즐겨요.',
    date: '7월 30일 오후 7시',
    location: '종로구',
    members: {
      current: 6,
      total: 8,
    },
    imageUrl: gameImg,
    createdAt: '2023-07-25T10:00:00Z', // 생성 시간
  },
];
