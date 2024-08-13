import { expelClubMember, getClubMembers } from '@/api/clubApi';
import {
  expelMember as expelMeetingMember,
  getMeetingMembers,
} from '@/api/meetingApi';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Member } from '@/types/Member';
import { Dialog } from '@headlessui/react';
import { EllipsisVertical } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const MemberManagement: React.FC = () => {
  const { id: clubId } = useParams<{ id: string }>();
  const location = useLocation();
  const type = location.pathname.includes('/club') ? 'club' : 'meeting';
  const [members, setMembers] = useState<Member[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('accessToken') || '';
        let membersData: Member[] = [];
        if (type === 'club') {
          membersData = await getClubMembers(clubId!, token);
        } else {
          membersData = await getMeetingMembers(clubId!, token);
        }
        setMembers(membersData);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [clubId, type]);

  const openModal = (member: Member) => {
    setMemberToRemove(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMemberToRemove(null);
  };

  const handleRemoveMember = async () => {
    if (memberToRemove) {
      try {
        const token = localStorage.getItem('accessToken') || '';
        if (type === 'club') {
          if (memberToRemove.role === '멤버') {
            await expelClubMember(clubId!, String(memberToRemove.id), token);
          } else {
            console.error('Only members with the role "멤버" can be expelled.');
            return;
          }
        } else {
          await expelMeetingMember(String(memberToRemove.id), token);
        }
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== memberToRemove.id),
        );
        closeModal();
      } catch (error) {
        console.error('Error expelling member:', error);
      }
    }
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">멤버 관리</h2>
      <div className="bg-white rounded-lg shadow-lg p-4 min-h-[500px] max-h-[700px] overflow-x-auto">
        {members.map((member, index) => (
          <div key={member.id}>
            <div className="flex items-center justify-between my-2">
              <div className="flex items-center">
                <img
                  src={member.profileImage.url}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span>{member.nickName}</span>
                <span className="ml-4 text-sm text-gray-500">
                  매너온도: {member.mannerTemp}℃
                </span>
              </div>
              <div className="flex items-center">
                {type === 'meeting' || member.role === '멤버' ? (
                  <Button
                    className="bg-red-500 px-4 py-2 mr-2 rounded hover:bg-red-700"
                    onClick={() => openModal(member)}
                  >
                    강퇴하기
                  </Button>
                ) : null}
                <Popover>
                  <PopoverTrigger asChild className="cursor-pointer">
                    <EllipsisVertical size={24} />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col items-start w-auto absolute -right-2">
                    <Button variant="link" className="text-slate-900 p-1">
                      프로필 보기
                    </Button>
                    <Separator />
                    <Button variant="link" className="text-rose-500 p-1">
                      신고하기
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {index < members.length - 1 && <Separator />}
          </div>
        ))}
      </div>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div
            className="fixed inset-0 bg-black opacity-30"
            aria-hidden="true"
          ></div>
          <div className="bg-white rounded-lg max-w-sm mx-auto p-6 relative z-20">
            <Dialog.Title className="text-xl font-bold mb-4">
              강퇴 확인
            </Dialog.Title>
            <Dialog.Description>
              {memberToRemove && (
                <p>정말로 {memberToRemove.nickName}님을 강퇴하시겠습니까?</p>
              )}
            </Dialog.Description>
            <div className="mt-4 flex space-x-4">
              <Button
                className="bg-red-500 text-white"
                onClick={handleRemoveMember}
              >
                강퇴
              </Button>
              <Button className="bg-gray-500 text-white" onClick={closeModal}>
                취소
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MemberManagement;
