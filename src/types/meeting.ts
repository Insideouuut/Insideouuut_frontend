export interface Host {
  id: number;
  nickname: string;
  profileImage: string;
}

export interface Place {
  name: string;
  placeUrl: string;
  kakaoMapId: number;
  latitude: number;
  longitude: number;
}

export interface Image {
  uploadName: string;
  storeName: string;
}

export interface MeetingListResponse {
  title: string;
  description: string;
  rule: string;
  view: number;
  like: number;
  hasMembershipFee: boolean;
  membershipFee: number;
  progress: string;
  level: string;
  hobby: string;
  category: string;
  schedule: string; // ISO 8601 formatted date string
  participantsNumber: number;
  participantLimit: number;
  maleRatio: number;
  femaleRatio: number;
  minimumAge: number;
  maximumAge: number;
  joinQuestion: string;
  host: Host;
  place: Place;
  images: Image[];
}
