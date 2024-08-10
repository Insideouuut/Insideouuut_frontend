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
import { boardMapping } from '@/utils/boardMapping';
import { SquarePen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const apiInstance = new Api();

const BoardList: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { id } = useParams<{ id: string }>(); // URL에서 id를 추출

  const [boards, setBoards] = useState<ClubPostListResponseDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        if (id) {
          const response = await apiInstance.api.findByPostType(Number(id));
          console.log(response); // 응답 구조 확인

          // results가 2차원 배열인 경우 1차원 배열로 변환
          const results = response.results?.flat() || [];

          setBoards(results);
        }
      } catch (error) {
        console.error('Failed to fetch boards:', error);
        setBoards([]); // 오류 발생 시 빈 배열로 설정
      }
    };

    fetchBoards(); // 함수 호출
  }, [id]); // id가 변경될 때마다 useEffect 호출

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
          {currentPosts.map((post, index) => (
            <li key={index} className="mb-4 flex flex-col">
              <Link to={`/club/board/${post.category}/${index}`}>
                <div className="flex items-center">
                  {/* 데이터가 없을 경우를 대비한 기본 이미지 URL 사용 */}
                  <img
                    src="default-profile-image-url" // 기본 프로필 이미지 URL
                    alt={post.writer || 'Author'}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <p className="mr-4 text-sm">{post.writer || 'Unknown'}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <h3 className="font-neoBold">
                      {post.postTitle || 'No Title'}
                    </h3>
                    <p className="text-xs pr-3">
                      {post.content || 'No Content'}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-200 w-[70px] justify-center items-center flex rounded-md">
                  <p className="text-xs text-gray-700">
                    {post.category && boardMapping[post.category]
                      ? boardMapping[post.category]
                      : 'Unknown Category'}
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
