// src/types/Clubs.ts

export interface ProfileImage {
  name: string;
  url: string;
}

export interface Host {
  id: number;
  nickname: string;
  profileImage: ProfileImage;
}

export interface Image {
  name: string;
  url: string;
}

export interface ClubData {
  id: number;
  name: string;
  introduction: string;
  type: string;
  chatRoomId: number;
  activityRegion: string;
  createdAt: string;
  view: number;
  like: number;
  hasMembershipFee: boolean;
  membershipFeeAmount: number;
  isRecruiting: boolean;
  level: string;
  category: string;
  categoryDetail: string;
  date: string;
  participantNumber: number;
  participantLimit: number;
  genderRatio: string;
  ageRange: number[];
  rules: string[];
  joinQuestions: string[];
  host: Host;
  images: Image[];
}

export interface ClubApplicant {
  applyId: number;
  userName: string;
  profileImgUrl: string;
  mannerTemp: number;
  answer: string | null;
}

export interface ClubApplicantApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
    pageable: null | object;
  };
  results: ClubApplicant[][];
}

export interface ClubMember {
  role: string;
  userName: string;
  profileImgUrl: string;
  mannerTemp: number;
}

export interface ClubMembersApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
    pageable: null | object;
  };
  results: ClubMember[][];
}

export interface ClubApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
    pageable: null | object;
  };
  results: ClubData[];
}

export interface ClubSearchResult {
  id: number;
  name: string;
  introduction: string;
  type: string;
  chatRoomId: number;
  activityRegion: string;
  createdAt: string;
  view: number;
  like: number;
  hasMembershipFee: boolean;
  membershipFeeAmount: number;
  isRecruiting: boolean;
  level: string;
  category: string;
  categoryDetail: string;
  date: string;
  participantNumber: number;
  participantLimit: number;
  genderRatio: string;
  ageRange: number[];
  rules: string[];
  joinQuestions: string[];
  host: Host;
  images: Image[];
}

export interface ClubSearchApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
    pageable: null | object;
  };
  results: {
    clubSearchResults: ClubSearchResult[];
    meetingSearchResults: ClubSearchResult[];
  }[];
}

export interface ClubApplicant {
  applyId: number; // 신청자 ID
  userName: string; // 신청자 이름
  profileImgUrl: string; // 프로필 이미지 URL
  mannerTemp: number; // 매너 온도
  answers: string[]; // 질문에 대한 대답
}

export interface ClubRequestDto {
  name: string;
  category: string;
  categoryDetail: string;
  level: string;
  hasMembershipFee: boolean;
  membershipFeeAmount: number;
  date: string;
  participantLimit: number;
  hasGenderRatio: string;
  ratio: string;
  minAge: number;
  maxAge: number;
  introduction: string;
  rules: string[];
  joinQuestions: string[];
  activityRegion: string;
}

export interface UpdateClubDataRequest {
  clubRequestDto: ClubRequestDto;
  imageFiles: File[]; // 수정된 부분
}


export interface ClubApplicantDetail {
  applyId: number;       // 신청서 ID
  question: string;      // 신청서 질문
  answer: string;        // 신청서 답변
}

export interface ClubApplicantApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
    pageable: null | object;
  };
  result: ClubApplicantDetail[][];  // 이중 배열
}

export interface ClubApplicant {
  clubUserId: number;  // 새로 추가된 속성
  role: string;        // 새로 추가된 속성
  userName: string;
  profileImgUrl: string;
  mannerTemp: number;
  // 필요한 다른 속성들 추가
}