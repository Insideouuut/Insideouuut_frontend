export interface ProfileImage {
  name: string;
  url: string;
}

export interface Member {
  id: number;
  role: string;
  nickName: string;
  profileImage: ProfileImage;
  mannerTemp: number;
}

export interface ApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
    pageable: unknown | null;
  };
  results: Member[][];
}
