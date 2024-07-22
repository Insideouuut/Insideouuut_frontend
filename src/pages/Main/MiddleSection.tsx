import { dummyData } from '@/components/dummyData';
import ModongCard from '@/components/ModongCard';
import { Button } from '@/components/ui/button';
const MiddleSection = () => {
  return (
    <div className="container flex flex-col items-center ">
      <section
        className="m-16 pt-24 pl-20 w-full max-w-screen-lg"
        style={{
          height: '400px',
          backgroundColor: '#B4E3BF',
          clipPath:
            'polygon(80px 0, 100% 0, 100% calc(100% - 80px), calc(100% - 80px) 100%, 0 100%, 0 80px)',
        }}
      >
        <div className="font-neoBold text-2xl md:text-3xl lg:text-4xl space-y-2 text-white">
          <p>지금 참여하고</p>
          <p>자기계발의</p>
          <p>기회를 누리세요!</p>
        </div>
        <Button className="mt-16 bg-slate-100 hover:bg-slate-200 text-black font-neo">
          참여중인 모임/동아리 목록 가기
        </Button>
      </section>

      <p className="text-grey-900 text-3xl py-10">관심 카테고리의 모동</p>
      {/* 관심 카테고리의 모동, 추후 추가 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyData.map((item, index) => (
          <ModongCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default MiddleSection;
