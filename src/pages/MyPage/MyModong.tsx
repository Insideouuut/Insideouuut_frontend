import { dummyData } from '@/components/dummyData';
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
import { mockUserData } from './mockUserData';

const MyModong: React.FC = () => {
  const userMoDongIds = mockUserData.clubIds;
  const userMoDongs = dummyData.filter((modong) =>
    userMoDongIds.includes(modong.id),
  );

  return (
    <div className="relative flex flex-col items-center ">
      <div>
        <Table>
          <TableCaption className="font-neoExtraBold m-4">
            승인 대기중인 모임/동아리
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">이름</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>인원</TableHead>
              <TableHead className="text-right">위치</TableHead>
            </TableRow>
          </TableHeader>
          {userMoDongs.map((modong) => (
            <TableBody key={modong.id} className="font-bold">
              <TableRow>
                <TableCell>{modong.name}</TableCell>
                <TableCell>{modong.description}</TableCell>
                <TableCell>
                  {modong.memberCount} / {modong.memberLimit}
                </TableCell>
                <TableCell className="text-right">잠실동</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default MyModong;
