import animationData from '@/assets/lottie/setlocation.json';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import MapComponent from '@/pages/SetLocation/MapComponent';
import { CircleAlert, Map } from 'lucide-react';
import React, { useRef, useState } from 'react';

const SetLocation: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const profileRef = useRef<HTMLImageElement>(null);

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileModalOpen(false);
  };
  return (
    <div>
      <Header
        toggleProfileModal={toggleProfileModal}
        toggleNotificationModal={toggleNotificationModal}
        isLoggedIn={isLoggedIn}
        handleLoginLogout={() => setIsLoggedIn(!isLoggedIn)}
        profileRef={profileRef}
        hasNotifications={hasNotifications}
      />
      <div className="min-h-screen flex flex-col items-center">
        <HeroSection
          backgroundColor="bg-primary"
          title="우리 동네를 설정해요"
          subtitle="내 위치를 기반으로 영역을 설정해서 원하는 모임/동아리를 찾아봐요"
          animationData={animationData}
        />
        <main className="flex-grow container mx-auto py-4 px-4 flex flex-col items-center">
          <section className="bg-white p-8 w-full mt-8 rounded shadow-md flex flex-col items-center">
            <MapComponent />
            <div className="flex space-x-4 p-8 items-center justify-center">
              <Map className="text-primary" />
              <p className="font-neoBold whitespace-nowrap">우리 동네</p>
              <Input className="w-auto" />
              <Button className="font-neoBold">현재 위치로 불러오기</Button>
            </div>

            <HoverCard>
              <HoverCardTrigger>
                <div className="flex space-x-2 items-center mb-4">
                  <CircleAlert />
                  <p className="text-sm">동네 설정은 어떤 기능인가요?</p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent style={{ color: '#64748B', fontSize: 14 }}>
                내 동네 설정에서 모동을 사용할 동네를 설정할 수 있어요. 동네
                범위 (가까운 동네 ~ 먼 동네)를 선택하면, 홈 화면에 보여지는
                게시글의 범위가 달라져요.
              </HoverCardContent>
            </HoverCard>

            <Button className="bg-slate-100 hover:bg-slate-200 text-black font-neoBold">
              동네 인증하기
            </Button>
          </section>
        </main>
        <Footer />
        {isProfileModalOpen && (
          <ProfileModal
            toggleProfileModal={toggleProfileModal}
            handleLogout={handleLogout}
            profileRef={profileRef}
          />
        )}
        {isNotificationModalOpen && (
          <NotificationModal
            toggleNotificationModal={toggleNotificationModal}
            setHasNotifications={setHasNotifications}
          />
        )}
      </div>
    </div>
  );
};

export default SetLocation;
