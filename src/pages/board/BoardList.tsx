import { Api, ClubPostListResponseDto } from '@/api/Apis';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useUserStore } from '@/store/userStore';
import { boardMapping } from '@/utils/boardMapping';
import { formatClubTime } from '@/utils/timeUtils';
import { SquarePen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const apiInstance = new Api();

const BoardList: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { id } = useParams<{ id: string }>();

  const { profileImage } = useUserStore((state) => ({
    profileImage:
      state.imageUrl ||
      'https://w7.pngwing.com/pngs/665/132/png-transparent-user-defult-avatar.png',
  }));

  const [boards, setBoards] = useState<ClubPostListResponseDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        if (id) {
          const response = await apiInstance.api.findByPostType(Number(id));
          console.log(response);

          const results = response.results?.flat() || [];

          const filteredAndSortedResults =
            type === 'allBoard'
              ? results
              : results.filter((post) => post.category === type);

          filteredAndSortedResults.sort(
            (a, b) =>
              new Date(b.createTime!).getTime() -
              new Date(a.createTime!).getTime(),
          );

          setBoards(filteredAndSortedResults);
        }
      } catch (error) {
        console.error('Failed to fetch boards:', error);
        setBoards([]);
      }
    };

    fetchBoards();
  }, [id, type]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = boards.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(boards.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleNewPostClick = () => {
    navigate(`/club/${id}/board/new`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleNewPostClick();
    }
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleNewPostClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          <div className="rounded-full w-9 h-9 bg-gray-200 hover:bg-gray-400 mr-4 items-center justify-center flex">
            <SquarePen />
          </div>
          <p className="text-sm"> 게시글을 작성해보세요</p>
        </div>
        <Button className="hover:bg-green-600" onClick={handleNewPostClick}>
          새 글 작성
        </Button>
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
            <li key={post.postId} className="mb-4 flex flex-col w-full ">
              <Link to={`/club/${id}/board/${post.category}/${post.postId}`}>
                <div className="flex items-center w-full">
                  <img
                    src={profileImage}
                    alt={post.writer || 'Author'}
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                  <p className="mr-4 text-sm">{post.writer || 'Unknown'}</p>
                  <p className="text-xs text-gray-700">
                    {formatClubTime(post.createTime!)}
                  </p>
                </div>
                <div className="flex justify-between mt-4 w-full ">
                  <div className="w-full">
                    <div className="flex w-full">
                      <div className="flex flex-col w-full">
                        <h3 className="font-neoBold">
                          {post.title || 'No Title'}
                        </h3>
                        <p className="text-xs pr-3">
                          {post.content || 'No Content'}
                        </p>
                      </div>
                      {post.images && post.images.length > 0 && (
                        <img
                          src={post.images[0].url} // 첫 번째 이미지의 URL을 사용
                          alt={post.writer || 'Author'}
                          className="w-28 h-28  object-cover"
                        />
                      )}
                    </div>

                    <p className="text-xs text-gray-500">
                      {post.category
                        ? boardMapping[post.category]
                        : '카테고리 없음'}
                    </p>
                  </div>
                </div>
                <span className="my-2 block w-full h-[1px] bg-gray-200"></span>
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
