import React, { useState, useRef } from 'react';
import Header from '../../components/ui/Header';
import Infomation from './Infomation';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import SocialSection from './SocialSection';
import Footer from '../../components/ui/Footer';
import ProfileModal from '@/components/ui/profileModal'; 
import NotificationModal from '@/components/ui/notificationModal'; 

const LandingPage: React.FC = () => {
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
    <div className="relative">
      <Header 
        toggleProfileModal={toggleProfileModal} 
        toggleNotificationModal={toggleNotificationModal} 
        isLoggedIn={isLoggedIn} 
        handleLoginLogout={() => setIsLoggedIn(!isLoggedIn)} 
        profileRef={profileRef}
        hasNotifications={hasNotifications}
      />
      <Infomation />
      <SecondSection />
      <ThirdSection />
      <SocialSection />
      <Footer />
      {isProfileModalOpen && <ProfileModal toggleProfileModal={toggleProfileModal} handleLogout={handleLogout} profileRef={profileRef} />}
      {isNotificationModalOpen && <NotificationModal toggleNotificationModal={toggleNotificationModal} setHasNotifications={setHasNotifications} />}
    </div>
  );
};

export default LandingPage;
