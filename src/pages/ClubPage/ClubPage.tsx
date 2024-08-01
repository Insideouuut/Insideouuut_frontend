import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ClubHero from './ClubHero';
import ClubMain from './ClubMain';
import ClubSidebar from './ClubSidebar';

interface ClubData {
  clubTypes: string[];
  meetingTypes: string[];
  imageUrl: string;
  name: string;
  description: string;
  date: string;
  location: string;
  memberCount: number;
  memberLimit: number;
  role: '관리자' | '일반 회원';
  backgroundColor: string;
  backgroundImage: string;
}

const ClubPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('home');
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
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleColorChange = (newColor: string) => {
    if (clubData) {
      setClubData({
        ...clubData,
        backgroundColor: newColor,
        backgroundImage: '',
      });
    }
  };

  const handleImageChange = (newImage: string) => {
    if (clubData) {
      setClubData({
        ...clubData,
        backgroundColor: 'bg-gray-100',
        backgroundImage: newImage,
      });
    }
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    if (menu.includes('Board')) {
      navigate(`/club/board/${menu}`);
    } else if (menu === 'home') {
      navigate('/club');
    } else {
      navigate(`/club/${menu}`);
    }
  };

  const [clubData, setClubData] = useState<ClubData | null>(null);

  useEffect(() => {
    if (location.state) {
      const state = location.state as ClubData;
      setClubData(state);
    }
  }, [location.state]);

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
      {clubData && (
        <ClubHero
          clubData={clubData}
          onColorChange={handleColorChange}
          onImageChange={handleImageChange}
        />
      )}
      <div className="flex mt-4 justify-center">
        <ClubSidebar
          roomId="1"
          clubId={1}
          selectedMenu={selectedMenu}
          setSelectedMenu={handleMenuClick}
        />
        <div>
          {selectedMenu === 'home' && clubData && (
            <div>
              <ClubMain clubData={clubData} />
            </div>
          )}
          <Outlet />
        </div>
      </div>
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

export default ClubPage;
