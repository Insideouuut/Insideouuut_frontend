import animationData from '@/assets/lottie/together.json';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { useRef, useState } from 'react';
import CreateMeetingForm from './CreateMeetingForm';

const CreateClub = () => {
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
    <>
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
        title="모임을 생성해요."
        subtitle="모임을 생성해 관심사가 같은 사람들과 함께해요."
        animationData={animationData}
      />
      <div className="flex justify-center">
        <CreateMeetingForm />
      </div>
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
    </>
  );
};

export default CreateClub;
