import gameImg from '@/assets/icons/game.png';
import runImg from '@/assets/icons/run.png';
import studyImg from '@/assets/icons/study.png';

interface Info {
  id: number; // 고유 ID 추가
  clubTypes: string[];
  meetingTypes: string[];
  name: string;
  description: string;
  date: string;
  location: string;
  memberCount: number;
  memberLimit: number;
  imageUrl: string;
  createdAt: string;
}

export const dummyData: Info[] = [
  {
    id: 1,
    clubTypes: ['동아리'],
    meetingTypes: ['운동'],
    name: '한강 러닝 크루 1',
    description: '20~30대 러닝크루입니다.',
    date: '7월 19일 오후 5시',
    location: '광진구',
    memberCount: 7,
    memberLimit: 8,
    imageUrl: runImg,
    createdAt: '2023-07-13T10:00:00Z',
  },
  {
    id: 2,
    clubTypes: ['모임'],
    meetingTypes: ['사교/취미'],
    name: '독서 모임 1',
    description: '매주 독서 토론을 합니다.',
    date: '7월 20일 오후 3시',
    location: '강남구',
    memberCount: 5,
    memberLimit: 8,
    imageUrl: studyImg,
    createdAt: '2023-07-14T10:00:00Z',
  },
  {
    id: 3,
    clubTypes: ['동아리'],
    meetingTypes: ['사교/취미'],
    name: '게임 동아리 1',
    description: '다양한 게임을 함께 즐겨요.',
    date: '7월 21일 오후 4시',
    location: '서초구',
    memberCount: 10,
    memberLimit: 10,
    imageUrl: gameImg,
    createdAt: '2023-07-15T10:00:00Z',
  },
  {
    id: 4,
    clubTypes: ['모임'],
    meetingTypes: ['운동'],
    name: '조깅 모임 1',
    description: '조깅을 통해 건강을 챙겨요.',
    date: '7월 22일 오전 6시',
    location: '송파구',
    memberCount: 8,
    memberLimit: 10,
    imageUrl: runImg,
    createdAt: '2023-07-16T10:00:00Z',
  },
  {
    id: 5,
    clubTypes: ['동아리'],
    meetingTypes: ['스터디'],
    name: '스터디 동아리 1',
    description: '함께 공부하며 지식을 나눠요.',
    date: '7월 23일 오후 2시',
    location: '용산구',
    memberCount: 3,
    memberLimit: 5,
    imageUrl: studyImg,
    createdAt: '2023-07-17T10:00:00Z',
  },
  // ... 추가 데이터
];
