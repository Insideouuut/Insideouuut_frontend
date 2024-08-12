import { getClubData } from '@/api/clubApi';
import { getMeetingData } from '@/api/meetingApi';
import runImg from '@/assets/icons/run.png';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { ClubData } from '@/types/Clubs';
import { Result } from '@/types/Meetings';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ClubRegistration from './ClubRegistration';

const GroupJoinPage: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const location = useLocation();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [data, setData] = useState<Result | ClubData | null>(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const typeParam = searchParams.get('type');
        let type: 'club' | 'meeting' = 'meeting';

        if (typeParam === 'club') {
          type = 'club';
        } else if (typeParam === 'meeting') {
          type = 'meeting';
        }

        if (type === 'club') {
          const clubData = await getClubData(clubId || '');
          setData(clubData);
        } else {
          const meetingData = await getMeetingData(clubId || '');
          setData(meetingData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [clubId, location.search]);

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

  const searchParams = new URLSearchParams(location.search);
  const type: 'club' | 'meeting' =
    searchParams.get('type') === 'club' ? 'club' : 'meeting';

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
      <HeroSection
        backgroundColor="bg-primary"
        title="모임 / 동아리 가입하기"
        subtitle="우리의 다양한 모임과 동아리에서 새로운 취미를 발견하고, 기존의 취미를 더욱 즐겁게 누려보세요."
        imageData={{ src: runImg, alt: 'Run Icon' }}
      />
      {data ? (
        <ClubRegistration clubData={data} type={type} /> // URL 파라미터에서 가져온 타입을 전달
      ) : (
        <p>Loading...</p>
      )}
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

export default GroupJoinPage;
