import React, { RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import logo from '@/components/icons/logo.png';
import location from '@/components/icons/location.svg';
import notification_default from '@/components/icons/notification_default.svg';
import notification_active from '@/components/icons/notification_active.svg';
import profileImage from '@/components/icons/profile.webp';

interface HeaderProps {
  toggleProfileModal: () => void;
  toggleNotificationModal: () => void;
  isLoggedIn: boolean;
  handleLoginLogout: () => void;
  profileRef: RefObject<HTMLImageElement>;
  hasNotifications: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleProfileModal, toggleNotificationModal, isLoggedIn, handleLoginLogout, profileRef, hasNotifications }) => {
  return (
    <nav className="bg-white px-4 py-3.5 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-10">
          <Link to="/landing"><img src={logo} alt="Logo" className="h-8 w-32" /></Link>
          {isLoggedIn ? (
            <ul className="flex gap-10">
              <li><Link to="/location" className="flex font-neoExtraBold border-x-2 px-8 gap-1">내 위치<img src={location} alt="Location" /></Link></li>
              <li><Link to="/create-group" className="font-neoExtraBold ">모임 생성</Link></li>
              <li><Link to="/create-club" className="font-neoExtraBold ">동아리 생성</Link></li>
              <li><Link to="/chat" className="font-neoExtraBold ">채팅</Link></li>
            </ul>
          ) : (
            <ul className="flex gap-2">
              <li className='border-l-2 px-10 font-neoExtraBold'><Link to="/">모임 둘러보기</Link></li>
              <li className='font-neoExtraBold'><Link to="/">동아리 둘러보기</Link></li>
            </ul>
          )}
        </div>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4 relative">
            <div>
              <input type="text" placeholder="검색" className="text-sm border rounded px-5 py-2" />
              <Button className="ml-2 hover:text-neutral-100 hover:bg-green-700">검색</Button>
            </div>
            <img
              src={hasNotifications ? notification_active : notification_default}
              alt="Notifications"
              className="h-8 w-8 cursor-pointer"
              onClick={toggleNotificationModal}
            />
            <img 
              ref={profileRef}
              src={profileImage} 
              alt="Profile" 
              className="h-8 w-8 rounded-full cursor-pointer" 
              onClick={toggleProfileModal} 
            />
          </div>
        ) : (
          <ul className="flex space-x-4">
            <li><Link to="/"><Button variant={"outline"} className="font-neoBold border-green-600 text-green-600 hover:text-green-800 hover:bg-neutral-100">회원가입 하러가기</Button></Link></li>
            <li><Button onClick={handleLoginLogout} className="font-neoBold hover:text-neutral-100 hover:bg-green-700">로그인 하러가기</Button></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
