import { Badge } from '@/components/ui/badge';
import React from 'react';

interface BadgeListProps {
  tags: string[];
}

const BadgeList: React.FC<BadgeListProps> = ({ tags }) => {
  return (
    <div className="flex space-x-2">
      {tags.map((tag, index) => {
        let variant: 'dong' | 'mo' | 'exercise' | 'friend' | 'study' | 'last';

        switch (tag) {
          case '동아리':
            variant = 'dong';
            break;
          case '모임':
            variant = 'mo';
            break;
          case '운동':
            variant = 'exercise';
            break;
          case '사교/취미':
            variant = 'friend';
            break;
          case '공부':
            variant = 'study';
            break;
          case '마감임박':
            variant = 'last';
            break;
          default:
            variant = 'dong'; // 기본값 설정
            break;
        }

        return (
          <Badge key={index} variant={variant}>
            {tag}
          </Badge>
        );
      })}
    </div>
  );
};

export default BadgeList;
