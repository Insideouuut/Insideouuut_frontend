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

export interface ClubResult {
  id: number;
  name: string;
  introduction: string;
  type: string;
  view: number;
  like: number;
  hasMembershipFee: boolean;
  membershipFeeAmount: number;
  isRecruiting: boolean;
  level: string;
  categoryDetail: string;
  category: string;
  date: string;
  participantNumber: number;
  participantLimit: number;
  genderRatio: string;
  ageRange: number[];
  rules: string[];
  joinQuestions: string[];
  host: Host;
  activityRegion: string;
  images: Image[];
}

export interface MeetingResult {
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
    clubSearchResults: ClubResult[];
    meetingSearchResults: MeetingResult[];
  };
}

export interface ApiResponseForSpecific {
  status: {
    code: number;
    message: string;
  };
  metadata: Metadata;
  results: (ClubResult | MeetingResult)[];
}
