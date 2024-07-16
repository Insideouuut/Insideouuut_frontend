import Lottie from 'lottie-react';
import React from 'react';

interface HeroSectionProps {
  backgroundColor: string;
  title: string;
  subtitle: string;
  animationData: object;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundColor,
  title,
  subtitle,
  animationData,
}) => {
  return (
    <section
      className={`w-full h-72 py-8 px-4 ${backgroundColor} flex justify-center  text-left`}
    >
      <div className=" flex items-center w-full  px-20 justify-around">
        <div className="flex flex-col ">
          <h1 className="text-4xl font-neoExtraBold text-white mb-10">
            {title}
          </h1>
          <p className="text-white font-neoLight">{subtitle}</p>
        </div>
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ height: 200, width: 200 }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
