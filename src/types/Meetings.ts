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
  chatRoomId: string;
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

// 추가된 타입
export interface ApplyForMeetingResponse {
  applyId: number;
  question: string;
  answer: string;
}

// API 응답 타입
export interface MeetingApplicantApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: Metadata;
  results: ApplyForMeetingResponse[][];
}

export interface MeetingPlace {
  name: string;
  placeUrl: string;
  kakaoMapId: string;
  address_name: string;
  road_address_name: string;
  latitude: string;
  longitude: string;
}

export interface UpdateMeetingData {
  type: string;
  name: string;
  introduction: string;
  category: string;
  categoryDetail: string;
  meetingPlace: MeetingPlace;
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

// 추가된 타입
export interface ApplyForMeetingRequest {
  answers: Answer[];
}

// 삭제된 타입: result 메서드에서 any를 명확한 타입으로 대체
export interface Result {
  type: string;
  id: number;
  name: string;
  introduction: string;
  chatRoomId: string;
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

export interface Answer {
  question: string;
  answer: string;
}

export interface ApplyForMeetingResponse {
  applyId: number;
  question: string;
  answer: string;
}
