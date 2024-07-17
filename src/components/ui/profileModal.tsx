import React, { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ProfileModalProps {
  toggleProfileModal: (e?: React.MouseEvent) => void;
  handleLogout: () => void;
  profileRef: React.RefObject<HTMLImageElement>;
  coords: { top: number; left: number };
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  toggleProfileModal,
  handleLogout,
  profileRef,
  coords,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleProfileModal();
      }
    },
    [toggleProfileModal]
  );

  const handleMouseLeave = useCallback(() => {
    toggleProfileModal();
  }, [toggleProfileModal]);

  useEffect(() => {
    const currentModalRef = modalRef.current;
    document.addEventListener('mousedown', handleClickOutside);
    currentModalRef?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      currentModalRef?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleClickOutside, handleMouseLeave]);

  return (
    <div className="absolute" ref={modalRef} style={{ top: `${coords.top}px`, left: `${coords.left-40}px` }}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-32">
        <ul className="space-y-3">
          <li className="text-[13px] font-neoBold border-b pb-2 cursor-pointer">
            <Link to="/profile-edit" onClick={toggleProfileModal}>
              프로필 수정
            </Link>
          </li>
          <li className="text-[13px] font-neoBold border-b pb-2 cursor-pointer">
            <Link to="/participation-list" onClick={toggleProfileModal}>
              모임/동아리 참여 목록
            </Link>
          </li>
          <div
            className="text-[13px] font-neoBold text-red-500 cursor-pointer"
            onClick={handleLogout}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleLogout();
            }}
          >
            로그아웃
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ProfileModal;
