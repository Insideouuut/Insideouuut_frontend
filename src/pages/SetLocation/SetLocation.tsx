import animationData from '@/assets/lottie/setlocation.json';
import HeroSection from '@/components/HeroSection';
import React from 'react';

const SetLocation: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <HeroSection
        backgroundColor="bg-primary"
        title="우리 동네를 설정해요"
        subtitle="내 위치를 기반으로 영역을 설정해서 원하는 모임/동아리를 찾아봐요"
        animationData={animationData}
      />
      <main className="flex-grow container mx-auto py-8 px-4 flex flex-col items-center">
        <section className="bg-white p-8 w-full mt-8 rounded shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            <label htmlFor="range" className="block">
              가까운 동네
            </label>
            <input
              type="range"
              id="range"
              name="range"
              min="1"
              max="100"
              className="flex-grow"
            />
            <label htmlFor="range" className="block">
              먼 동네
            </label>
          </div>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="우리 동네"
              className="p-2 rounded border flex-grow"
            />
            <button className="bg-primary text-white py-2 px-4 rounded">
              설정
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SetLocation;
