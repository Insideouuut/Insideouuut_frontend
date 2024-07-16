import gameImg from '@/components/icons/game.png';
import { Button } from '@/components/ui/button';
import React from 'react';

const SecondSection: React.FC = () => {
  return (
    <section className="flex bg-gray-50 h-[620px] py-20 ">
      <div className="w-[1040px] flex items-center justify-between mx-auto">
        <div>
          <img src={gameImg} alt="hero-img" className="w-[470px] h-[455px]" />
        </div>
        <div className="text-left">
          <h2 className="font-neoBold mb-4 text-green-600 text-[30px]">
            모임 / 동아리
          </h2>
          <p className="font-neoBold mb-4 text-black text-[40px]">
            <p>오늘 하고싶은 취미를</p>
            <p>모임과 동아리에서</p>
          </p>
          <p className="text-stone-500 text-xl mb-8">
            <p>가까운 동네 친구들과</p>
            <p>하고싶은 취미를 즐겨보세요.</p>
          </p>
          <Button className="font-neoBold">모임 참여하기 &gt;</Button>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
