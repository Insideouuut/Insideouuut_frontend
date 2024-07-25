import React from 'react';
import { dummyData } from '@/components/dummyData';

const MeetingList: React.FC = () => {
  return (
    <div className=" min-h-screen">
      <div className=" mx-auto border-2 p-6 rounded-lg">
        <div className=" p-4 rounded-lg ">
          <div className="overflow-x-auto">
          <h2 className="text-xl font-neobold mb-6 text-left">모임 목록</h2>
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
                    <td className="py-3 px-5 border-b text-gray-800">{meeting.title}</td>
                    <td className="py-3 px-5 border-b text-gray-600">{meeting.description}</td>
                    <td className="py-3 px-5 border-b text-gray-500">{meeting.location}</td>
                    <td className="py-3 px-5 border-b text-gray-500">
                      {meeting.members.current}/{meeting.members.total}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-500">{meeting.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingList;
