export interface ClubData {
  clubTypes: string[];
  meetingTypes: string[];
  imageUrl: string;
  name: string;
  description: string;
  date: string;
  location: string;
  memberCount: number;
  memberLimit: number;
  role: '관리자' | '일반 회원';
  backgroundColor: string;
  backgroundImage: string;
}
