import { dummyData } from '@/components/dummyData';
import React from 'react';

const MeetingList: React.FC = () => {
  return (
    <div className=" flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <div className=" overflow-x-auto">
        <h2 className=" text-xl font-neobold mb-6 text-left">모임 목록</h2>
        <table className="min-w-full bg-white border-y-2">
          <thead>
            <tr>
              <th className="py-3 px-5 border-b">제목</th>
              <th className="py-3 px-5 border-b">설명</th>
              <th className="py-3 px-5 border-b">장소</th>
              <th className="py-3 px-5 border-b">인원</th>
              <th className="py-3 px-5 border-b">일시</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((meeting, index) => (
              <tr key={index} className="cursor-pointer hover:bg-gray-100">
                <td className="py-3 px-5 border-b text-gray-800">
                  {meeting.name}
                </td>
                <td className="py-3 px-5 border-b text-gray-600">
                  {meeting.description}
                </td>
                <td className="py-3 px-5 border-b text-gray-500">
                  {meeting.location}
                </td>
                <td className="py-3 px-5 border-b text-gray-500">
                  {meeting.memberCount}/{meeting.memberLimit}
                </td>
                <td className="py-3 px-5 border-b text-gray-500">
                  {meeting.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingList;