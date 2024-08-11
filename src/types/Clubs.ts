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
