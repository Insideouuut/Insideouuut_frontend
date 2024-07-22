import { Edit2, Heart, Map, User, UserRoundSearch } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import CategoryButton from './CategoryButton';

const CategoryContainer: React.FC = () => {
  return (
    <section className="grid grid-cols-3 gap-4 p-5 bg-white">
      <CategoryButton Icon={User} label="사교/취미" />
      <CategoryButton Icon={Heart} label="모임" />
      <CategoryButton Icon={Edit2} label="공부" />
      <CategoryButton Icon={UserRoundSearch} label="모임 만들기" />
      <CategoryButton Icon={UserRoundSearch} label="동아리 만들기" />
      <Link to="/setlocation">
        <CategoryButton Icon={Map} label="동네 설정" />
      </Link>
    </section>
  );
};

export default CategoryContainer;
