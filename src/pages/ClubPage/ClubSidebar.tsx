import React, { useState } from 'react';
import { Home, ClipboardList, MessageCircleMore, Settings, Lock, List, ChevronDown, ChevronUp, Users } from 'lucide-react';

const ClubSidebar: React.FC = () => {
    const [isBoardOpen, setIsBoardOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

    const handleMenuClick = (menu: string) => {
        setSelectedMenu(menu);
    };

    const getMenuClass = (menu: string) => {
        return selectedMenu === menu ? 'text-green-600' : 'hover:bg-gray-100';
    };

    return (
        <div className="w-44 rounded-lg border-2 mr-4 p-3 h-full">
            <nav className="space-y-1">
                <div onClick={() => handleMenuClick('home')} className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg ${getMenuClass('home')}`}>
                    <Home className="w-5 h-5" />
                    <span className="text-sm">홈</span>
                </div>
                <div onClick={() => handleMenuClick('meetingList')} className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg ${getMenuClass('meetingList')}`}>
                    <ClipboardList className="w-5 h-5" />
                    <span className="text-sm">모임 목록</span>
                </div>
                <div className="space-y-1">
                    <div onClick={() => setIsBoardOpen(!isBoardOpen)} className={`${isBoardOpen ? 'bg-gray-100' : 'bg-white'} flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100 rounded-lg`}>
                        <div className="flex items-center space-x-2">
                            <List className="w-5 h-5" />
                            <span className="text-sm">게시판</span>
                        </div>
                        <span>{isBoardOpen ? <ChevronUp /> : <ChevronDown />}</span>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${isBoardOpen ? 'max-h-40' : 'max-h-0'}`}>
                        <div className="pl-6 space-y-1">
                            <div onClick={() => handleMenuClick('noticeBoard')} className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('noticeBoard')}`}>공지 게시판</div>
                            <div onClick={() => handleMenuClick('freeBoard')} className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('freeBoard')}`}>자유 게시판</div>
                            <div onClick={() => handleMenuClick('reviewBoard')} className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('reviewBoard')}`}>후기 게시판</div>
                            <div onClick={() => handleMenuClick('questionBoard')} className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('questionBoard')}`}>질문 게시판</div>
                        </div>
                    </div>
                </div>
                <div onClick={() => handleMenuClick('chat')} className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg ${getMenuClass('chat')}`}>
                    <MessageCircleMore className="w-5 h-5" />
                    <span className="text-sm">채팅</span>
                </div>
                <div onClick={() => handleMenuClick('members')} className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg ${getMenuClass('members')}`}>
                    <Users className="w-5 h-5" />
                    <span className="text-sm">멤버</span>
                </div>
                <div className="space-y-1">
                    <div onClick={() => setIsSettingsOpen(!isSettingsOpen)} className={`${isSettingsOpen ? 'bg-gray-100' : 'bg-white'} flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100 rounded-lg`}>
                        <div className="flex items-center space-x-2">
                            <Settings className="w-5 h-5" />
                            <span className="text-sm">모임 관리</span>
                        </div>
                        <span>{isSettingsOpen ? <ChevronUp /> : <ChevronDown />}</span>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${isSettingsOpen ? 'max-h-20' : 'max-h-0'}`}>
                        <div onClick={() => handleMenuClick('createMeeting')} className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('createMeeting')}`}>모임 생성</div>
                        <div onClick={() => handleMenuClick('meetingListSettings')} className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('meetingListSettings')}`}>모임 목록</div>
                    </div>
                </div>
                <div className="space-y-1">
                    <div onClick={() => setIsAdminOpen(!isAdminOpen)} className={`${isAdminOpen ? 'bg-gray-100' : 'bg-white'} flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100 rounded-lg`}>
                        <div className={`flex items-center space-x-2`}>
                            <Lock className="w-5 h-5" />
                            <span className="text-sm">관리자</span>
                        </div>
                        <span>{isAdminOpen ? <ChevronUp /> : <ChevronDown />}</span>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${isAdminOpen ? 'max-h-[120px]' : 'max-h-0'}`}>
                        <div onClick={() => handleMenuClick('memberRequests')} className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('memberRequests')}`}>멤버 신청 목록</div>
                        <div onClick={() => handleMenuClick('manageMembers')} className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('manageMembers')}`}>멤버 관리</div>
                        <div onClick={() => handleMenuClick('manageClub')} className={`cursor-pointer hover:bg-gray-100 p-2 text-sm rounded-lg ${getMenuClass('manageClub')}`}>동아리 관리</div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default ClubSidebar;
