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
  ageRange: number[];
  name: string;
  introduction: string;
  rules: string[];
  images?: File | null;
  joinQuestions: string[];
}

export interface Meeting extends Group {
  meetingPlace: string;
  // meetingPlace: {
  //   name: string;
  //   placeUrl: string;
  //   kakaoMapId: number;
  //   addressName: string;
  //   roadAddressName: string;
  //   latitude: string;
  //   longitude: string;
  // };
}

export interface Club extends Group {
  activityRegion: string;
}
