import { Api } from '@/api/Apis';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { EllipsisVertical, Heart, Siren, Thermometer } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const apiInstance = new Api();

interface MemberProps {
  clubUserId: number;
  userName: string;
  profileImgUrl: string;
  mannerTemp: number;
}

const ClubMember: React.FC<MemberProps> = ({
  clubUserId,
  userName,
  profileImgUrl,
  mannerTemp,
}) => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const navigate = useNavigate();

  const result = type === '동아리' ? 'club' : 'meeting';

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [reason, setReason] = useState('');

  const handleProfileViewClick = (clubUserId: number) => {
    navigate(`/${result}/${id}/userProfile/${clubUserId}`);
  };

  const handleReportClick = async () => {
    try {
      await apiInstance.api.reportUser(clubUserId, { reason });
      console.log(`Reported user: ${clubUserId} with reason: ${reason}`);
      window.location.reload();
    } catch (error) {
      console.error('Failed to report user:', error);
    } finally {
      setIsPopoverOpen(false);
    }
  };

  const handleLikeClick = async () => {
    try {
      await apiInstance.api.likeUser(clubUserId);
      console.log(`Liked user: ${clubUserId}`);
      window.location.reload();
    } catch (error) {
      console.error('Failed to like user:', error);
    } finally {
      setIsPopoverOpen(false);
    }
  };

  return (
    <div className="flex justify-between w-full items-center py-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={profileImgUrl} alt={userName} />
          <AvatarFallback>{userName}</AvatarFallback>
        </Avatar>
        <span>{userName}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Thermometer size={30} color="#333333" strokeWidth={1} />
          <span>{mannerTemp}°C</span>
        </div>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <EllipsisVertical size={24} className="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="w-[250px] flex flex-col justify-center items-center">
            <Button
              onClick={() => handleProfileViewClick(clubUserId)}
              variant="link"
              className="text-slate-900 p-1"
            >
              프로필 보기
            </Button>
            <Separator />
            <div className="flex justify-center items-center my-2">
              <Heart className="text-rose-500" />
              <Button
                onClick={handleLikeClick}
                variant="link"
                className="text-rose-500 p-1"
              >
                칭찬하기
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col justify-center items-center my-2">
              <div className="flex justify-center items-center my-2">
                <Siren className="text-gray-400" />
                <Button
                  onClick={handleReportClick}
                  variant="link"
                  className="text-gray-500 p-1 "
                >
                  신고하기
                </Button>
              </div>

              <Input
                placeholder="신고 사유를 입력하세요"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ClubMember;
