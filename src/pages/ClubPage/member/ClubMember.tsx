import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { EllipsisVertical, Thermometer } from 'lucide-react';
import React from 'react';

interface MemberProps {
  userName: string;
  profileImgUrl: string;
  mannerTemp: number;
}

const ClubMember: React.FC<MemberProps> = ({
  userName,
  profileImgUrl,
  mannerTemp,
}) => {
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
  );
};

export default ClubMember;
