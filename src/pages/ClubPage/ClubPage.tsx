import { Api } from '@/api/Apis';
import { checkClubUserAuthority, getClubData } from '@/api/clubApi';
import { checkMeetingUserAuthority, getMeetingData } from '@/api/meetingApi';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { useUserStore } from '@/store/userStore';
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
  const { isLoggedIn, clearUser } = useUserStore();
  const [hasNotifications, setHasNotifications] = useState(false);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.pathname.includes('/club') ? 'club' : 'meeting'; // 'club'과 'meeting'으로 변경
  const [data, setData] = useState<ClubData | Result | null>(null);

  // chatRoomId
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);

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

  useEffect(() => {
    // 경로에 따라 selectedMenu 업데이트
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length >= 3) {
      setSelectedMenu(pathSegments[2]); // 예: /club/:id/chatRooms 에서 chatRooms 선택
    }
  }, [location]);

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
    clearUser();
    setIsProfileModalOpen(false);
    localStorage.removeItem('accessToken');
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    const basePath = type === 'club' ? `/club/${id}` : `/meeting/${id}`;

    if (menu === 'chatRooms' && chatRoomId) {
      navigate(`${basePath}/chatRooms/${chatRoomId}`);
    } else if (menu !== 'chatRooms') {
      navigate(menu === 'home' ? basePath : `${basePath}/${menu}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let fetchedData: ClubData | Result | null = null;
          const token = localStorage.getItem('accessToken') || '';

          if (type === 'club') {
            fetchedData = await getClubData(id);
            console.log('동아리데이터: ', fetchedData);

            setData(fetchedData ?? null);

            // chatRoomId가 존재한다면 설정
            if (fetchedData?.chatRoomId) {
              setChatRoomId(fetchedData.chatRoomId.toString());
            }

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
          } else if (type === 'meeting') {
            fetchedData = await getMeetingData(id);
            console.log('모임데이터: ', fetchedData);
            setData(fetchedData ?? null);

            // chatRoomId가 존재한다면 설정
            if (fetchedData?.chatRoomId) {
              setChatRoomId(fetchedData.chatRoomId.toString());
            }

            const authorityResponse = await checkMeetingUserAuthority(
              id,
              token,
            );
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
        handleLoginLogout={() => handleLogout}
        profileRef={profileRef}
        hasNotifications={hasNotifications}
      />
      {data && (
        <ClubHero
          data={data}
          userProfile={userProfile}
          userAuthority={userAuthority}
          type={type} // 명확한 'club' 또는 'meeting' 값을 전달
        />
      )}
      <div className="flex mt-4 justify-center">
        {data && (
          <ClubSidebar
            chatRoomId={chatRoomId || ''} // chatRoomId 전달
            roomId={'1'}
            id={id ? parseInt(id) : 0}
            selectedMenu={selectedMenu}
            setSelectedMenu={handleMenuClick}
            type={type} // 명확한 'club' 또는 'meeting' 값을 전달
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
