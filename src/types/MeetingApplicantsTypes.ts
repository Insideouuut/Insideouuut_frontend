export interface ProfileImage {
  name: string;
  url: string;
}

export interface BasicUserResponse {
  nickname: string;
  mannerTemp: number;
  profileImage: ProfileImage;
}

export interface MeetingApplicant {
  basicUserResponse: BasicUserResponse;
  applyId: number;
  answer: string | null;
}

export interface MeetingApplicantsApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
    pageable: unknown | null;
  };
  results: MeetingApplicant[][];
}
