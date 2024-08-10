import {
  getChatRoomsByUserId,
  getClubRoomsByUserId,
  getMeetingRoomsByUserId,
} from '@/api/chatApi'; // import the API functions
import animationData from '@/assets/lottie/chat.json';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NotificationModal from '@/components/ui/notificationModal';
import ProfileModal from '@/components/ui/profileModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUserStore } from '@/store/userStore'; // zustand store import
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockChatRooms } from './chatMockData';

const ChatRoom: React.FC = () => {
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
  const [filter, setFilter] = useState<'ALL' | 'CLUB' | 'MEETING'>('ALL'); // 필터 상태 추가
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

  const { clubId } = useParams<{ clubId: string }>(); // URL에서 clubId 값을 가져옴
  const { nickname, imageUrl } = useUserStore(); // zustand에서 현재 사용자 정보 가져오기

  // 데이터 로드
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const chatRoomsResponse = await getChatRoomsByUserId();

        console.log('Chat Rooms:', chatRoomsResponse);

        const meetingRoomsResponse = await getMeetingRoomsByUserId();

        console.log('Meeting Rooms:', meetingRoomsResponse);

        const clubRoomsResponse = await getClubRoomsByUserId();

        console.log('Club Rooms:', clubRoomsResponse);
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error);
      }
    };

    fetchChatRooms();
  }, []);

  // 필터링된 채팅방 목록
  const filteredChatRooms = mockChatRooms.filter((room) => {
    if (filter === 'ALL') return true;
    return room.type === filter;
  });

  return (
    <div>
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
        title="우리 동네를 설정해요"
        subtitle="내 위치를 기반으로 영역을 설정해서 원하는 모임/동아리를 찾아봐요"
        animationData={animationData}
      />
      <main className="relative mt-4 min-h-screen flex flex-col items-center">
        <div className="container flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
          <Select
            onValueChange={(value) =>
              setFilter(value as 'ALL' | 'CLUB' | 'MEETING')
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="전체 채팅방" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">전체 채팅방</SelectItem>
              <SelectItem value="CLUB">동아리 채팅방</SelectItem>
              <SelectItem value="MEETING">모임 채팅방</SelectItem>
            </SelectContent>
          </Select>
          <span className="mb-6 block w-full h-[1px] bg-gray-200"></span>
          <div>
            <ul>
              {filteredChatRooms.map((room, index) => {
                return (
                  <li
                    key={index}
                    className="mb-4 flex items-center p-3 space-x-4 rounded-lg border-2 border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl">
                      {room.lastMessageContent}
                    </div>

                    <div>
                      <Link
                        to={`/club/chatRooms/${clubId}/${index}`}
                        state={{ user: { nickname, imageUrl } }}
                        key={index}
                        className="text-primary hover:cursor text-md font-semibold"
                      >
                        {room.title}

                        <p className="text-xs text-gray-600">
                          {room.lastMessageContent
                            ? `${room.lastMessageContent}`
                            : 'No messages yet.'}
                        </p>
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
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
      </main>
    </div>
  );
};

export default ChatRoom;
