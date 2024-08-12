// src/pages/ClubPage/ClubMain.tsx

import { ClubData } from '@/types/Clubs';
import { Result } from '@/types/Meetings';
import React from 'react';

interface ClubMainProps {
  data: ClubData | Result;
}

const ClubMain: React.FC<ClubMainProps> = ({ data }) => {
  const participantRatio =
    'participantNumber' in data
      ? (data.participantNumber / data.participantLimit) * 100
      : (data.participantsNumber / data.participantLimit) * 100;

  const genderRatio =
    'genderRatio' in data
      ? (parseFloat(data.genderRatio.split('_')[0]) /
          (parseFloat(data.genderRatio.split('_')[0]) +
            parseFloat(data.genderRatio.split('_')[1]))) *
        100
      : data.ratio
        ? (parseFloat(data.ratio.split(':')[0]) /
            (parseFloat(data.ratio.split(':')[0]) +
              parseFloat(data.ratio.split(':')[1]))) *
          100
        : 50;

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200 space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">모임 규칙</h3>
        <ul className="text-md text-gray-700 mt-2 list-disc pl-5 space-y-1">
          {data.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="w-full md:w-[50%]">
          <h3 className="text-lg font-semibold text-gray-800">모임 시간</h3>
          <p className="text-md text-gray-700 mt-2">
            {new Date(data.date).toLocaleString(undefined, {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="w-full md:w-[50%]">
          <h3 className="text-lg font-semibold text-gray-800">위치</h3>
          <p className="text-md text-gray-700 mt-2">
            {'place' in data && data.place ? data.place.name : '위치 정보 없음'}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="w-full md:w-[50%]">
          <h3 className="text-lg font-semibold text-gray-800">참가자 정원</h3>
          <div className="mt-2">
            <p className="text-md text-gray-700">
              현재 참가자 수:
              {'participantNumber' in data
                ? data.participantNumber
                : data.participantsNumber}{' '}
              /{data.participantLimit}
            </p>
            <div className="w-full bg-gray-300 rounded-full h-6 mt-2">
              <div
                className="bg-blue-500 h-6 rounded-full text-center text-white"
                style={{ width: `${participantRatio}%` }}
              >
                {participantRatio.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">성비</h3>
            <p className="text-md text-gray-700 mt-2">
              성비: {'genderRatio' in data ? data.genderRatio : data.ratio}
            </p>
            <div className="w-full bg-gray-300 rounded-full h-6 mt-2 flex">
              <div
                className="bg-blue-500 h-6 text-center text-white"
                style={{ width: `${genderRatio}%` }}
              >
                {genderRatio.toFixed(1)}%
              </div>
              <div
                className="bg-pink-500 h-6 text-center text-white"
                style={{ width: `${100 - genderRatio}%` }}
              >
                {(100 - genderRatio).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">연령대</h3>
            <p className="text-md text-gray-700 mt-2">
              {data.ageRange.join(', ')}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="w-full md:w-[50%]">
          <h3 className="text-lg font-semibold text-gray-800">회비</h3>
          <p className="text-md text-gray-700 mt-2">
            {data.membershipFeeAmount
              ? `${data.membershipFeeAmount}원`
              : '없음'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubMain;
