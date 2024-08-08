// src/types/Search.ts

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
    type: string; // 추가된 부분
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
  
  export interface ApiResponse {
    status: {
      code: number;
      message: string;
    };
    metadata: {
      resultCount: number;
      pageable: null | any;
    };
    results: Result[];
  }
  