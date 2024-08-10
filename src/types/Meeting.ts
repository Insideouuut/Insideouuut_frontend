// src/types/Meeting.ts

export interface Host {
  nickname: string;
  profileImageUrl: string;
}

export interface Image {
  name: string;
  url: string;
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

export interface MeetingListResponse {
  title: string;
  description: string;
  category: string;
  categoryDetails: string;
  view: number;
  like: number;
  progress: string;
  level: string;
  schedule: string;
  hasMembershipFee: boolean;
  membershipFee: number;
  participantsNumber: number;
  participantLimit: number;
  MaleRatio: number;
  FemaleRatio: number;
  minimumAge: number;
  maximumAge: number;
  rule: string;
  joinquestion: string;
  host: Host;
  images: Image[];
  meetingPlace: MeetingPlace;
}

// 추가적으로 필요할 수 있는 다른 타입들

export interface MeetingApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
    pageable: unknown | null;
  };
  results: MeetingListResponse[];
}

export interface MeetingDetailResponse extends MeetingListResponse {
  id: number;
  type: string;
  participants: {
    nickname: string;
    profileImageUrl: string;
  }[];
}

// 예를 들어, 모임 단건 조회 API의 결과를 담는 타입
export interface SingleMeetingResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
    pageable: unknown | null;
  };
  results: MeetingDetailResponse[];
}
