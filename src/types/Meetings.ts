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
  title: string;
  description: string;
  category: string;
  meetingPlace: {
    name: string;
    placeUrl: string;
    kakaoMapId: string;
    latitude: number;
    longitude: number;
  };
  participantLimit: number;
  rule: string;
  joinQuestion: string;
  schedule: string;
  level: string;
  minimumAge: number;
  maximumAge: number;
  maleRatio: number;
  femaleRatio: number;
  hasMembershipFee: boolean;
  membershipFee: number;
  hobby: string;
}

export interface Answer {
  question: string;
  answer: string;
}

export interface ApplyForMeetingRequest {
  answers: Answer[];
}
