import animationData from '@/assets/lottie/main.json';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { Edit2, Heart, Map, User, UserRoundSearch } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryButton from './CategoryButton';
import MiddleSection from './MiddleSectoin';

const Main: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileModalOpen(false);
  };

  return (
    <div className="max-h-auto">
      <Header
        toggleProfileModal={toggleProfileModal}
        toggleNotificationModal={toggleNotificationModal}
        isLoggedIn={isLoggedIn}
        handleLoginLogout={() => setIsLoggedIn(!isLoggedIn)}
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
        <section className="grid grid-cols-3 gap-4 p-5 bg-white">
          <CategoryButton Icon={User} label="사교/취미" />
          <CategoryButton Icon={Heart} label="모임" />
          <CategoryButton Icon={Edit2} label="공부" />
          <CategoryButton Icon={UserRoundSearch} label="모임 만들기" />
          <CategoryButton Icon={UserRoundSearch} label="동아리 만들기" />
          <Link to="/setlocation">
            <CategoryButton Icon={Map} label="동네 설정" />
          </Link>
        </section>
      </main>
      <MiddleSection />
      <Footer />
      {isProfileModalOpen && (
        <ProfileModal
          toggleProfileModal={toggleProfileModal}
          handleLogout={handleLogout}
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
