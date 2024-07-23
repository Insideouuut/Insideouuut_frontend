import React, { useState } from 'react';
import { PaintbrushVertical, CalendarDays, MapPin, Users, ClipboardList, MessageCircleMore } from 'lucide-react';
import profileImg from '@/assets/icons/profile.webp';

interface ClubData {
  type: '동아리' | '모임';
  category: '운동' | '사교/취미' | '공부';
  title: string;
  description: string;
  schedule: string;
  location: string;
  members: string;
  role: '관리자' | '일반 회원';
  backgroundColor: string;
  backgroundImage: string;
}

interface ProfileData {
  profileImage: string;
  nickname: string;
}

interface ClubHeroProps {
  clubData: ClubData;
  onColorChange: (newColor: string) => void;
}

const ClubHero: React.FC<ClubHeroProps> = ({ clubData, onColorChange }) => {
  const profileData: ProfileData = {
    profileImage: profileImg,
    nickname: '모동이',
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const pastelColors = [
    'bg-red-100',
    'bg-yellow-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-indigo-100',
    'bg-gray-100',
  ];

  const getColorByType = (type: string) => {
    switch (type) {
      case '동아리':
        return 'bg-green-200 text-green-800';
      case '모임':
        return 'bg-gray-200 text-gray-800';
      default:
        return '';
    }
  };

  const getColorByCategory = (category: string) => {
    switch (category) {
      case '사교/취미':
        return 'bg-yellow-200 text-yellow-800';
      case '운동':
        return 'bg-blue-200 text-blue-800';
      case '공부':
        return 'bg-purple-200 text-purple-800';
      default:
        return '';
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleColorSelect = (color: string) => {
    onColorChange(color);
    closeModal();
  };

  return (
    <section
      className={`relative w-full h-72 py-8 px-4 flex justify-center text-left ${clubData.backgroundColor}`}
    >
      <div className="flex items-center mx-auto w-[920px] justify-between">
        <div className="flex flex-col h-[80%]">
          <div>
            <button onClick={openModal} className="mb-5 p-1 bg-black bg-opacity-10 rounded hover:bg-opacity-25">
              <PaintbrushVertical className="w-4 h-4" />
            </button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded">
                <h2 className="text-l mb-4">배경색 선택하기</h2>
                <div className="grid grid-cols-4 gap-4">
                  {pastelColors.map((color) => (
                    <div
                      key={color}
                      className={`w-10 h-10 ${color} rounded cursor-pointer`}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </div>
                <button onClick={closeModal} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`flex items-center justify-center h-5 px-3 py-[1.5px] rounded-lg font-neoBold text-[11px] ${getColorByType(
                clubData.type,
              )}`}
            >
              {clubData.type}
            </span>
            <span
              className={`flex items-center justify-center h-5 px-3 py-[1.5px] rounded-lg font-neoBold text-[11px] ${getColorByCategory(
                clubData.category,
              )}`}
            >
              {clubData.category}
            </span>
          </div>
          <h1 className="text-[30px] font-neoExtraBold text-black mb-3">
            {clubData.title}
          </h1>
          <p className="text-[17px] text-black font-neoBold mt-2">
            {clubData.description}
          </p>
        </div>
        <div className='relative flex flex-col items-end w-[30%] h-full mt-24'>
            <div className='flex w-28 flex-col gap-y-[2px]'>
              <p className="flex bg-black bg-opacity-10 justify-between px-2 py-[2px] text-sm font-neoBold rounded-md items-center"><CalendarDays className='w-[17px]' /><p className='w-[80%] text-center text-[11px]'>{clubData.schedule}</p></p>
              <p className="flex bg-black bg-opacity-10 justify-between px-2 py-[2px] text-sm font-neoBold rounded-md items-center"><MapPin className='w-[17px]'/><p className='w-[80%] text-center'>{clubData.location}</p></p>
              <p className="flex bg-black bg-opacity-10 justify-between px-2 py-[2px] text-sm font-neoBold rounded-md items-center"><Users className='w-[17px]'/><p className='w-[80%] text-center'>{clubData.members}</p></p>
            </div>
          <div className="flex w-[195px] h-[90px] rounded-lg bg-black bg-opacity-10 items-center mt-4">
            <img
              src={profileData.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full ml-4"
            />
            <div className='w-full'>
                <div className="flex justify-center w-full">
                    <p className="text-black font-neo flex items-end">{profileData.nickname}</p>
                    <p className="text-gray-600 text-sm font-neo flex items-end">{clubData.role}</p>
                </div>
                <div className='flex justify-center mt-2'>
                    <button className=" w-6 h-6 p-[2px] text-white font-neo flex items-center justify-center bg-gray-500  rounded-md hover:bg-opacity-70">
                        <ClipboardList/>
                    </button>
                    <button className="w-6 h-6 p-[2px] text-white font-neo flex items-center justify-center bg-gray-500 rounded-md ml-[10px] hover:bg-opacity-70">
                        <MessageCircleMore/>
                    </button>
                    <button className="w-6 h-6 p-[2px] text-white font-neo flex items-center justify-center bg-gray-500 rounded-md ml-[10px] hover:bg-opacity-70">
                        <Users/>
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubHero;
