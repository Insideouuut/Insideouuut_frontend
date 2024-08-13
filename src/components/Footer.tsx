import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="p-6 border-t-[1px] bg-white text-black">
      <div className="flex justify-center gap-12">
        <ul>
          <li>
            <Link to="/search" className="text-sm">
              모동 둘러보기
            </Link>
          </li>
          <li>
            <Link to="/create-meeting" className="text-sm">
              모임 생성
            </Link>
          </li>
          <li>
            <Link to="/create-club" className="text-sm">
              동아리 생성
            </Link>
          </li>
        </ul>
        <div className="min-h-full w-[1px] bg-gray-200"></div>
        <ul>
          <li>
            <Link to="/landing" className="text-sm">
              서비스 소개
            </Link>
          </li>
          <li>
            <Link to="/setlocation" className="text-sm">
              내 위치
            </Link>
          </li>
          <li>
            <Link to="/chatroom" className="text-sm">
              채팅
            </Link>
          </li>
        </ul>
      </div>
      <p className="text-center mt-8 text-gray-400 text-sm">
        &copy; 2024 ModongPage. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
