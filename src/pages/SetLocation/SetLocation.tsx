import { Api } from '@/api/Apis';
import animationData from '@/assets/lottie/setlocation.json';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import MapComponent from '@/pages/SetLocation/MapComponent';
import { useUserStore } from '@/store/userStore';
import { CircleAlert, Map } from 'lucide-react';
import React, { useRef, useState } from 'react';

const apiInstance = new Api();

const SetLocation: React.FC = () => {
  const { isLoggedIn, setUser, clearUser } = useUserStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [profileCoords, setProfileCoords] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [notificationCoords, setNotificationCoords] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const profileRef = useRef<HTMLImageElement>(null);
  const [myLocation, setMyLocation] = useState(''); // 위치 상태
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);

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

  // 위치 데이터를 업데이트하는 함수
  const handleLocationSelect = (newLocation: string) => {
    setMyLocation(newLocation);
  };

  const handleNeighborhoodsUpdate = (neighborhoods: string[]) => {
    setNeighborhoods(neighborhoods);
  };

  const handleVerification = async () => {
    const locationParts = myLocation.split(' ');
    const location = locationParts[locationParts.length - 1];
    const isVerified = neighborhoods.includes(location);
    try {
      // 서버에 데이터 전송
      await apiInstance.api.insertUserLocation({
        locations: neighborhoods,
        isVerified,
      });
      setUser({
        location: location,
      });
      localStorage.setItem('neighborhoods', JSON.stringify(neighborhoods));
      alert(isVerified ? '동네 인증 성공!' : '동네 인증 실패.');
    } catch (error) {
      console.error('Error verifying location:', error);
    }
  };

  return (
    <div>
      <Header
        toggleProfileModal={toggleProfileModal}
        toggleNotificationModal={toggleNotificationModal}
        isLoggedIn={isLoggedIn}
        handleLoginLogout={handleLogout}
        profileRef={profileRef}
        hasNotifications={hasNotifications}
      />
      <div className="min-h-screen flex flex-col items-center">
        <HeroSection
          backgroundColor="bg-primary"
          title="우리 동네를 설정해요"
          subtitle="내 위치를 기반으로 영역을 설정해서 원하는 모임/동아리를 찾아봐요"
          animationData={animationData}
        />
        <main className="flex-grow container mx-auto py-4 px-4 flex flex-col items-center">
          <section className="bg-white p-8 w-full mt-8 rounded shadow-md flex flex-col items-center">
            <MapComponent
              onLocationSelect={handleLocationSelect}
              onNeighborhoodsUpdate={handleNeighborhoodsUpdate}
            />
            <div className="flex space-x-4 p-8 items-center justify-center">
              <Map className="text-primary " />
              <p className="font-neoBold whitespace-nowrap">현재 내 위치</p>
              <Input
                value={myLocation}
                onChange={(e) => setMyLocation(e.target.value)}
              />
            </div>

            <HoverCard>
              <HoverCardTrigger>
                <div className="flex space-x-2 items-center mb-4">
                  <CircleAlert />
                  <p className="text-sm">동네 설정은 어떤 기능인가요?</p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent style={{ color: '#64748B', fontSize: 14 }}>
                내 동네 설정에서 모동을 사용할 동네를 설정할 수 있어요. 동네
                범위 (가까운 동네 ~ 먼 동네)를 선택하면, 홈 화면에 보여지는
                게시글의 범위가 달라져요.
              </HoverCardContent>
            </HoverCard>

            <Button
              onClick={handleVerification}
              className="bg-slate-100 hover:bg-slate-200 text-black font-neoBold"
            >
              동네 인증하기
            </Button>
          </section>
        </main>
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
    </div>
  );
};

export default SetLocation;
