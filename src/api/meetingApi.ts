import {
  MeetingApplicant,
  MeetingApplicantsApiResponse,
} from '@/types/MeetingApplicantsTypes';
import {
  ApplyForMeetingRequest,
  ApplyForMeetingResponse,
  ApiResponse as MeetingApiResponse,
  MeetingApplicantApiResponse,
  Result,
  UpdateMeetingData,
} from '@/types/Meetings';
import { Member, ApiResponse as MemberApiResponse } from '@/types/Member';
import { MemberAuthorityApiResponse } from '@/types/MemberAuthorityResponse';
import axiosInstance from './axiosConfig';

// 모임 참여 신청서 상세 조회 API
export const getMeetingApplicationDetails = async (
  applyId: string,
  token: string,
): Promise<ApplyForMeetingResponse[]> => {
  try {
    const response = await axiosInstance.get<MeetingApplicantApiResponse>(
      `/api/meetings/apply/${applyId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data.results[0]; // 응답 결과 배열 중 첫 번째 배열을 반환합니다.
  } catch (error) {
    console.error('Error fetching meeting application details:', error);
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

// 모임 단건 조회 API
export const getMeetingData = async (id: string): Promise<Result> => {
  try {
    const response = await axiosInstance.get<MeetingApiResponse>(
      `/api/meetings/${id}`,
    );
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching meeting data:', error);
    throw error;
  }
};

// 모임 삭제 API
export const deleteMeetingData = async (
  id: string,
  token: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/meetings/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log('모임이 성공적으로 삭제되었습니다.');
  } catch (error) {
    console.error('Error deleting meeting data:', error);
    throw error;
  }
};

export const updateMeetingData = async (
  id: string,
  data: UpdateMeetingData,
  imageFile: File | null, // 이미지 파일을 추가할 수 있도록 파라미터 추가
  token: string,
): Promise<Result> => {
  try {
    const formData = new FormData();

    // JSON 데이터를 포함한 폼 데이터 생성
    formData.append(
      'request',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }),
    );

    // 이미지 파일이 있으면 FormData에 추가
    if (imageFile) {
      formData.append('imageFiles', imageFile);
    }

    const response = await axiosInstance.patch<MeetingApiResponse>(
      `/api/meetings/${id}`,
      formData,
      {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data.results[0];
  } catch (error) {
    console.error('Error updating meeting data:', error);
    throw error;
  }
};

// 모임 종료 API
export const endMeeting = async (id: string, token: string): Promise<void> => {
  try {
    await axiosInstance.patch(`/api/meetings/${id}/end`, null, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log('모임이 성공적으로 종료되었습니다.');
  } catch (error) {
    console.error('Error ending meeting:', error);
    throw error;
  }
};

// 모임에 대한 사용자 권한 확인 API
export const checkMeetingUserAuthority = async (
  meetingId: string,
  token: string,
): Promise<MemberAuthorityApiResponse> => {
  try {
    const response = await axiosInstance.get<MemberAuthorityApiResponse>(
      `/api/meetings/${meetingId}/members/authority`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error checking meeting user authority:', error);
    throw error;
  }
};

// 모임 참여 신청자 조회 API
export const getMeetingApplicants = async (
  id: string,
  token: string,
): Promise<MeetingApplicant[]> => {
  try {
    const response = await axiosInstance.get<MeetingApplicantsApiResponse>(
      `/api/meetings/${id}/apply`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data.results[0]; // 결과 배열 중 첫 번째 배열을 반환
  } catch (error) {
    console.error('Error fetching meeting applicants:', error);
    throw error;
  }
};

export const applyForMeeting = async (
  id: string,
  token: string,
  answers: ApplyForMeetingRequest['answers'],
): Promise<void> => {
  try {
    await axiosInstance.post(
      `/api/meetings/${id}/apply`,
      { answers },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    console.log('모임 참여 신청이 성공적으로 이루어졌습니다.');
  } catch (error) {
    console.error('Error applying for meeting:', error);
    throw error;
  }
};

// 모임 참여 수락 API
export const acceptMeetingApplication = async (
  applyId: string,
  token: string,
): Promise<void> => {
  try {
    await axiosInstance.post(`/api/meetings/apply/${applyId}/accept`, null, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log('모임 참여 신청이 성공적으로 수락되었습니다.');
  } catch (error) {
    console.error('Error accepting meeting application:', error);
    throw error;
  }
};

// 모임 참여 거부 API
export const rejectMeetingApplication = async (
  applyId: string,
  token: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/meetings/apply/${applyId}/reject`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log('모임 참여 신청이 성공적으로 거부되었습니다.');
  } catch (error) {
    console.error('Error rejecting meeting application:', error);
    throw error;
  }
};

// 모임 멤버 조회 API
export const getMeetingMembers = async (
  id: string,
  token: string,
): Promise<Member[]> => {
  try {
    const response = await axiosInstance.get<MemberApiResponse>(
      `/api/meetings/${id}/members`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data.results[0]; // 필요한 데이터 형식에 맞게 반환
  } catch (error) {
    console.error('Error fetching meeting members:', error);
    throw error;
  }
};

// 모임 멤버 추방 API
export const expelMember = async (
  userId: string,
  token: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/meetings/members/${userId}/expel`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log('멤버가 성공적으로 추방되었습니다.');
  } catch (error) {
    console.error('Error expelling member:', error);
    throw error;
  }
};
