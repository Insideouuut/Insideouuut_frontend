// src/types/Club.ts

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
