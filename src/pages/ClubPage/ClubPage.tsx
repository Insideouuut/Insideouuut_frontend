// src/pages/ClubPage/ClubPage.tsx

import { Api } from '@/api/Apis';
import { getClubData } from '@/api/clubApi';
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
  const { id: clubId } = useParams<{ id: string }>();
  const location = useLocation();
  const type = location.pathname.includes('/club') ? 'club' : 'meeting';
  const [clubData, setClubData] = useState<ClubData | Result | null>(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (clubId) {
          let data: ClubData | Result | null = null;
          if (type === 'club') {
            data = await getClubData(clubId);
          } else if (type === 'meeting') {
            data = await getMeetingData(clubId);
          }
          setClubData(data ?? null);

          const token = localStorage.getItem('accessToken') || '';
          const authorityResponse = await checkUserAuthority(clubId, token);
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
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [clubId, type]);

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
          userProfile={userProfile}
          userAuthority={userAuthority}
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
            isHost={userAuthority === '호스트'}
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
