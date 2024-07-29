import animationData from '@/assets/lottie/main.json';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { useUserStore } from '@/store/userStore';
import React, { useRef, useState } from 'react';
import CategoryContainer from './CategoryContainer';
import MiddleSection from './MiddleSection';

const Main: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { isLoggedIn, setUser, clearUser } = useUserStore();
  const [hasNotifications, setHasNotifications] = useState(false);
  const [profileCoords, setProfileCoords] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });
  const [notificationCoords, setNotificationCoords] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });
  const profileRef = useRef<HTMLImageElement>(null);

  const toggleProfileModal = (e?: React.MouseEvent) => {
    if (e) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setProfileCoords({ top: rect.bottom, left: rect.left });
    }
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const toggleNotificationModal = (e?: React.MouseEvent) => {
    if (e) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setNotificationCoords({ top: rect.bottom, left: rect.left });
    }
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      clearUser();
    } else {
      // 로그인 로직 추가
      setUser({ isLoggedIn: true });
    }
  };

  return (
    <div className="max-h-auto">
      <Header
        toggleProfileModal={toggleProfileModal}
        toggleNotificationModal={toggleNotificationModal}
        isLoggedIn={isLoggedIn}
        handleLoginLogout={handleLoginLogout}
        profileRef={profileRef}
        hasNotifications={hasNotifications}
      />
      <HeroSection
        backgroundColor="bg-primary"
        title={
          <span>
            모여봐요, 동네에서! <br />
            모임과 동아리를 만들어요 !
          </span>
        }
        subtitle="함께하는 즐거움, 모동에서 시작해요"
        animationData={animationData}
      />
      <main className="container mx-auto py-4 px-4 flex flex-col items-center ">
        <p className="text-grey-900 text-3xl py-10">카테고리별로 탐색하기</p>
        <CategoryContainer />
      </main>
      <MiddleSection />
      <Footer />
      {isProfileModalOpen && (
        <ProfileModal
          toggleProfileModal={toggleProfileModal}
          handleLogout={handleLoginLogout}
          coords={profileCoords}
        />
      )}
      {isNotificationModalOpen && (
        <NotificationModal
          toggleNotificationModal={toggleNotificationModal}
          setHasNotifications={setHasNotifications}
          coords={notificationCoords}
        />
      )}
    </div>
  );
};

export default Main;
