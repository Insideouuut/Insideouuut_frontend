import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="p-6 border-t-[1px] bg-white text-black">
      <div className="flex justify-center gap-10">
        <ul>
          <li>
            <Link to="/landing" className="text-sm">
              서비스 소개
            </Link>
          </li>
          <li>
            <Link to="/landing" className="text-sm">
              이용약관
            </Link>
          </li>
          <li>
            <Link to="/landing" className="text-sm">
              개인정보 처리방침
            </Link>
          </li>
          <li>
            <Link to="/landing" className="text-sm">
              위치기반서비스 이용약관
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/landing" className="text-sm">
              뭘까요
            </Link>
          </li>
          <li>
            <Link to="/landing" className="text-sm">
              이용약관
            </Link>
          </li>
          <li>
            <Link to="/landing" className="text-sm">
              개인정보 처리방침
            </Link>
          </li>
          <li>
            <Link to="/landing" className="text-sm">
              위치기반서비스 이용약관
            </Link>
          </li>
        </ul>
      </div>
      <p className="text-center mt-10">
        &copy; 2024 ModongPage. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
