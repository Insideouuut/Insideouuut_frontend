import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface NotificationModalProps {
  toggleNotificationModal: () => void;
  setHasNotifications: (hasNotifications: boolean) => void;
}

interface Notification {
  id: number;
  message: string;
  time: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ toggleNotificationModal, setHasNotifications }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: '새로운 모임이 생성되었습니다.', time: '2시간 전' },
    { id: 2, message: '동아리 가입 신청이 승인되었습니다.', time: '1일 전' },
    { id: 3, message: '모임 일정이 업데이트되었습니다.', time: '3일 전' },
    { id: 4, message: '모임 참가자가 새로운 메시지를 보냈습니다.', time: '4시간 전' },
    { id: 5, message: '새로운 동아리가 생성되었습니다.', time: '2일 전' },
    { id: 6, message: '모임 일정이 변경되었습니다.', time: '5일 전' },
    { id: 7, message: '동아리 모임이 곧 시작됩니다.', time: '3일 전' },
    { id: 8, message: '새로운 멤버가 가입했습니다.', time: '1시간 전' },
    { id: 9, message: '모임 위치가 업데이트되었습니다.', time: '6일 전' },
    { id: 10, message: '모임 시간이 변경되었습니다.', time: '7일 전' },
  ]);

  useEffect(() => {
    setHasNotifications(notifications.length > 0);
  }, [notifications, setHasNotifications]);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggleNotificationModal();
    }
  };

  const handleMouseLeave = () => {
    toggleNotificationModal();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    modalRef.current?.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      modalRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleRemoveNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleRemoveWithAnimation = (id: number) => {
    const notificationElement = document.getElementById(`notification-${id}`);
    if (notificationElement) {
      notificationElement.classList.add('removing');
      setTimeout(() => handleRemoveNotification(id), 400); // match the duration of the CSS transition
    }
  };

  return (
    <div className="absolute top-16 right-2" ref={modalRef}>
      <div className="bg-white rounded-lg shadow-lg p-5 w-[280px]">
        <h2 className="text-sm font-neoBold mb-5">알림 목록</h2>
        <ul className="space-y-4 max-h-40 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li
                key={notification.id}
                id={`notification-${notification.id}`}
                className="flex border-b pb-2 justify-between notification-item"
              >
                <div className="w-56 flex  justify-between items-center">
                  <p className="text-left w-[180px] text-[11.5px]">{notification.message}</p>
                  <p className="text-[10px] text-gray-500">{notification.time}</p>
                </div>
                <Button
                  className="bg-white text-green-600 w-2 p-0 hover:bg-white"
                  onClick={() => handleRemoveWithAnimation(notification.id)}
                >
                  x
                </Button>
              </li>
            ))
          ) : (
            <li className="text-sm text-center text-gray-500">알림이 없습니다.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;