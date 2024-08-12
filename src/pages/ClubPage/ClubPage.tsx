import { Api } from '@/api/Apis';
import {
  checkUserAuthority as checkClubUserAuthority,
  getClubData,
} from '@/api/clubApi';
import { checkUserAuthority, getMeetingData } from '@/api/meetingApi';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { ClubData } from '@/types/Clubs';
import { Result } from '@/types/Meetings';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.pathname.includes('/club') ? '동아리' : '모임';
  const [data, setData] = useState<ClubData | Result | null>(null);
  const [userProfile, setUserProfile] = useState<{
    nickname: string;
    profileImage: string;
  } | null>(null);
  const [userAuthority, setUserAuthority] = useState<string>('');
  const [profileCoords, setProfileCoords] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [notificationCoords, setNotificationCoords] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
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
    localStorage.removeItem('accessToken');
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    const basePath = type === '동아리' ? `/club/${id}` : `/meeting/${id}`;

    if (menu.includes('Board')) {
      navigate(`${basePath}/board/${menu}`);
    } else if (menu === 'home') {
      navigate(`${basePath}`);
    } else {
      navigate(`${basePath}/${menu}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let fetchedData: ClubData | Result | null = null;
          const token = localStorage.getItem('accessToken') || '';

          if (type === '동아리') {
            fetchedData = await getClubData(id);
            setData(fetchedData ?? null);

            const authorityResponse = await checkClubUserAuthority(id, token);
            const authority = authorityResponse.results[0].authority;
            setUserAuthority(authority);

            if (authority === '호스트' || authority === '멤버') {
              const api = new Api();
              const profileResponse = await api.api.getMyProfile();
              const profile = profileResponse.results?.[0];

              if (profile?.nickname && profile?.profileImage) {
                setUserProfile({
                  nickname: profile.nickname,
                  profileImage: profile.profileImage,
                });
              } else {
                setUserProfile(null);
              }
            }
          } else if (type === '모임') {
            fetchedData = await getMeetingData(id);
            setData(fetchedData ?? null);

            const authorityResponse = await checkUserAuthority(id, token);
            const authority = authorityResponse.results[0].authority;
            setUserAuthority(authority);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, type]);

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
      {data && (
        <ClubHero
          data={data}
          userProfile={userProfile}
          userAuthority={userAuthority}
          type={type}
        />
      )}
      <div className="flex mt-4 justify-center">
        {data && (
          <ClubSidebar
            roomId={'1'}
            id={id ? parseInt(id) : 0}
            selectedMenu={selectedMenu}
            setSelectedMenu={handleMenuClick}
            type={type}
            userAuthority={userAuthority}
          />
        )}
        <div>
          {selectedMenu === 'home' && data && (
            <div>
              <ClubMain data={data} />
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
