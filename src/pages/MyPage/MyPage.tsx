import { Api } from '@/api/Apis';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserStore } from '@/store/userStore';
import React, { useEffect, useRef, useState } from 'react';
import MyModong from './MyModong';
import UpdateUser from './UpdateUser';

const apiInstance = new Api();

const MyPage: React.FC = () => {
  const { isLoggedIn, setUser, nickname, clearUser } = useUserStore();
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

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [mannerRating, setMannerRating] = useState<number | null>(null); // mannerRating 상태 추가
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      try {
        // API 호출 시 직접 파일을 전달
        await apiInstance.api.updateUserProfileImage({ image: file });
        setUser({ imageUrl: URL.createObjectURL(file) });
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiInstance.api.getMyProfile();
        const results = response.data.results;
        if (results && results.length > 0) {
          const profileImageUrl = results[0]?.profileImage;
          const mannerRatingValue = results[0]?.mannerRating; // mannerRating 추출
          setProfileImage(profileImageUrl || null);
          setMannerRating(mannerRatingValue || null); // mannerRating 상태 설정
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error); // 에러 처리
      }
    };

    fetchProfile(); // 함수 호출
  }, []);
  const handleLoginLogout = () => {
    if (isLoggedIn) {
      clearUser();
    } else {
      // 로그인 로직 추가
      setUser({ isLoggedIn: true });
    }
  };
  return (
    <div className="relative">
      <Header
        toggleProfileModal={toggleProfileModal}
        toggleNotificationModal={toggleNotificationModal}
        isLoggedIn={isLoggedIn}
        handleLoginLogout={handleLoginLogout}
        profileRef={profileRef}
        hasNotifications={hasNotifications}
      />
      <div className="bg-gray-200 w-full max-h-full p-10">
        <div className="container flex flex-col shadow-md border border-gray-200 rounded-lg p-10 items-center justify-center bg-white relative">
          <div
            className={`w-40 h-40 rounded-full mb-3 flex items-center justify-center ${!profileImage ? 'bg-primary' : ''}`}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-xl">{nickname}</span>
            )}
          </div>
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
          </div>
          <p className="font-neoLight text-xs">최대 ?MB까지 업로드 가능</p>
          <p className="font-neoLight text-xs">회원 이미지는 원형으로 출력</p>
          <p className="font-medium text-xs mt-4">
            나의 매너 온도:
            {mannerRating !== null ? ` ${mannerRating}` : '정보 없음'}
          </p>
          {/* mannerRating 표시 */}
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
          handleLogout={handleLoginLogout}
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
