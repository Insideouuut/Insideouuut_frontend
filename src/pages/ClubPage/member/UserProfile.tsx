import { Api, ProfileResponse } from '@/api/Apis';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const apiInstance = new Api();

const UserProfile = () => {
  const { clubUserId } = useParams<{ clubUserId: string }>();
  const [userProfile, setUserProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const mannerTemp = location.state?.mannerTemp || 36; // mannerTemp 값을 가져옴, 없으면 기본값 36
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (clubUserId) {
          const response = await apiInstance.api.getUserProfile(
            Number(clubUserId),
          );
          console.log(response);

          if (response.results && response.results.length > 0) {
            const profileData = response.results[0];

            setUserProfile({ ...profileData, mannerRating: mannerTemp });
          } else {
            setUserProfile(null);
          }
        }
      } catch (err) {
        setLoading(true);
        console.error('Failed to fetch user profile:', err);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [clubUserId, mannerTemp]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userProfile) {
    return <p>No profile data available</p>;
  }

  return (
    <div className="flex flex-col p-6 w-[820px] border-2 border-gray-200 bg-white rounded-lg">
      <div className="container flex flex-col shadow-md border border-gray-200 rounded-lg p-10 items-center justify-center bg-white relative">
        <div
          className={`w-40 h-40 rounded-full mb-3 flex bg-red-200 items-center justify-center}`}
        >
          <img
            src={userProfile.profileImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <section>
          <div>
            <p className="text-xs mt-2">
              매너지수: {userProfile.mannerRating}°C
            </p>
            <Progress value={userProfile.mannerRating} className="mt-2 mb-10" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] "></TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-neoBold">닉네임</TableCell>
                <TableCell className="font-neoBold text-right text-primary ">
                  {userProfile.nickname}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-neoBold">참여중인 모임</TableCell>
                <TableCell className="font-neoBold text-right text-primary">
                  {userProfile.attendedMeetings &&
                  userProfile.attendedMeetings.length > 0 ? (
                    <ul>
                      {userProfile.attendedMeetings.map((meeting, index) => (
                        <li key={index}>{meeting.meetingName}</li>
                      ))}
                    </ul>
                  ) : (
                    '참여중인 모임이 없습니다'
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
