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
  profileImage: string;
  nickname: string;
  temperature: number;
}

const Member: React.FC<MemberProps> = ({
  profileImage,
  nickname,
  temperature,
}) => {
  return (
    <div className="flex justify-between w-full items-center py-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={profileImage} alt={nickname} />
          <AvatarFallback>{nickname}</AvatarFallback>
        </Avatar>
        <span>{nickname}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Thermometer size={30} color="#333333" strokeWidth={1} />
          <span>{temperature}°C</span>
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

export default Member;
