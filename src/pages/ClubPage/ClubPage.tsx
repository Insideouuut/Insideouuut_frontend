import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import React, { useRef, useState } from 'react';
import ClubHero from './ClubHero';
import ClubMain from './ClubMain';
import ClubSidebar from './ClubSidebar';
import MemberList from './MemberList';
import MeetingList from './MeetingList';
import MemberApproval from './MemberApproval';
interface ClubData {
  type: '동아리' | '모임';
  category: '운동' | '사교/취미' | '공부';
  title: string;
  description: string;
  schedule: string;
  location: string;
  members: string;
  role: '관리자' | '일반 회원';
  backgroundColor: string;
  backgroundImage: string;
}

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
    setClubData((prevData) => ({ ...prevData, backgroundColor: newColor }));
  };

  const [clubData, setClubData] = useState<ClubData>({
    type: '동아리',
    category: '사교/취미',
    title: '한강 러닝 크루',
    description: '다같이 모여서 즐겁게 러닝해요!',
    schedule: '24.07.17(화)',
    location: '노원구',
    members: '10/30',
    role: '관리자',
    backgroundColor: 'bg-green-100',
    backgroundImage: '',
  });

  const clubInfo = {
    name: clubData.title,
    description: clubData.description,
    meetingTimes: clubData.schedule,
    location: clubData.location,
    maxParticipants: 30,
    currentParticipants: 10,
    contact: 'contact@example.com',
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
      <ClubHero clubData={clubData} onColorChange={handleColorChange} />
      <div className="flex mt-4 justify-center">
        <ClubSidebar
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        <div>
          {selectedMenu === 'home' && (
            <div>
              <ClubMain clubData={clubInfo} />
            </div>
          )}
          {selectedMenu === 'meetingList' && (
            <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
              <MeetingList/>
            </div>
          )}
          {selectedMenu === 'noticeBoard' && (
            <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
              공지 게시판 컴포넌트
            </div>
          )}
          {selectedMenu === 'freeBoard' && (
            <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
              자유 게시판 컴포넌트
            </div>
          )}
          {selectedMenu === 'reviewBoard' && (
            <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
              후기 게시판 컴포넌트
            </div>
          )}
          {selectedMenu === 'questionBoard' && (
            <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
              질문 게시판 컴포넌트
            </div>
          )}
          {selectedMenu === 'chat' && (
            <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
              채팅 컴포넌트
            </div>
          )}
          {selectedMenu === 'members' && <MemberList />}
          {selectedMenu === 'createMeeting' && (
            <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
              모임 생성 컴포넌트
            </div>
          )}
          {selectedMenu === 'mymeetingList' && (
            <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
              모임 목록 설정 컴포넌트
            </div>
          )}
          {selectedMenu === 'manageClub' && (
            <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
              동아리 관리 컴포넌트
            </div>
          )}
          {selectedMenu === 'memberRequests' && (
            <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
                <MemberApproval/>
            </div>
          )}
          {selectedMenu === 'manageMembers' && (
            <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
            </div>
          )}
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
