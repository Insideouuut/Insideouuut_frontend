import animationData from '@/assets/lottie/communication.json';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Infomation: React.FC = () => {
  return (
    <section className="flex bg-green-100 h-[620px] py-20">
      <div className="w-[1040px] flex items-center justify-between mx-auto">
        <div className="text-left">
          <h1 className="font-neoBold mb-4 text-black text-[50px]">
            <p className="mb-1">모여봐요,</p>
            <p>동네사람들</p>
          </h1>
          <p className="text-stone-500 text-xl mb-8">
            <p>
              동네에서 즐기는{' '}
              <a href="/" className="font-neoExtraBold">
                모임
              </a>
              과{' '}
              <a href="/" className="font-neoExtraBold">
                동아리
              </a>
              ,
            </p>
            <p>모동과 함께 친구를 만들어가요.</p>
          </p>
          <Link to="/login">
            <Button className="font-neoBold">모임 참여하기 &gt;</Button>
          </Link>
        </div>
        <div>
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: '600px', height: '480px', marginBottom: '50px' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Infomation;
