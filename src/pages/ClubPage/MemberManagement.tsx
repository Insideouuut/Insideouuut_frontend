import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Dialog } from '@headlessui/react';
import { EllipsisVertical } from 'lucide-react';
import React, { useState } from 'react';
import Member from './Member';

interface Member {
  id: number;
  profileImage: string;
  nickname: string;
  temperature: number;
}

const MEMBERS: Member[] = [
  {
    id: 1,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥일',
    temperature: 36.5,
  },
  {
    id: 2,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥이',
    temperature: 36.5,
  },
  {
    id: 3,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥삼',
    temperature: 36.5,
  },
  {
    id: 4,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥사',
    temperature: 36.5,
  },
  {
    id: 5,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥오',
    temperature: 36.5,
  },
  {
    id: 6,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥육',
    temperature: 36.5,
  },
  {
    id: 7,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥칠',
    temperature: 36.5,
  },
  {
    id: 8,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥팔',
    temperature: 36.5,
  },
  {
    id: 9,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥구',
    temperature: 36.5,
  },
  {
    id: 10,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥십',
    temperature: 36.5,
  },
];

const MemberManagement: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(MEMBERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);

  const openModal = (member: Member) => {
    setMemberToRemove(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMemberToRemove(null);
  };

  const handleRemoveMember = () => {
    if (memberToRemove) {
      setMembers(members.filter((member) => member.id !== memberToRemove.id));
      closeModal();
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
                  src={member.profileImage}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span>{member.nickname}</span>
              </div>
              <div className="flex items-center">
                <Button
                  className="bg-red-500 px-4 py-2 mr-2 rounded hover:bg-red-700"
                  onClick={() => openModal(member)}
                >
                  강퇴하기
                </Button>
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
                <p>정말로 {memberToRemove.nickname}님을 강퇴하시겠습니까?</p>
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
