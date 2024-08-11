// src/types/Meetings.ts

export interface Image {
  name: string;
  url: string;
}

export interface ProfileImage {
  name: string;
  url: string;
}

export interface Host {
  id: number;
  nickname: string;
  profileImage: ProfileImage;
}

export interface Place {
  name: string;
  placeUrl: string;
  kakaoMapId: string;
  addressName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
}

export interface Result {
  type: string;
  id: number;
  name: string;
  introduction: string;
  view: number;
  like: number;
  hasMembershipFee: boolean;
  membershipFeeAmount: number;
  progress: string;
  level: string;
  categoryDetail: string;
  category: string;
  date: string;
  participantsNumber: number;
  participantLimit: number;
  ratio: string;
  ageRange: number[];
  rules: string[];
  joinQuestions: string[];
  host: Host;
  place: Place;
  images: Image[];
}

export interface Metadata {
  resultCount: number;
  pageable: unknown | null;
}

export interface ApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: Metadata;
  results: Result[];
}

// 수정된 UpdateMeetingData 인터페이스
export interface UpdateMeetingData {
  name: string;
  introduction: string;
  category: string;
  categoryDetail: string;
  meetingPlace: {
    name: string;
    placeUrl: string;
    kakaoMapId: string;
    addressName: string;
    roadAddressName: string;
    latitude: number;
    longitude: number;
  };
  participantLimit: number;
  rules: string[];
  joinQuestions: string[];
  date: string;
  level: string;
  ageRange: number[];
  hasGenderRatio: string;
  ratio: string;
  hasMembershipFee: boolean;
  membershipFeeAmount: number;
  imageFiles: string[];
}

export interface Answer {
  question: string;
  answer: string;
}

export interface ApplyForMeetingRequest {
  answers: Answer[];
}
