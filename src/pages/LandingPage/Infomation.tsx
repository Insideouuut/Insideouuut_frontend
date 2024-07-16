import React from 'react';
import { Button } from '@/components/ui/button';
import runImg from '@/components/icons/run.png';

const Infomation: React.FC = () => {
  return (
    <section className="flex bg-green-100 h-[620px] py-20 ">
      <div className=" w-[1040px] flex items-center justify-between mx-auto">
        <div className='text-left'>
          <h1 className="font-neoBold mb-4 text-black text-[50px]"><p className='mb-1'>모여봐요,</p><p>동네사람들</p></h1>
          <p className=" text-stone-500 text-xl mb-8"><p>동네에서 즐기는 <a className='font-neoExtraBold'>모임</a>과 <a className='font-neoExtraBold'>동아리</a>,</p><p>모동과 함께 친구를 만들어가요.</p></p>
          <Button className='font-neoBold'>모임 참여하기 &gt;</Button>
        </div>
        <div>
          <img src={runImg} alt="hero-img" className="w-[500px] h-[480px]" />
        </div>
      </div>
    </section>
  );
};

export default Infomation;
