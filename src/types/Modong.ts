export interface Group {
  category: string;
  categoryDetail: string;
  level: string;
  hasMembershipFee: boolean;
  membershipFeeAmount: number;
  date: string;
  participantLimit: number;
  hasGenderRatio: string;
  ratio: string;
  name: string;
  introduction: string;
  rules: string[];
  joinQuestions: string[];
}

export interface MeetingPlace {
  name: string;
  placeUrl: string;
  kakaoMapId: string;
  addressName: string;
  roadAddressName: string;
  latitude: string;
  longitude: string;
}

export interface Meeting extends Group {
  meetingPlace: MeetingPlace;
  ageRange: number[];
}

export interface MeetingRequest {
  request: Meeting;
  imageFiles: FormData;
}

export interface Club extends Group {
  activityRegion: string;
  minAge: number;
  maxAge: number;
}

export interface ClubRequest {
  request: Club;
  imageFiles: FormData;
}
