import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { useUserStore } from '@/store/userStore';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Search from './searchHero';

const SearchPage: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { isLoggedIn, clearUser } = useUserStore();
  const [hasNotifications, setHasNotifications] = useState(false);
  const [profileCoords, setProfileCoords] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [notificationCoords, setNotificationCoords] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [token, setToken] = useState('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [topTab, setTopTab] = useState<string>('전체');
  const [bottomTab, setBottomTab] = useState<string>('전체');

  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || '';
    setToken(accessToken);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    const topTabParam = params.get('topTab');
    const bottomTabParam = params.get('bottomTab');

    if (query) setSearchQuery(query);
    if (topTabParam) setTopTab(topTabParam);
    if (bottomTabParam) setBottomTab(bottomTabParam);
  }, [location.search]);

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

  return (
    <div className="relative">
      <Header
        toggleProfileModal={toggleProfileModal}
        toggleNotificationModal={toggleNotificationModal}
        isLoggedIn={isLoggedIn}
        handleLoginLogout={handleLogout}
        hasNotifications={hasNotifications}
        profileRef={null}
      />
      <Search
        token={token}
        initialQuery={searchQuery}
        initialTopTab={topTab}
        initialBottomTab={bottomTab}
      />
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

export default SearchPage;
