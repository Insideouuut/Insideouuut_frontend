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

export interface ProfileImage {
  name: string; // ProfileImage에 name 필드가 필요하다면 유지
  url: string;
}

export interface Member {
  id: number;
  role: string;
  nickName: string;
  profileImage: ProfileImage;
  mannerTemp: number;
}
