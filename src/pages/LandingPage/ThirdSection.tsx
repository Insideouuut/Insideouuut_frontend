import tempImg from '@/assets/icons/modongtmp.svg';
import noteImg from '@/assets/icons/note.svg';
import reviewImg from '@/assets/icons/review.svg';
import animationData from '@/assets/lottie/search.json';
import Lottie from 'lottie-react';
import React from 'react';

const ThirdSection: React.FC = () => {
  return (
    <section className="flex bg-green-100 h-[620px] py-20">
      <div className="w-[1040px] flex items-center justify-between mx-auto">
        <div className="text-left">
          <h2 className="font-neoBold mb-4 text-green-600 text-[30px]">
            모동 비교하기
          </h2>
          <p className="font-neoBold mb-4 text-black text-[40px]">
            <p>비교하며 찾을 수 있는</p>
            <p>나의 첫 모동</p>
          </p>
          <p className="text-stone-500 text-xl mb-8">
            <p>모임 / 동아리의 정보를 확인하고</p>
            <p>나와 맞는 모동을 찾을 수 있어요.</p>
          </p>
          <ul className="flex gap-6">
            <li className="font-neoBold">
              <img src={reviewImg} className="mb-3" alt="후기 이미지" />
              <h4 className="font-neoExtraBold text-3 mb-2">모동 후기</h4>
              <p className=" text-[12px] text-stone-500">
                후기를 통해 나와맞는
              </p>
              <p className="text-[12px] text-stone-500">모동을 찾아보세요.</p>
            </li>
            <li className="font-neoBold">
              <img src={tempImg} className="mb-3" alt="온도 이미지" />
              <h4 className="font-neoExtraBold text-3 mb-2">모동 온도</h4>
              <p className=" text-[12px] text-stone-500">나의 열정을 통해</p>
              <p className="text-[12px] text-stone-500">온도를 올려보세요</p>
            </li>
            <li className="font-neoBold">
              <img src={noteImg} className="mb-3" alt="게시판 이미지" />
              <h4 className="font-neoExtraBold text-3 mb-2">모임 게시판</h4>
              <p className=" text-[12px] text-stone-500">게시판을 통해</p>
              <p className="text-[12px] text-stone-500">
                친구들과 소통해보세요.
              </p>
            </li>
          </ul>
        </div>
        <div>
        <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{ width: '540px' }}
            />
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
