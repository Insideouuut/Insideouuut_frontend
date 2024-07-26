import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { boardMapping } from '@/utils/boardMapping';
import { SquarePen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockPosts } from './mockPosts';

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  createdAt: string;
  category: string;
  profileImageUrl: string;
  images: { name: string; url: string }[];
}

const BoardList: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4;

  useEffect(() => {
    if (type === 'allBoard') {
      setPosts(mockPosts);
    } else if (type) {
      setPosts(mockPosts.filter((post) => post.category === type));
    }
  }, [type]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <div className="flex items-center">
        <div className="rounded-full w-9 h-9 bg-gray-200 hover:bg-gray-400 mr-4 items-center justify-center flex">
          <SquarePen />
        </div>
        <p className="text-sm"> 게시글을 작성해보세요</p>
      </div>
      <section className="mt-8">
        <div className="w-full mb-8">
          <h1 className="text-sm font-neoBold">
            {type ? boardMapping[type] : '게시판'}
          </h1>
          <span className="my-2 block w-full h-[1px] bg-gray-300"></span>
        </div>
        <ul>
          {currentPosts.map((post) => (
            <li key={post.id} className="mb-4 flex flex-col">
              <Link to={`/club/board/${post.category}/${post.id}`}>
                <div className="flex items-center">
                  <img
                    src={post.profileImageUrl}
                    alt={post.author}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <p className="mr-4 text-sm">{post.author}</p>
                  <p className="text-xs text-gray-500">| {post.createdAt}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <h3 className="font-neoBold">{post.title}</h3>
                    <p className="text-xs pr-3">{post.description}</p>
                  </div>
                  <img
                    src={post.images[0].url}
                    alt={post.images[0].name}
                    className="w-24 h-24 object-cover"
                  />
                </div>

                <div className="bg-gray-200 w-[70px] justify-center items-center flex rounded-md">
                  <p className="text-xs text-gray-700">
                    {boardMapping[post.category]}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => paginate(currentPage - 1)}
              className={
                currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
              }
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? 'text-blue-500' : ''}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => paginate(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? 'opacity-50 pointer-events-none'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default BoardList;
