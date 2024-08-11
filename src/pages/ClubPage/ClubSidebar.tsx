import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Home,
  House,
  List,
  Lock,
  MessageCircleMore,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';
interface ClubSidebarProps {
  roomId: string;
  clubId: number;
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  clubType: string; // '동아리' 또는 '모임'
  isHost: boolean; // 사용자가 호스트인지 여부
}

const ClubSidebar: React.FC<ClubSidebarProps> = ({
  // roomId,
  // clubId,
  selectedMenu,
  setSelectedMenu,
  clubType,
  isHost,
}) => {
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    menu: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleMenuClick(menu);
    }
  };

  const handleAccordionKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    toggle: () => void,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggle();
    }
  };

  const getMenuClass = (menu: string) => {
    return selectedMenu === menu ? 'text-green-600' : 'hover:bg-gray-100';
  };

  return (
    <div className="w-44 mr-4 p-3 h-full">
      <nav className="space-y-1">
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleMenuClick('home')}
          onKeyDown={(event) => handleKeyDown(event, 'home')}
          className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg ${getMenuClass('home')}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-sm">홈</span>
        </div>

        {clubType === 'club' && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleMenuClick('meetingList')}
            onKeyDown={(event) => handleKeyDown(event, 'meetingList')}
            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg ${getMenuClass('meetingList')}`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-sm">모임 목록</span>
          </div>
        )}

        {clubType === '동아리' && (
          <div className="space-y-1">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsBoardOpen(!isBoardOpen)}
              onKeyDown={(event) =>
                handleAccordionKeyDown(event, () =>
                  setIsBoardOpen(!isBoardOpen),
                )
              }
              className={`flex items-center justify-between cursor-pointer p-2 rounded-lg ${isBoardOpen ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'}`}
            >
              <div className="flex items-center space-x-2">
                <List className="w-5 h-5" />
                <span className="text-sm">게시판</span>
              </div>
              <span>{isBoardOpen ? <ChevronUp /> : <ChevronDown />}</span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${isBoardOpen ? 'max-h-50' : 'max-h-0'}`}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleMenuClick('allBoard')}
                onKeyDown={(event) => handleKeyDown(event, 'allBoard')}
                className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('allBoard')}`}
              >
                전체 게시판
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleMenuClick('noticeBoard')}
                onKeyDown={(event) => handleKeyDown(event, 'noticeBoard')}
                className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('noticeBoard')}`}
              >
                공지 게시판
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleMenuClick('freeBoard')}
                onKeyDown={(event) => handleKeyDown(event, 'freeBoard')}
                className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('freeBoard')}`}
              >
                자유 게시판
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleMenuClick('reviewBoard')}
                onKeyDown={(event) => handleKeyDown(event, 'reviewBoard')}
                className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('reviewBoard')}`}
              >
                후기 게시판
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleMenuClick('questionBoard')}
                onKeyDown={(event) => handleKeyDown(event, 'questionBoard')}
                className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('questionBoard')}`}
              >
                질문 게시판
              </div>
            </div>
          </div>
        )}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleMenuClick(`chatRooms`)}
          onKeyDown={(event) => handleKeyDown(event, `chatRooms`)}
          className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg ${getMenuClass(`chatRooms`)}`}
        >
          <MessageCircleMore className="w-5 h-5" />
          <span className="text-sm">채팅</span>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => handleMenuClick('members')}
          onKeyDown={(event) => handleKeyDown(event, 'members')}
          className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg ${getMenuClass('members')}`}
        >
          <Users className="w-5 h-5" />
          <span className="text-sm">멤버</span>
        </div>

        {clubType === '동아리' && (
          <div className="space-y-1">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              onKeyDown={(event) =>
                handleAccordionKeyDown(event, () =>
                  setIsSettingsOpen(!isSettingsOpen),
                )
              }
              className={`flex items-center justify-between cursor-pointer p-2 rounded-lg ${isSettingsOpen ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'}`}
            >
              <div className="flex items-center space-x-2">
                <House className="w-5 h-5" />
                <span className="text-sm">나의 동아리</span>
              </div>
              <span>{isSettingsOpen ? <ChevronUp /> : <ChevronDown />}</span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${isSettingsOpen ? 'max-h-40' : 'max-h-0'}`}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleMenuClick('createMeeting')}
                onKeyDown={(event) => handleKeyDown(event, 'createMeeting')}
                className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('createMeeting')}`}
              >
                모임 생성
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleMenuClick('meetingListSettings')}
                onKeyDown={(event) =>
                  handleKeyDown(event, 'meetingListSettings')
                }
                className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('mymeetingList')}`}
              >
                모임 관리
              </div>
            </div>
          </div>
        )}

        {clubType === '모임' && !isHost && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleMenuClick('meetingListSettings')}
            onKeyDown={(event) => handleKeyDown(event, 'meetingListSettings')}
            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg ${getMenuClass('meetingListSettings')}`}
          >
            <House className="w-5 h-5" />
            <span className="text-sm">모임 관리</span>
          </div>
        )}

        {isHost && (
          <div className="space-y-1">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              onKeyDown={(event) =>
                handleAccordionKeyDown(event, () =>
                  setIsAdminOpen(!isAdminOpen),
                )
              }
              className={`flex items-center justify-between cursor-pointer p-2 rounded-lg ${isAdminOpen ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'}`}
            >
              <div className={`flex items-center space-x-2`}>
                <Lock className="w-5 h-5" />
                <span className="text-sm">관리자</span>
              </div>
              <span>{isAdminOpen ? <ChevronUp /> : <ChevronDown />}</span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${isAdminOpen ? 'max-h-[120px]' : 'max-h-0'}`}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleMenuClick('memberRequests')}
                onKeyDown={(event) => handleKeyDown(event, 'memberRequests')}
                className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('memberRequests')}`}
              >
                멤버 신청 목록
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleMenuClick('manageMembers')}
                onKeyDown={(event) => handleKeyDown(event, 'manageMembers')}
                className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('manageMembers')}`}
              >
                멤버 관리
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleMenuClick('manageClub')}
                onKeyDown={(event) => handleKeyDown(event, 'manageClub')}
                className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('manageClub')}`}
              >
                {clubType === '동아리' ? '동아리 관리' : '모임 관리'}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default ClubSidebar;
