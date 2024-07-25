import { Separator } from '@/components/ui/separator';
import Member from './Member';

interface Member {
  profileImage: string;
  nickname: string;
  temperature: number;
}

const MEMBERS: Member[] = [
  {
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥일',
    temperature: 36.5,
  },
  {
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥이',
    temperature: 36.5,
  },
  {
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥삼',
    temperature: 36.5,
  },
  {
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥사',
    temperature: 36.5,
  },
  {
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥오',
    temperature: 36.5,
  },
  {
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥육',
    temperature: 36.5,
  },
  {
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥칠',
    temperature: 36.5,
  },
  {
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥팔',
    temperature: 36.5,
  },
  {
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥구',
    temperature: 36.5,
  },
  {
    profileImage: 'https://github.com/shadcn.png',
    nickname: '흰둥십',
    temperature: 36.5,
  },
];

const MemberList = () => {
  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200 ">
      <div className="bg-white px-4 rounded-lg">
        {MEMBERS.map((member, index) => (
          <>
            <Member
              key={index}
              profileImage={member.profileImage}
              nickname={member.nickname}
              temperature={member.temperature}
            />
            {index < MEMBERS.length - 1 && <Separator />}
          </>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
