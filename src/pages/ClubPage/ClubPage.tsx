import { getClubData } from '@/api/meetingApi'; // API 호출 함수 임포트
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { ClubData } from '@/types/Meetings'; // ClubData 타입 임포트
import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ClubHero from './ClubHero';
import ClubMain from './ClubMain';
import ClubSidebar from './ClubSidebar';

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
  const { id } = useParams<{ id: string }>(); // useParams로 ID 가져오기
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
      navigate(`/club/${id}`);
    } else {
      navigate(`/club/${id}/${menu}`);
    }
  };

  const [clubData, setClubData] = useState<ClubData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const data: ClubData = await getClubData(id); // Ensure data is of type ClubData
          setClubData(data);
        } catch (error) {
          console.error('Error fetching club data:', error);
        }
      }
    };

    fetchData();
  }, [id]);

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
