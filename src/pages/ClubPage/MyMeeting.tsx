import { getClubData } from '@/api/meetingApi';
import { Button } from '@/components/ui/button';
import { Result } from '@/types/Meetings';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Mymeeting: React.FC = () => {
  const { id: clubId } = useParams<{ id: string }>();
  const [clubData, setClubData] = useState<Result | null>(null);

  useEffect(() => {
    if (clubId) {
      const fetchData = async () => {
        try {
          const data = await getClubData(clubId);
          if (data.type === '모임') {
            setClubData(data);
          }
        } catch (error) {
          console.error('클럽 데이터를 가져오는 중 오류 발생:', error);
        }
      };

      fetchData();
    }
  }, [clubId]);

  if (!clubData) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      {clubData.type === '모임' && (
        <div>
          <h2 className="text-xl font-bold mb-4">나의 모임</h2>
          <div className="max-h-[700px] overflow-scroll space-y-4">
            <div className="p-4 border rounded-lg shadow-sm bg-white flex flex-col space-y-2">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{clubData.name}</h3>
                  <p>{clubData.introduction}</p>
                  <p>장소: {clubData.place.name}</p>
                  <p>
                    인원: {clubData.participantsNumber}/
                    {clubData.participantLimit}
                  </p>
                  <p>일시: {clubData.date}</p>
                  <p>
                    회비:{' '}
                    {clubData.hasMembershipFee
                      ? `${clubData.membershipFeeAmount.toLocaleString()}원`
                      : '무료'}
                  </p>
                </div>
                <div className="flex flex-col space-y-2 justify-center items-end">
                  <Button className="px-4 py-2 bg-red-500 bg-opacity-80 text-white rounded-md hover:bg-red-700">
                    모임 나가기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mymeeting;
