export const mockUserData = {
  imageUrl: 'https://via.placeholder.com/100',
  email: 'mock@example.com',
  name: '김모동',
  nickname: '김모동모동',
  password: '12345678aB!',
  confirmPassword: '12345678aB!',
  phoneNumber: '010-0000-0000',
  location: '송파구',
  mbti: 'INTJ',
  interests: ['사교/취미'],
  clubIds: [1, 3, 5], // 유저가 참여 중인 모임/동아리의 ID 목록
};

export const emptyUserData = {
  imageUrl: undefined,
  email: undefined,
  name: undefined,
  nickname: undefined,
  password: undefined,
  confirmPassword: undefined,
  phoneNumber: undefined,
  location: undefined,
  mbti: undefined,
  interests: [],
  clubIds: [],
};
