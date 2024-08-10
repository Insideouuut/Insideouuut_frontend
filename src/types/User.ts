export interface AttendedMeeting {
  meetingId: number;
  category: 'MEETING' | 'CLUB';
  meetingName: string;
  meetingImage: string;
  meetingHostNickName: string;
}

export interface HostedMeeting {
  meetingId: number;
  category: 'MEETING' | 'CLUB';
  meetingName: string;
  meetingImage: string;
  meetingHostNickName: string;
}

export interface PendingMeeting {
  meetingId: number;
  category: 'MEETING' | 'CLUB';
  meetingName: string;
  meetingImage: string;
  meetingHostNickName: string;
}

export interface MyProfileResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
  };
  results: {
    userId: number;
    profileImage: string;
    nickName: string;
    mannerRating: number;
    attendedMeetings: AttendedMeeting[];
    hostedMeetings: HostedMeeting[];
    pendingMeetings: PendingMeeting[];
  };
}
