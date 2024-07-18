import { Button } from '@/components/ui/button';

const MiddleSection = () => {
  return (
    <section
      className="m-16 pt-24 pl-20"
      style={{
        width: '1000px',
        height: '400px',
        backgroundColor: '#B4E3BF',
        clipPath:
          'polygon(80px 0, 100% 0, 100% calc(100% - 80px), calc(100% - 80px) 100%, 0 100%, 0 80px)',
      }}
    >
      <div className="font-neoBold text-4xl space-y-2 text-white">
        <p>지금 참여하고</p>
        <p>자기계발의</p>
        <p>기회를 누리세요!</p>
      </div>
      <Button className="mt-16 bg-slate-100 hover:bg-slate-200 text-black font-neo">
        참여중인 모임/동아리 목록 가기
      </Button>
    </section>
  );
};

export default MiddleSection;
