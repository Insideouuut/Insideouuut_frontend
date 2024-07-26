import { boardMapping } from '@/utils/boardMapping';
import { SquarePen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockPosts } from './mockPosts';
interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  createdAt: string;
  category: string;
}

interface BoardListProps {
  type: string;
}

const BoardList: React.FC<BoardListProps> = ({ type }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (type === 'allBoard') {
      setPosts(mockPosts);
    } else {
      setPosts(mockPosts.filter((post) => post.category === type));
    }
  }, [type]);

  return (
    <div className="flex flex-col p-6  rounded-lg w-[820px] border-2 border-gray-200">
      <div className="flex items-center">
        <div className="rounded-full w-9 h-9 bg-gray-200 hover:bg-gray-400 mr-4 items-center justify-center flex">
          <SquarePen />
        </div>
        <p className="text-sm"> 게시글을 작성해보세요</p>
      </div>
      <section>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4">
              <Link to={`/club/board/${post.category}/${post.id}`}>
                <h3 className="font-bold">{post.title}</h3>
                <p>{post.description}</p>
                <p>{post.author}</p>
                <p className="text-sm text-gray-500">{post.createdAt}</p>
                <p className="text-sm text-gray-500">
                  {boardMapping[post.category]}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BoardList;
