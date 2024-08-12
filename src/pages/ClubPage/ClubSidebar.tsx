import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { removeClubMember } from '@/api/clubApi'; // 동아리 나가기 API 가져오기
import { leaveMeeting } from '@/api/meetingApi'; // 모임 나가기 API 가져오기

interface ClubSidebarProps {
  roomId: string;
  id: number;
  chatRoomId: string | number; // 채팅방 id
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  type: string; // '동아리' 또는 '모임'
  userAuthority: string; // '호스트', '멤버', '권한 없음'
}

const ClubSidebar: React.FC<ClubSidebarProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  roomId,
  chatRoomId,
  id,
  selectedMenu,
  setSelectedMenu,
  type,
  userAuthority,
}) => {
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveConfirmation, setLeaveConfirmation] = useState('');
  const [leaveError, setLeaveError] = useState('');

  const navigate = useNavigate();

  const handleMenuClick = (menu: string) => {
    const basePath = type === 'club' ? `/club/${id}` : `/meeting/${id}`;
    setSelectedMenu(menu);

    if (menu === 'chatRooms') {
      navigate(`${basePath}/chatRooms/${chatRoomId}`);
    } else {
      navigate(menu === 'home' ? basePath : `${basePath}/${menu}`);
    }
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

  const handleLeaveClub = async () => {
    if (leaveConfirmation !== '나가기') {
      setLeaveError('Please type "나가기" to confirm.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken') || '';
      await removeClubMember(id.toString(), id.toString(), token); // 동아리 나가기 API 호출
      alert('동아리에서 성공적으로 나갔습니다.');
      navigate('/main'); // 동아리를 나간 후 메인 페이지로 이동
    } catch (error) {
      console.error('Error leaving the club:', error);
      alert('동아리에서 나가는데 실패했습니다.');
    }
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

        {type === 'club' && userAuthority !== '권한 없음' && (
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

        {type === 'club' && (
          <div className="space-y-1">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsBoardOpen(!isBoardOpen)}
              onKeyDown={(event) =>
                handleAccordionKeyDown(event, () => setIsBoardOpen(!isBoardOpen))
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

        {(userAuthority === '멤버' || userAuthority === '호스트') && type === 'club' && (
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
                className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('meetingListSettings')}`}
              >
                모임 관리
              </div>
              {userAuthority === '멤버' && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsLeaveModalOpen(true)}
                  onKeyDown={(event) => handleKeyDown(event, 'leaveClub')}
                  className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('leaveClub')}`}
                >
                  동아리 나가기
                </div>
              )}
            </div>
          </div>
        )}

        {userAuthority === '호스트' && (
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
              <div className="flex items-center space-x-2">
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
                {type === 'club' ? '동아리 관리' : '모임 관리'}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Leave Club Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">동아리 나가기</h2>
            <p className="mb-4">정말로 동아리에서 나가시겠습니까?</p>
            <p className="mb-4">
              "나가기"를 입력하여 확인하세요:
              <input
                type="text"
                value={leaveConfirmation}
                onChange={(e) => {
                  setLeaveConfirmation(e.target.value);
                  setLeaveError('');
                }}
                className="block w-full mt-2 p-2 border rounded"
              />
              {leaveError && (
                <p className="text-red-500 text-sm mt-2">{leaveError}</p>
              )}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
                onClick={() => setIsLeaveModalOpen(false)}
              >
                취소
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                onClick={handleLeaveClub}
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubSidebar;
