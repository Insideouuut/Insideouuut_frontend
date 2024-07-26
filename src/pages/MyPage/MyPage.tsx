import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserStore } from '@/store/userStore';
import React, { useRef, useState } from 'react';
import MyModong from './MyModong';
import UpdateUser from './UpdateUser';

const MyPage: React.FC = () => {
  const { imageUrl, setUser } = useUserStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser({ imageUrl: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageReset = () => {
    setUser({ imageUrl: 'https://via.placeholder.com/100' });
  };

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
      <div className="bg-gray-200 w-full max-h-full p-10">
        <div className="container flex flex-col shadow-md border border-gray-200 rounded-lg p-10 items-center justify-center bg-white relative">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-40 h-40 rounded-full mb-3"
          />
          <div className="flex space-x-4">
            <Button className="mb-3 font-neoBold hover:text-neutral-100 hover:bg-green-700">
              <label htmlFor="imageUpload" className="cursor-pointer">
                프로필 사진 업로드
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </Button>
            <Button
              className="mb-3 font-neoBold bg-white border border-green-600 text-green-600 hover:text-green-800 hover:bg-neutral-100"
              onClick={handleImageReset}
            >
              프로필 사진 삭제
            </Button>
          </div>
          <p className="font-neoLight text-xs">최대 ?MB까지 업로드 가능</p>
          <p className="font-neoLight text-xs">회원 이미지는 원형으로 출력</p>
          <div className="shadow-md border w-full border-gray-200 rounded-lg m-12 p-24 max-w-full  md:w-[800px]">
            <Tabs defaultValue="account" className="w-full">
              <div className="w-full flex items-center justify-center mb-10">
                <TabsList>
                  <TabsTrigger value="account">회원 정보 수정</TabsTrigger>
                  <TabsTrigger value="password">모임/동아리 목록</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="account">
                <UpdateUser />
              </TabsContent>
              <TabsContent value="password">
                <MyModong />
              </TabsContent>
            </Tabs>
          </div>
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

export default MyPage;