import { getClubMemberList } from '@/api/clubApi';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import Member from './ClubMember';

interface Member {
  clubUserId: number;
  role: string;
  userName: string;
  profileImgUrl: string;
  mannerTemp: number;
}

const ClubMemberList = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const clubId = pathSegments[pathSegments.length - 2];

    const fetchData = async () => {
      try {
        const response = await getClubMemberList(clubId);
        setMembers(response.data.results[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200 ">
      <div className="bg-white px-4 rounded-lg">
        {members.map((member, index) => (
          <>
            <Member
              key={member.clubUserId}
              profileImgUrl={member.profileImgUrl}
              userName={member.userName}
              mannerTemp={member.mannerTemp}
            />
            {index < members.length - 1 && <Separator />}
          </>
        ))}
      </div>
    </div>
  );
};

export default ClubMemberList;
