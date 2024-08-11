import { ProfileMeetingResponse } from '@/api/Apis';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import { useFetchProfile } from './useFetchProfile';

const MyModong: React.FC = () => {
  const { profile, loading, error } = useFetchProfile();
  console.log(profile);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile: {error}</div>;

  const {
    attendedMeetings = [],
    closedMeetings = [],
    pendingMeetings = [],
  } = profile || {};

  const changeType = (category: string) => {
    if (category === 'MEETING') return '모임';
    else return '동아리';
  };
  return (
    <div className="relative flex flex-col items-center ">
      {/* 승인 대기중인 모임/동아리 */}
      <div>
        <Table className="mb-20">
          <TableCaption className="font-neoExtraBold text-lg  mb-4 text-primary">
            승인 대기중인 모임/동아리
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]"></TableHead>
              <TableHead>이름</TableHead>
              <TableHead>타입</TableHead>
              <TableHead className="text-right">호스트</TableHead>
            </TableRow>
          </TableHeader>
          {pendingMeetings.map((meeting: ProfileMeetingResponse, index) => (
            <TableBody key={index} className="font-bold">
              <TableRow>
                <TableCell>
                  <img
                    src={meeting.meetingImage}
                    alt={meeting.meetingName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{meeting.meetingName}</TableCell>
                <TableCell>{changeType(meeting.category || '')}</TableCell>
                <TableCell className="text-right">
                  {meeting.meetingHostNickName}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>

      {/* 참석한 모임/동아리 */}
      <div>
        <Table className="mb-20">
          <TableCaption className="font-neoExtraBold m-4 text-lg  text-primary">
            참석한 모임/동아리
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]"></TableHead>
              <TableHead>이름</TableHead>
              <TableHead>타입</TableHead>
              <TableHead className="text-right">호스트</TableHead>
            </TableRow>
          </TableHeader>
          {attendedMeetings.map((meeting: ProfileMeetingResponse, index) => (
            <TableBody key={index} className="font-bold">
              <TableRow>
                <TableCell>
                  <img
                    src={meeting.meetingImage}
                    alt={meeting.meetingName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{meeting.meetingName}</TableCell>
                <TableCell>{changeType(meeting.category || '')}</TableCell>
                <TableCell className="text-right">
                  {meeting.meetingHostNickName}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>

      {/* 종료된 모임/동아리 */}
      <div>
        <Table className="mb-10">
          <TableCaption className="font-neoExtraBold text-lg m-4 text-primary">
            종료된 모임/동아리
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]"></TableHead>
              <TableHead>이름</TableHead>
              <TableHead>타입</TableHead>
              <TableHead className="text-right">호스트</TableHead>
            </TableRow>
          </TableHeader>
          {closedMeetings.map((meeting: ProfileMeetingResponse, index) => (
            <TableBody key={index} className="font-bold">
              <TableRow>
                <TableCell>
                  <img
                    src={meeting.meetingImage}
                    alt={meeting.meetingName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{meeting.meetingName}</TableCell>
                <TableCell>{changeType(meeting.category || '')}</TableCell>
                <TableCell className="text-right">
                  {meeting.meetingHostNickName}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default MyModong;
