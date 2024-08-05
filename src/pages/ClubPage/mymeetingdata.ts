export interface Info {
    title: string;
    description: string;
    location: string;
    currentMembers: number;
    memberLimit: number;
    date: string;
    fee: number; // fee 필드를 추가합니다.
  }
  
  const mymeetingdata: Info[] = [
    {
      title: '조깅 모임 1',
      description: '한강공원에서 함께 조깅해요!',
      location: '서울특별시 마포구',
      currentMembers: 10,
      memberLimit: 15,
      date: '2024-08-01 오후 6:00',
      fee: 0,
    },
    {
      title: '조깅 모임 2',
      description: '조깅 후 스트레칭도 함께해요.',
      location: '서울특별시 성동구',
      currentMembers: 8,
      memberLimit: 12,
      date: '2024-08-03 오전 7:00',
      fee: 5000,
    },
    {
      title: '조깅 모임 3',
      description: '아침 조깅으로 상쾌한 하루 시작!',
      location: '서울특별시 성북구',
      currentMembers: 15,
      memberLimit: 20,
      date: '2024-08-05 오전 6:00',
      fee: 0,
    },
    {
      title: '조깅 모임 4',
      description: '한강 야경을 보며 조깅해요.',
      location: '서울특별시 서초구',
      currentMembers: 12,
      memberLimit: 15,
      date: '2024-08-07 오후 8:00',
      fee: 5000,
    },
    {
      title: '조깅 모임 5',
      description: '주말 오전 조깅, 함께해요!',
      location: '서울특별시 송파구',
      currentMembers: 7,
      memberLimit: 10,
      date: '2024-08-10 오전 8:00',
      fee: 0,
    },
    {
      title: '조깅 모임 6',
      description: '저녁 조깅 후 간단한 간식 시간.',
      location: '서울특별시 강남구',
      currentMembers: 9,
      memberLimit: 12,
      date: '2024-08-12 오후 7:30',
      fee: 5000,
    },
    {
      title: '조깅 모임 7',
      description: '건강한 조깅으로 체력 길러요!',
      location: '서울특별시 종로구',
      currentMembers: 10,
      memberLimit: 15,
      date: '2024-08-14 오후 5:30',
      fee: 0,
    },
    {
      title: '조깅 모임 8',
      description: '새벽 조깅으로 활기찬 하루!',
      location: '서울특별시 강북구',
      currentMembers: 5,
      memberLimit: 10,
      date: '2024-08-16 오전 6:00',
      fee: 5000,
    },
    {
      title: '조깅 모임 9',
      description: '도심 속 조깅, 함께 달려요.',
      location: '서울특별시 중구',
      currentMembers: 12,
      memberLimit: 18,
      date: '2024-08-18 오후 7:00',
      fee: 0,
    },
    {
      title: '조깅 모임 10',
      description: '한강변을 따라 함께 조깅해요.',
      location: '서울특별시 용산구',
      currentMembers: 11,
      memberLimit: 14,
      date: '2024-08-20 오후 6:30',
      fee: 5000,
    },
  ];
  
  export default mymeetingdata;
  