import talkImg from '@/components/icons/talk.png';
import { Button } from '@/components/ui/button';
import React from 'react';

const SocialSection: React.FC = () => {
  return (
    <section className="flex bg-gray-50 h-[620px] py-20">
      <div className="w-[1040px] flex items-center justify-between mx-auto">
        <div>
          <img
            src={talkImg}
            alt="hero-img"
            className="ml-10 w-[380px] h-[480px]"
          />
        </div>
        <div className="text-left">
          <h2 className="font-neoBold mb-4 text-green-600 text-[30px]">소셜</h2>
          <p className="font-neoBold mb-4 text-black text-[40px]">
            <p>공유하며 즐기는</p>
            <p>취미 생활</p>
          </p>
          <p className="text-stone-500 text-xl mb-8">
            <p>친구들과 공유하고 초대하여</p>
            <p>같이 즐겨보세요.</p>
          </p>
          <Button className="font-neoBold">모임 참여하기 &gt;</Button>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
