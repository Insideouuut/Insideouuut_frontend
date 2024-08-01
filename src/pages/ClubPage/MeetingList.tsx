import React from 'react';
import Data, { Info } from './joggingdata';

const MeetingList: React.FC = () => {
  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <div className="overflow-x-auto">
        <h2 className="text-xl font-bold mb-6 text-left">모임 목록</h2>
        <table className="min-w-full bg-white border-y-2">
          <thead>
            <tr>
              <th className="py-2 px-5 border-b text-lg">제목</th>
              <th className="py-2 px-5 border-b text-lg">설명</th>
              <th className="py-2 px-5 border-b text-lg">장소</th>
              <th className="py-2 px-5 border-b text-lg">인원</th>
              <th className="py-2 px-5 border-b text-lg">일시</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((meeting: Info, index: number) => (
              <tr key={index} className="cursor-pointer hover:bg-gray-100">
                <td className="py-3 px-5 border-b text-sm text-gray-800">
                  {meeting.title}
                </td>
                <td className="py-3 px-5 border-b text-sm text-gray-600">
                  {meeting.description.length > 10
                    ? `${meeting.description.slice(0, 10)}...`
                    : meeting.description}
                </td>
                <td className="py-3 px-5 border-b text-sm text-gray-500">
                  {meeting.location}
                </td>
                <td className="py-3 px-5 border-b text-center text-sm text-gray-500">
                  {meeting.currentMembers}/{meeting.memberLimit}
                </td>
                <td className="py-3 px-5 border-b text-sm text-gray-500">
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
