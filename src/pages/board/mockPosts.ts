// src/data/mockPosts.ts

export const mockPosts = [
  {
    id: 1,
    title: '제목1',
    author: '글쓴이1',
    profileImageUrl: 'https://profileImage.com',
    description: '내용1',
    createdAt: '3분 전',
    views: 150,
    category: 'reviewBoard',
    images: [
      { name: 'imageName1', url: 'https://imageUrl1.com' },
      { name: 'imageName2', url: 'https://imageUrl2.com' },
    ],
    comments: [
      { author: '사용자1', content: '내용1' },
      { author: '사용자2', content: '내용2' },
    ],
  },
  {
    id: 2,
    title: '제목2',
    author: '글쓴이2',
    profileImageUrl: 'https://profileImage.com',
    description: '내용2',
    createdAt: '13분 전',
    views: 230,
    category: 'questionBoard',
    images: [
      { name: 'imageName1', url: 'https://imageUrl1.com' },
      { name: 'imageName2', url: 'https://imageUrl2.com' },
    ],
    comments: [
      { author: '사용자1', content: '내용1' },
      { author: '사용자2', content: '내용2' },
    ],
  },
  {
    id: 3,
    title: '제목3',
    author: '글쓴이3',
    profileImageUrl: 'https://profileImage.com',
    description: '내용3',
    createdAt: '14분 전',
    views: 230,
    category: 'freeBoard',
    images: [
      { name: 'imageName1', url: 'https://imageUrl1.com' },
      { name: 'imageName2', url: 'https://imageUrl2.com' },
    ],
    comments: [
      { author: '사용자1', content: '내용1' },
      { author: '사용자2', content: '내용2' },
    ],
  },
  {
    id: 4,
    title: '제목4',
    author: '글쓴이4',
    profileImageUrl: 'https://profileImage.com',
    description: '내용4',
    createdAt: '15분 전',
    views: 230,
    category: 'noticeBoard',
    images: [
      { name: 'imageName1', url: 'https://imageUrl1.com' },
      { name: 'imageName2', url: 'https://imageUrl2.com' },
    ],
    comments: [
      { author: '사용자1', content: '내용1' },
      { author: '사용자2', content: '내용2' },
    ],
  },
  // 추가 목업 데이터
];
