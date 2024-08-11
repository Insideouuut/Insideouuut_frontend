import { useUserStore } from '@/store/userStore';
import { Edit2, Heart, Map, User, UserRoundSearch } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButton from './CategoryButton';

const CategoryContainer: React.FC = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <section className="grid grid-cols-3 gap-4 p-5 bg-white">
      <CategoryButton Icon={User} label="사교/취미" />
      <CategoryButton Icon={Heart} label="모임" />
      <CategoryButton Icon={Edit2} label="공부" />

      <button
        onClick={() => handleNavigation('/create-meeting')}
        className="flex items-center justify-center"
        aria-label="모임 만들기"
      >
        <CategoryButton Icon={UserRoundSearch} label="모임 만들기" />
      </button>
      <button
        onClick={() => handleNavigation('/create-club')}
        className="flex items-center justify-center"
        aria-label="동아리 만들기"
      >
        <CategoryButton Icon={UserRoundSearch} label="동아리 만들기" />
      </button>
      <button
        onClick={() => handleNavigation('/setlocation')}
        className="flex items-center justify-center"
        aria-label="동네 설정"
      >
        <CategoryButton Icon={Map} label="동네 설정" />
      </button>
    </section>
  );
};

export default CategoryContainer;
