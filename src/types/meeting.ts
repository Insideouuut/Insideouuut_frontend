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
