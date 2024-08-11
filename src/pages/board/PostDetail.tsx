import { Api, ApiResponseClubPostDto, ClubPostDto } from '@/api/Apis';
import { useUserStore } from '@/store/userStore'; // 사용자 스토어에서 사용자 정보를 불러옵니다.
import { formatDate } from '@/utils/timeUtils';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const apiInstance = new Api();

const PostDetail: React.FC = () => {
  const { id, postid } = useParams<{ id: string; postid: string }>(); // 클럽 ID와 게시글 ID를 받아옵니다.
  const navigate = useNavigate();
  const [post, setPost] = useState<ClubPostDto | null>(null); // `ClubPostDto` 타입을 사용하여 상태를 관리합니다.

  // 현재 로그인한 사용자 정보와 프로필 이미지를 스토어에서 가져옵니다.
  const { profileImage, nickname } = useUserStore((state) => ({
    profileImage:
      state.imageUrl ||
      'https://w7.pngwing.com/pngs/665/132/png-transparent-user-defult-avatar.png',
    nickname: state.nickname,
  }));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response: ApiResponseClubPostDto =
          await apiInstance.api.findClubPost(Number(postid), id!);
        console.log(response);

        const postDetail = response.results?.[0];
        if (postDetail) {
          setPost(postDetail); // postDetail을 상태로 설정합니다.
        }
      } catch (error) {
        console.error('Failed to fetch post details:', error);
        setPost(null);
      }
    };

    fetchPost();
  }, [id, postid]); // id와 postid를 의존성 배열에 추가합니다.

  const handleDeletePost = () => {
    // 글 삭제 API 호출
    console.log(`Deleting post with id ${postid}`);
    // 삭제 후 이전 페이지로 이동
    navigate(-1);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200 bg-white">
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-4 text-xs text-primary hover:underline"
      >
        뒤로가기
      </button>

      <div className="flex justify-between mb-4">
        <div className="flex w-full flex-col mb-4 ">
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <div className="flex items-center">
            <img
              src={profileImage}
              alt={nickname}
              className="w-8 h-8 rounded-full object-cover mr-4"
            />
            <div>
              <p className="text-sm font-bold">{post.writer || 'Unknown'}</p>
              <p className="text-xs text-gray-500">
                {post.createTime
                  ? formatDate(post.createTime)
                  : '날짜 정보 없음'}
              </p>
            </div>
          </div>
          <span className="my-2 block w-full h-[1px] bg-gray-200"></span>
        </div>

        {post.writer === nickname && (
          <div className="flex space-x-2">
            <button
              onClick={() =>
                navigate(`/club/board/${post.category}/${postid}/edit`)
              }
              className="text-primary font-neoBold text-sm"
            >
              수정
            </button>
            <button
              onClick={handleDeletePost}
              className="text-red-500 font-neoBold text-sm"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        {post.images?.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.name}
            className="h-auto mb-2"
          />
        ))}
      </div>
      <p className="text-sm mb-4">{post.content}</p>
    </div>
  );
};

export default PostDetail;
