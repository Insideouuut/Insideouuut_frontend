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
  addressName: string | null;
  roadAddressName: string | null;
  latitude: number;
  longitude: number;
}

export interface Result {
  clubSearchResults: never[];
  meetingSearchResults: never[];
  id: number;
  name: string;
  introduction: string;
  type: string;
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

export interface ApiResponseForAll {
  status: {
    code: number;
    message: string;
  };
  metadata: Metadata;
  results: {
    clubSearchResults: Result[];
    meetingSearchResults: Result[];
  };
}

export interface ApiResponseForSpecific {
  status: {
    code: number;
    message: string;
  };
  metadata: Metadata;
  results: Result[];
}
