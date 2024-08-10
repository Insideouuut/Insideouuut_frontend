import { Api } from '@/api/Apis'; // Apis.ts 파일에서 Api 클래스를 가져옴
import { getClubData } from '@/api/meetingApi';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { Result } from '@/types/Meetings';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import ClubHero from './ClubHero';
import ClubMain from './ClubMain';
import ClubSidebar from './ClubSidebar';

const ClubPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('home');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken'),
  );
  const [hasNotifications, setHasNotifications] = useState(false);
  const { id: clubId } = useParams<{ id: string }>();
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
    localStorage.removeItem('accessToken');
  };

  const handleImageChange = (newImage: string) => {
    if (clubData) {
      setClubData({
        ...clubData,
        images: [{ name: 'newImage', url: newImage }],
      });
    }
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    if (menu.includes('Board')) {
      navigate(`/club/board/${menu}`);
    } else if (menu === 'home') {
      navigate(`/club/${clubId}`);
    } else {
      navigate(`/club/${clubId}/${menu}`);
    }
  };

  const [clubData, setClubData] = useState<Result | null>(null);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (clubId) {
          const data = await getClubData(clubId);
          setClubData(data);

          // 로그인한 사용자 프로필 정보를 가져옴
          const api = new Api(); // API 클래스 인스턴스 생성
          const profileResponse = await api.api.getMyProfile();

          const loggedInUserId = profileResponse.results?.[0]?.userId; // ProfileResponse의 userId 가져오기
          console.log('Logged in user ID:', loggedInUserId);
          console.log('Club host ID:', data.host.id);

          if (loggedInUserId) {
            setIsHost(data.host.id === loggedInUserId);
          }
        }
      } catch (error) {
        console.error('Error fetching club data or profile data:', error);
      }
    };

    fetchData();
  }, [clubId]);

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
          onImageChange={handleImageChange}
          isLoggedIn={isLoggedIn}
        />
      )}
      <div className="flex mt-4 justify-center">
        {clubData && (
          <ClubSidebar
            roomId={'1'}
            clubId={clubId ? parseInt(clubId) : 0}
            selectedMenu={selectedMenu}
            setSelectedMenu={handleMenuClick}
            clubType={clubData.type}
            isHost={isHost}
          />
        )}
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
