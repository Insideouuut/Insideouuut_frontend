import animationData from '@/assets/lottie/social.json';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import React from 'react';
import { Link } from 'react-router-dom';

const SocialSection: React.FC = () => {
  return (
    <section className="flex bg-gray-50 h-[620px] py-20">
      <div className="w-[1040px] flex items-center justify-between mx-auto">
        <div>
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: '400px', marginLeft: '50px' }}
          />
        </div>
        <div className="text-left w-[350px]">
          <h2 className="font-neoBold mb-4 text-green-600 text-[30px]">소셜</h2>
          <p className="font-neoBold mb-4 text-black text-[40px]">
            <p>공유하며 즐기는</p>
            <p>취미 생활</p>
          </p>
          <p className="text-stone-500 text-xl mb-8">
            <p>친구들과 공유하고 초대하여</p>
            <p>같이 즐겨보세요.</p>
          </p>
          <Link to="/login">
            <Button className="font-neoBold">모임 참여하기 &gt;</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
