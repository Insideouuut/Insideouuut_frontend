import BadgeList from '@/components/BadgeList';
import React from 'react';

interface ModongCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  members: {
    current: number;
    total: number;
  };
  tags: string[];
  imageUrl: string;
}
const ModongCard: React.FC<ModongCardProps> = ({
  title,
  description,
  date,
  location,
  members,
  tags,
  imageUrl,
}) => {
  return (
    <section>
      <div className="flex p-2 border border-gray-200  rounded-md">
        <div>
          <img src={imageUrl} alt={title} style={{ height: 100, width: 100 }} />
        </div>
        <div>
          <div>
            <BadgeList tags={tags} />
          </div>
          <h1 className="font-neoExtraBold">{title}</h1>
          <p>{description}</p>
          <p className="font-neoExtraBold text-gray-500 text-sm">{date}</p>
          <div>
            <span>{location}</span>
            <span>{`${members.current}/${members.total}`}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModongCard;
