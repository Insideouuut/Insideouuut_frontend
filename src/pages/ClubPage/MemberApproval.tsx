import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface Member {
  id: number;
  profileImage: string;
  nickname: string;
  application: string;
}

const MEMBERS: Member[] = [
  {
    id: 1,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥일',
    application: '유저1의 신청서 내용',
  },
  {
    id: 2,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥이',
    application: '유저2의 신청서 내용',
  },
  {
    id: 3,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥삼',
    application: '유저3의 신청서 내용',
  },
  {
    id: 4,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥사',
    application: '유저4의 신청서 내용',
  },
  {
    id: 5,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥오',
    application: '유저5의 신청서 내용',
  },
  {
    id: 6,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥육',
    application: '유저6의 신청서 내용',
  },
  {
    id: 7,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥칠',
    application: '유저7의 신청서 내용',
  },
  {
    id: 8,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥팔',
    application: '유저8의 신청서 내용',
  },
  {
    id: 9,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥구',
    application: '유저9의 신청서 내용',
  },
  {
    id: 10,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥십',
    application: '유저10의 신청서 내용',
  },
  {
    id: 10,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥십',
    application: '유저10의 신청서 내용',
  },
  {
    id: 10,
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥십',
    application: '유저10의 신청서 내용',
  },
];

const MemberApproval: React.FC = () => {
  const [selectedApplication, setSelectedApplication] = useState<Member | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const openApplicationModal = (member: Member) => {
    setSelectedApplication(member);
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
    setSelectedApplication(null);
  };

  const handleAction = (action: '승인' | '거절') => {
    console.log(`${action} 처리`);
    closeApplicationModal();
  };

  return (
    <div className=" w-full ">
      <h2 className="text-2xl font-bold mb-6 text-center">멤버 승인</h2>
      <div className="bg-white rounded-lg shadow-lg p-4 h-[700px] overflow-x-auto">
        {MEMBERS.map((member, index) => (
          <div key={member.id}>
            <div className="flex items-center justify-between my-2">
              <div className="flex items-center">
                <img src={member.profileImage} alt="avatar" className="w-10 h-10 rounded-full mr-4" />
                <span>{member.nickname}</span>
              </div>
              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => openApplicationModal(member)}
              >
                신청서 확인
              </Button>
            </div>
            {index < MEMBERS.length - 1 && <Separator />}
          </div>
        ))}
      </div>

      <Dialog open={isApplicationModalOpen} onClose={closeApplicationModal} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true"></div>
          <div className="bg-white rounded-lg max-w-sm mx-auto p-6 relative z-20">
            <Dialog.Title className="text-xl font-bold mb-4">신청서 확인</Dialog.Title>
            <Dialog.Description>
              {selectedApplication && (
                <div>
                  <img src={selectedApplication.profileImage} alt="avatar" className="w-10 h-10 rounded-full mr-4" />
                  <span>{selectedApplication.nickname}</span>
                  <p className="mt-4">{selectedApplication.application}</p>
                </div>
              )}
            </Dialog.Description>
            <div className="mt-4 flex space-x-4">
              <Button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleAction('승인')}
              >
                승인
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleAction('거절')}
              >
                거절
              </Button>
            </div>
            <Button className="mt-4 text-gray-500" onClick={closeApplicationModal}>
              닫기
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MemberApproval;
