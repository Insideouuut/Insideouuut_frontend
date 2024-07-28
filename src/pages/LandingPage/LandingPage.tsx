import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { useUserStore } from '@/store/userStore'; // import zustand store
import React, { useRef, useState } from 'react';
import Infomation from './Infomation';
import SecondSection from './SecondSection';
import SocialSection from './SocialSection';
import ThirdSection from './ThirdSection';

const LandingPage: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { isLoggedIn, clearUser, setUser } = useUserStore();
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
    <div className="relative">
      <Header
        toggleProfileModal={toggleProfileModal}
        toggleNotificationModal={toggleNotificationModal}
        isLoggedIn={isLoggedIn}
        handleLoginLogout={handleLoginLogout}
        profileRef={profileRef}
        hasNotifications={hasNotifications}
      />
      <Infomation />
      <SecondSection />
      <ThirdSection />
      <SocialSection />
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

export default LandingPage;
