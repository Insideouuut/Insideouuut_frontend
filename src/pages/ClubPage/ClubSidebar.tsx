import React, { useState } from 'react';
import { Home, ClipboardList, MessageCircle, Settings, Lock } from 'lucide-react';

const ClubSidebar: React.FC = () => {
    const [isBoardOpen, setIsBoardOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    return (
        <div className="w-56  bg-gray-50 p-3 h-[1000px]">
            <nav className="space-y-1">
                <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100">
                    <Home className="w-5 h-5" />
                    <span className="text-sm">홈</span>
                </div>
                <div className="space-y-1">
                    <div onClick={() => setIsBoardOpen(!isBoardOpen)} className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100">
                        <div className="flex items-center space-x-2">
                            <ClipboardList className="w-5 h-5" />
                            <span className="text-sm">게시판</span>
                        </div>
                        <span>{isBoardOpen ? '▲' : '▼'}</span>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${isBoardOpen ? 'max-h-40' : 'max-h-0'}`}>
                        <div className="pl-6 space-y-1">
                            <div className="cursor-pointer hover:bg-gray-100 p-2 text-sm">공지 게시판</div>
                            <div className="cursor-pointer hover:bg-gray-100 p-2 text-sm">자유 게시판</div>
                            <div className="cursor-pointer hover:bg-gray-100 p-2 text-sm">후기 게시판</div>
                            <div className="cursor-pointer hover:bg-gray-100 p-2 text-sm">질문 게시판</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">채팅</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100">
                    <ClipboardList className="w-5 h-5" />
                    <span className="text-sm">멤버</span>
                </div>
                <div className="space-y-1">
                    <div onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100">
                        <div className="flex items-center space-x-2">
                            <Settings className="w-5 h-5" />
                            <span className="text-sm">설정</span>
                        </div>
                        <span>{isSettingsOpen ? '▲' : '▼'}</span>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${isSettingsOpen ? 'max-h-20' : 'max-h-0'}`}>
                        <div className="pl-6 space-y-1">
                            <div className="cursor-pointer hover:bg-gray-100 p-2 text-sm">모임 탈퇴</div>
                            <div className="cursor-pointer hover:bg-gray-100 p-2 text-sm">설정 메뉴 미정</div>
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <div onClick={() => setIsAdminOpen(!isAdminOpen)} className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100">
                        <div className="flex items-center space-x-2">
                            <Lock className="w-5 h-5" />
                            <span className="text-sm">관리자</span>
                        </div>
                        <span>{isAdminOpen ? '▲' : '▼'}</span>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${isAdminOpen ? 'max-h-[120px]' : 'max-h-0'}`}>
                        <div className="pl-6 space-y-1">
                            <div className="cursor-pointer hover:bg-gray-100 p-2 text-sm">멤버 신청 목록</div>
                            <div className="cursor-pointer hover:bg-gray-100 p-2 text-sm">멤버 관리</div>
                            <div className="cursor-pointer hover:bg-gray-100 p-2 text-sm">동아리 관리</div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default ClubSidebar;
