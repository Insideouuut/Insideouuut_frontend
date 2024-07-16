import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


interface ProfileModalProps {
  toggleProfileModal: () => void;
  handleLogout: () => void;
  profileRef: React.RefObject<HTMLImageElement>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ toggleProfileModal, handleLogout }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggleProfileModal();
    }
  };

  const handleMouseLeave = () => {
    toggleProfileModal();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    modalRef.current?.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      modalRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute top-16 right-2 " ref={modalRef}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-32">
        <ul className="space-y-3">
          <li className="text-[13px] font-neoBold border-b pb-2 cursor-pointer">
            <Link to="/profile-edit" onClick={toggleProfileModal}>프로필 수정</Link>
          </li>
          <li className="text-[13px] font-neoBold border-b pb-2 cursor-pointer">
            <Link to="/participation-list" onClick={toggleProfileModal}><p>모임/동아리</p>참여 목록</Link>
          </li>
          <li className="text-[13px] font-neoBold text-red-500 cursor-pointer" onClick={handleLogout}>
            로그아웃
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileModal;
