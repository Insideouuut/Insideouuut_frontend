import {
  ClubApiResponse,
  ClubApplicant,
  ClubApplicantApiResponse,
  ClubData,
} from '@/types/Clubs';
import { ApplyForMeetingRequest } from '@/types/Meetings';
import { MemberAuthorityApiResponse } from '@/types/MemberAuthorityResponse';
import axiosInstance from './axiosConfig';

// 동아리에 대한 사용자 권한 확인 API
export const checkClubUserAuthority = async (
  clubId: string,
  token: string,
): Promise<MemberAuthorityApiResponse> => {
  try {
    const response = await axiosInstance.get<MemberAuthorityApiResponse>(
      `/api/clubs/${clubId}/members/authority`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error checking club user authority:', error);
    throw error;
  }
};

// 동아리 단건 조회
export const getClubData = async (id: string): Promise<ClubData> => {
  try {
    const response = await axiosInstance.get<ClubApiResponse>(
      `/api/clubs/${id}`,
    );
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching club data:', error);
    throw error;
  }
};

// 동아리에 대한 사용자 권한 확인 API
export const checkUserAuthority = async (
  clubId: string,
  token: string,
): Promise<MemberAuthorityApiResponse> => {
  try {
    const response = await axiosInstance.get<MemberAuthorityApiResponse>(
      `/api/clubs/${clubId}/members/authority`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error checking user authority:', error);
    throw error;
  }
};

// 동아리 신청자 조회 API
export const getClubApplicants = async (
  clubId: string,
  token: string,
): Promise<ClubApplicant[]> => {
  try {
    const response = await axiosInstance.get<ClubApplicantApiResponse>(
      `/api/clubs/${clubId}/apply`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data.results[0]; // 이중 배열의 첫 번째 배열을 반환
  } catch (error) {
    console.error('Error fetching club applicants:', error);
    throw error;
  }
};

// 동아리 멤버 지원 승인 API
export const acceptClubApplication = async (
  clubId: string,
  applyId: string,
  token: string,
): Promise<void> => {
  try {
    await axiosInstance.post(
      `/api/clubs/${clubId}/apply/${applyId}/accept`,
      null,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    console.log('동아리 멤버 지원이 성공적으로 승인되었습니다.');
  } catch (error) {
    console.error('Error accepting club application:', error);
    throw error;
  }
};

// 동아리 멤버 지원 거절 API
export const rejectClubApplication = async (
  clubId: string,
  applyId: string,
  token: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/clubs/${clubId}/apply/${applyId}/reject`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log('동아리 멤버 지원이 성공적으로 거절되었습니다.');
  } catch (error) {
    console.error('Error rejecting club application:', error);
    throw error;
  }
};

// 동아리 멤버 목록 조회 API
export const getClubMembers = async (
  clubId: string,
  token: string,
): Promise<ClubApplicant[]> => {
  try {
    const response = await axiosInstance.get<ClubApplicantApiResponse>(
      `/api/clubs/${clubId}/members`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data.results[0]; // 첫 번째 배열 반환
  } catch (error) {
    console.error('Error fetching club members:', error);
    throw error;
  }
};

// 동아리 멤버 탈퇴 API
export const removeClubMember = async (
  clubId: string,
  clubUserId: string,
  token: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/clubs/${clubId}/members/${clubUserId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log('동아리 멤버가 성공적으로 탈퇴되었습니다.');
  } catch (error) {
    console.error('Error removing club member:', error);
    throw error;
  }
};

// 동아리 멤버 추방 API
export const expelClubMember = async (
  clubId: string,
  clubUserId: string,
  token: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(
      `/api/clubs/${clubId}/members/${clubUserId}/expel`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    console.log('동아리 멤버가 성공적으로 추방되었습니다.');
  } catch (error) {
    console.error('Error expelling club member:', error);
    throw error;
  }
};

// 동아리 데이터 업데이트 API
export const updateClubData = async (
  clubId: string,
  formDataToSend: FormData, // FormData object instead of separate DTO and file
  token: string,
): Promise<ClubData> => {
  try {
    const response = await axiosInstance.put<ClubApiResponse>(
      `/api/clubs/${clubId}`,
      formDataToSend,
      {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.results[0];
  } catch (error) {
    console.error('Error updating club data:', error);
    throw error;
  }
};

// 동아리 멤버 조회
export const getClubMemberList = async (clubId: string) => {
  const response = await axiosInstance.get(`/api/clubs/${clubId}/members`);
  return response;
};

// 동아리 멤버 신청 API
export const applyForClub = async (
  clubId: string,
  token: string,
  answers: ApplyForMeetingRequest['answers'],
): Promise<void> => {
  try {
    await axiosInstance.post(
      `/api/clubs/${clubId}/apply`,
      { answers },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    console.log('동아리 가입 신청이 성공적으로 이루어졌습니다.');
  } catch (error) {
    console.error('Error applying for club:', error);
    throw error;
  }
};

// 모임 멤버 조회
export const getMeetingMemberList = async (meetingId: string) => {
  const response = await axiosInstance.get(
    `/api/meetings/${meetingId}/members`,
  );
  return response;
};
