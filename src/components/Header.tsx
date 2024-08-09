import location from '@/assets/icons/location.svg';
import logo from '@/assets/icons/logo.png';
import notification_active from '@/assets/icons/notification_active.svg';
import notification_default from '@/assets/icons/notification_default.svg';
import profileImage from '@/assets/icons/profile.webp';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import React, { RefObject, useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleProfileModal: (e: React.MouseEvent) => void;
  toggleNotificationModal: (e: React.MouseEvent) => void;
  isLoggedIn: boolean;
  handleLoginLogout: () => void;
  profileRef: RefObject<HTMLImageElement> | null;
  hasNotifications: boolean;
}

const Header: React.FC<HeaderProps> = ({
  toggleProfileModal,
  toggleNotificationModal,
  isLoggedIn,
  handleLoginLogout,
  profileRef,
  hasNotifications,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white px-4 py-3.5 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-10">
          <Link to="/main">
            <img src={logo} alt="Logo" className="h-8 w-32" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-4 relative">
          {isLoggedIn ? (
            <>
              <ul className="flex gap-10">
                <li>
                  <Link
                    to="/setlocation"
                    className="flex font-neoExtraBold gap-1"
                  >
                    내 위치
                    <img src={location} alt="setlocation" />
                  </Link>
                </li>
                <li>
                  <Link to="/create-meeting" className="font-neoExtraBold">
                    모임 생성
                  </Link>
                </li>
                <li>
                  <Link to="/create-club" className="font-neoExtraBold">
                    동아리 생성
                  </Link>
                </li>
                <li>
                  <Link to="/chatroom" className="font-neoExtraBold">
                    채팅
                  </Link>
                </li>
                <li>
                  <Link to="/landing" className="font-neoExtraBold text-xs">
                    서비스 소개
                  </Link>
                </li>
              </ul>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="모임,동아리를 검색해보세요"
                  className="text-xs border rounded px-5 py-2 "
                />
                <Button className="hover:text-neutral-100 hover:bg-green-700">
                  검색
                </Button>
                <button
                  onClick={toggleNotificationModal}
                  className="focus:outline-none"
                >
                  <img
                    src={
                      hasNotifications
                        ? notification_active
                        : notification_default
                    }
                    alt="Notifications"
                    className="h-8 w-8 cursor-pointer"
                  />
                </button>
                <button
                  onClick={toggleProfileModal}
                  className="focus:outline-none"
                >
                  <img
                    ref={profileRef}
                    src={profileImage}
                    alt="Profile"
                    className="h-8 w-8 rounded-full cursor-pointer"
                  />
                </button>
              </div>
            </>
          ) : (
            <div className="hidden lg:flex items-center space-x-4 relative justify-between ">
              <ul className="flex gap-10 lg:mr-70">
                <li>
                  <Link to="/" className="font-neoExtraBold">
                    모임 둘러보기
                  </Link>
                </li>
                <li>
                  <Link to="/" className="font-neoExtraBold">
                    동아리 둘러보기
                  </Link>
                </li>
              </ul>
              <div className="flex space-x-2">
                <Link to="/signup" onClick={toggleMenu}>
                  <Button
                    variant={'outline'}
                    className="font-neoBold border-green-600 text-green-600 hover:text-green-800 hover:bg-neutral-100 w-full"
                  >
                    회원가입 하러가기
                  </Button>
                </Link>
                <Link to="/login" onClick={toggleMenu}>
                  <Button
                    onClick={handleLoginLogout}
                    className="font-neoBold hover:text-neutral-100 hover:bg-green-700 w-full"
                  >
                    로그인 하러가기
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? (
              <X className="h-8 w-8 text-gray-800" />
            ) : (
              <Menu className="h-8 w-8 text-gray-800" />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-200 z-50">
          <div className="container mx-auto py-4 flex flex-col items-center space-y-4">
            {isLoggedIn ? (
              <>
                <div className="w-full px-4">
                  <input
                    type="text"
                    placeholder="검색"
                    className="text-sm border rounded px-5 py-2 w-full"
                  />
                  <Button className="w-full mt-2 hover:text-neutral-100 hover:bg-green-700">
                    검색
                  </Button>
                </div>
                <Link
                  to="/setlocation"
                  className="font-neoExtraBold flex items-center gap-1 w-full text-center"
                  onClick={toggleMenu}
                >
                  내 위치
                  <img src={location} alt="setlocation" className="ml-1" />
                </Link>
                <Link
                  to="/create-meeting"
                  className="font-neoExtraBold w-full text-center"
                  onClick={toggleMenu}
                >
                  모임 생성
                </Link>
                <Link
                  to="/create-club"
                  className="font-neoExtraBold w-full text-center"
                  onClick={toggleMenu}
                >
                  동아리 생성
                </Link>
                <Link
                  to="/chat"
                  className="font-neoExtraBold w-full text-center"
                  onClick={toggleMenu}
                >
                  채팅
                </Link>
                <Link
                  to="/landing"
                  className="font-neoExtraBold w-full text-center text-xs"
                  onClick={toggleMenu}
                >
                  서비스 소개
                </Link>
                <button
                  onClick={toggleNotificationModal}
                  className="focus:outline-none"
                >
                  <img
                    src={
                      hasNotifications
                        ? notification_active
                        : notification_default
                    }
                    alt="Notifications"
                    className="h-8 w-8 cursor-pointer"
                  />
                </button>
                <button
                  onClick={toggleProfileModal}
                  className="focus:outline-none"
                >
                  <img
                    ref={profileRef}
                    src={profileImage}
                    alt="Profile"
                    className="h-8 w-8 rounded-full cursor-pointer"
                  />
                </button>
              </>
            ) : (
              <div className="flex flex-col w-full justify-center space-y-3 text-center">
                <Link
                  to="/"
                  className="font-neoExtraBold border-b-2 w-full pb-2"
                  onClick={toggleMenu}
                >
                  모임 둘러보기
                </Link>
                <Link
                  to="/"
                  className="font-neoExtraBold border-b-2 w-full pb-2"
                  onClick={toggleMenu}
                >
                  동아리 둘러보기
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <Button
                    variant={'outline'}
                    className="font-neoBold border-green-600 text-green-600 hover:text-green-800 hover:bg-neutral-100 w-full"
                  >
                    회원가입 하러가기
                  </Button>
                </Link>
                <Link to="/login" onClick={toggleMenu}>
                  <Button
                    onClick={handleLoginLogout}
                    className="font-neoBold hover:text-neutral-100 hover:bg-green-700 w-full"
                  >
                    로그인 하러가기
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
