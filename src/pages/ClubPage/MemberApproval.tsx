import {
  acceptMeetingApplication,
  getMeetingApplicants,
  rejectMeetingApplication,
} from '@/api/meetingApi';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { MeetingApplicant } from '@/types/MeetingApplicantsTypes';
import { Dialog } from '@headlessui/react';
import { EllipsisVertical, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Member {
  applyId: number;
  profileImage: string;
  nickname: string;
  mannerTemp: number;
  answer: string | null;
}

const MemberApproval: React.FC = () => {
  const { id: clubId } = useParams<{ id: string }>();
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Member | null>(
    null,
  );
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('accessToken') || '';
        const applicants: MeetingApplicant[][] = await getMeetingApplicants(
          clubId!,
          token,
        );

        console.log('응답 값:', applicants);

        const formattedMembers = applicants
          .flat()
          .map((applicant: MeetingApplicant) => ({
            applyId: applicant.applyId,
            profileImage: applicant.basicUserResponse.profileImage.url,
            nickname: applicant.basicUserResponse.nickname,
            mannerTemp: applicant.basicUserResponse.mannerTemp,
            answer: applicant.answer,
          }));
        setMembers(formattedMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [clubId]);

  const openApplicationModal = (member: Member) => {
    setSelectedApplication(member);
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
    setSelectedApplication(null);
  };

  const handleAction = async (action: '승인' | '거절', applyId: number) => {
    const token = localStorage.getItem('accessToken') || '';
    try {
      if (action === '승인') {
        await acceptMeetingApplication(String(applyId), token);
      } else {
        await rejectMeetingApplication(String(applyId), token);
      }
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.applyId !== applyId),
      );
    } catch (error) {
      console.error(`Error handling ${action} action:`, error);
    }
    closeApplicationModal();
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">멤버 승인</h2>
      <div className="bg-white rounded-lg shadow-lg p-4 max-h-[700px] overflow-x-auto">
        {members.map((member, index) => (
          <div key={member.applyId}>
            <div className="flex items-center justify-between my-2">
              <div className="flex items-center">
                <img
                  src={member.profileImage}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span>{member.nickname}</span>
                <span className="ml-4 text-sm text-gray-500">
                  매너온도: {member.mannerTemp}℃
                </span>
              </div>
              <div className="flex items-center">
                <Button
                  className="bg-primary px-4 py-2 mr-2 rounded hover:bg-green-700"
                  onClick={() => openApplicationModal(member)}
                >
                  신청서 확인
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
        open={isApplicationModalOpen}
        onClose={closeApplicationModal}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div
            className="fixed inset-0 bg-black opacity-30"
            aria-hidden="true"
          ></div>
          <div className="bg-white rounded-lg max-w-sm mx-auto p-6 relative z-20">
            <Dialog.Title className="text-xl font-bold mb-4 flex justify-between items-center">
              신청서 확인
              <Button
                variant="ghost"
                className="p-1 hover:bg-white"
                onClick={closeApplicationModal}
              >
                <X size={24} />
              </Button>
            </Dialog.Title>
            <Dialog.Description>
              {selectedApplication && (
                <div>
                  <img
                    src={selectedApplication.profileImage}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{selectedApplication.nickname}</span>
                  <p className="mt-4">
                    {selectedApplication.answer || '신청서 내용이 없습니다.'}
                  </p>
                </div>
              )}
            </Dialog.Description>
            <div className="mt-4 flex space-x-4">
              <Button
                className="bg-primary text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() =>
                  handleAction('승인', selectedApplication!.applyId)
                }
              >
                승인
              </Button>
              <Button
                className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() =>
                  handleAction('거절', selectedApplication!.applyId)
                }
              >
                거절
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MemberApproval;
