import { MoveRight } from 'lucide-react';
import React from 'react';
interface CategoryButtonProps {
  Icon: React.ElementType; // Icon 컴포넌트를 받을 수 있도록 수정
  label: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ Icon, label }) => {
  return (
    <button className="w-48 h-36 flex flex-col justify-center p-4 border border-gray-300 rounded hover:bg-primary hover:text-white transition-colors">
      <Icon className="mb-9 w-7 h-7" /> {/* 아이콘 컴포넌트 직접 렌더링 */}
      <div className="flex w-full justify-between">
        <span>{label}</span>
        <MoveRight className="w-4" />
      </div>
    </button>
  );
};

export default CategoryButton;
