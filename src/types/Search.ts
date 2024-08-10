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
  pageable: unknown | null; // `unknown` 타입을 사용하여 유연성을 유지합니다.
}

export interface ApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: Metadata;
  results: Result[];
}
