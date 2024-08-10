// src/types/MemberAuthority.ts

export interface MemberAuthority {
  authority: string;
  message: string;
}

export interface MemberAuthorityApiResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
    pageable: unknown | null;
  };
  results: MemberAuthority[];
}
