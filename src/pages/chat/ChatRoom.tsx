import { Api, ChatRoomResponseDTO } from '@/api/Apis';
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
import { useUserStore } from '@/store/userStore';
import { Bell, UsersRound } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
const apiInstance = new Api();

const ChatRoom: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { isLoggedIn, clearUser } = useUserStore();
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
    clearUser();
    setIsProfileModalOpen(false);
    localStorage.removeItem('accessToken');
    // localStorage.removeItem('neighborhoods'); 이웃 토큰 추후 상의
  };

  // 채팅방 목록 조회

  const [allRooms, setAllRooms] = useState<ChatRoomResponseDTO[][]>([]);
  const [meetingRooms, setMeetingRooms] = useState<ChatRoomResponseDTO[]>([]);
  const [clubRooms, setClubRooms] = useState<ChatRoomResponseDTO[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<string>('ALL');

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const response = await apiInstance.api.getChatRoomsByUserId();
        console.log('All Rooms :', response);
        if (response?.results) {
          setAllRooms(response.results); // 이차원 배열로 저장
        }
      } catch (error) {
        console.log('failed to fetch allRooms: ', error);
      }
    };

    const fetchMeetingRooms = async () => {
      try {
        const response = await apiInstance.api.getMeetingRoomsByUserId();
        console.log('Meeting Rooms :', response);
        if (response?.results) {
          setMeetingRooms(response.results.flat()); // 이차원 배열로 저장
        }
      } catch (error) {
        console.log('failed to fetch allRooms: ', error);
      }
    };

    const fetchClubRooms = async () => {
      try {
        const response = await apiInstance.api.getClubRoomsByUserId();
        console.log('Club Rooms :', response);
        if (response?.results) {
          setClubRooms(response.results.flat()); // 이차원 배열로 저장
        }
      } catch (error) {
        console.log('failed to fetch allRooms: ', error);
      }
    };

    fetchAllRooms();
    fetchMeetingRooms();
    fetchClubRooms();
  }, []);

  const renderRooms = () => {
    let roomsToRender: ChatRoomResponseDTO[] = [];

    if (selectedRoomType === 'ALL') {
      roomsToRender = allRooms.flat();
    } else if (selectedRoomType === 'CLUB') {
      roomsToRender = clubRooms;
    } else if (selectedRoomType === 'MEETING') {
      roomsToRender = meetingRooms;
    }

    if (roomsToRender.length === 0) {
      return <p>참여중인 채팅방이 없습니다</p>;
    }

    return roomsToRender.map((room: ChatRoomResponseDTO, index: number) => (
      <li
        key={index}
        className="mb-4 flex items-center p-3 space-x-4 rounded-lg border-2 border-gray-100"
      >
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl">
          {room.lastMessageContent ? room.lastMessageContent.charAt(0) : ''}
        </div>

        <div className="w-full">
          <Link
            to={`/${room.type?.toLowerCase()}/chatRooms/${index}`}
            state={{ room }}
            className="text-primary hover:cursor-pointer text-md font-semibold"
          >
            <div className="w-full flex justify-between ">
              <div>
                <p> {room.title}</p>
                <p className="text-xs text-gray-600">
                  {room.lastMessageContent
                    ? room.lastMessageContent
                    : '메시지 내역이 없습니다.'}
                </p>
              </div>

              <div className="mr-10 flex items-center space-x-3  justify-center ">
                <div className="flex flex-col items-center  text-xs font-neoExtraBold text-red-600  ">
                  <Bell />
                  {room.unreadMessageCnt}
                </div>
                <div className="flex flex-col items-center font-neoExtraBold">
                  <UsersRound />
                  <p className="text-xs">{room.userCount}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </li>
    ));
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
      <HeroSection
        backgroundColor="bg-primary"
        title="우리 동네를 설정해요"
        subtitle="내 위치를 기반으로 영역을 설정해서 원하는 모임/동아리를 찾아봐요"
        animationData={animationData}
      />
      <main className="relative mt-4 min-h-screen flex flex-col items-center">
        <div className="container flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
          <Select onValueChange={(value) => setSelectedRoomType(value)}>
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
          <ul className="mt-4">{renderRooms()}</ul>
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
