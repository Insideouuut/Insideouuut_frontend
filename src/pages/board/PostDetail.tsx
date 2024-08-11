import {
  Api,
  ApiResponseClubPostDto,
  ClubCommentListResponseDto,
  ClubPostDto,
} from '@/api/Apis';
import { useUserStore } from '@/store/userStore'; // 사용자 스토어에서 사용자 정보를 불러옵니다.
import { formatDate } from '@/utils/timeUtils';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const apiInstance = new Api();

const PostDetail: React.FC = () => {
  const { id, postId } = useParams<{ id: string; postId: string }>(); // 클럽 ID와 게시글 ID를 받아옵니다.
  const navigate = useNavigate();
  const [post, setPost] = useState<ClubPostDto | null>(null); // `ClubPostDto` 타입을 사용하여 상태를 관리합니다.
  const [comments, setComments] = useState<ClubCommentListResponseDto[]>([]); // 댓글 목록 상태 관리
  const [comment, setComment] = useState<string>(''); // 새로운 댓글을 입력받는 상태

  // 현재 로그인한 사용자 정보와 프로필 이미지를 스토어에서 가져옵니다.
  const { profileImage, nickname } = useUserStore((state) => ({
    profileImage:
      state.imageUrl ||
      'https://w7.pngwing.com/pngs/665/132/png-transparent-user-defult-avatar.png',
    nickname: state.nickname,
  }));

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // 게시글 가져오기
        const postResponse: ApiResponseClubPostDto =
          await apiInstance.api.findClubPost(
            Number(postId), // 여기서 postid를 첫 번째 인수로 전달
            id!, // 그리고 clubId를 두 번째 인수로 전달
          );
        console.log(postResponse);

        const postDetail = postResponse.results?.[0];

        if (postDetail) {
          setPost(postDetail);
        }

        // 댓글 가져오기
        const commentsResponse = await apiInstance.api.findByClubPostId(
          Number(postId),
          id!,
        );
        if (commentsResponse.results) {
          setComments(commentsResponse.results.flat());
        }
      } catch (error) {
        console.error('Failed to fetch post details or comments:', error);
        setPost(null);
        setComments([]);
      }
    };

    fetchPostAndComments();
  }, [id, postId]); // id와 postid를 의존성 배열에 추가합니다.

  const handleDeletePost = async () => {
    try {
      console.log(`Attempting to delete post with ID: ${postId}`);
      const response = await apiInstance.api.deleteClubPost(
        Number(id),
        Number(postId),
      );

      if (response.status?.code === 200) {
        console.log('Post deleted:', postId);
        navigate(`/club/${id}/board/${post?.category}`); // 삭제 후 게시판 목록 페이지로 이동
      } else {
        console.error(
          'Failed to delete post. Server responded with:',
          response.status,
        );
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const data = { content: comment };
      const response = await apiInstance.api.saveClubComment(
        Number(id),
        Number(postId),
        data,
      );

      if (response.status?.code === 200) {
        console.log('Comment saved:', response.results);
        setComment('');

        // 댓글 다시 불러오기
        const commentsResponse = await apiInstance.api.findByClubPostId(
          Number(postId),
          id!,
        );
        if (commentsResponse.results) {
          setComments(commentsResponse.results.flat());
        }
      }
    } catch (error) {
      console.error('Failed to save comment:', error);
    }
  };

  const handleDeleteComment = async (commentId?: number) => {
    if (!commentId) {
      console.error('Invalid comment ID');
      return;
    }

    console.log(`Attempting to delete comment with ID: ${commentId}`);

    try {
      const response = await apiInstance.api.deleteClubComment(
        Number(id),
        Number(postId),
        commentId,
      );

      if (response.status?.code === 200) {
        console.log('Comment deleted:', commentId);

        // 댓글 목록 갱신
        const commentsResponse = await apiInstance.api.findByClubPostId(
          Number(postId),
          id!,
        );
        if (commentsResponse.results) {
          setComments(commentsResponse.results.flat());
        }
      } else {
        console.error(
          'Failed to delete comment. Server responded with:',
          response.status,
        );
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>; // post가 null인 경우 로딩 메시지를 표시하거나 다른 처리
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
        <div className="flex w-full flex-col mb-4">
          <h1 className="text-2xl font-bold mb-2">{post?.title}</h1>
          <div className="flex items-center">
            <img
              src={profileImage}
              alt={nickname}
              className="w-8 h-8 rounded-full object-cover mr-4"
            />
            <div>
              <p className="text-sm font-bold">{post?.writer || 'Unknown'}</p>
              <p className="text-xs text-gray-500">
                {post?.createTime
                  ? formatDate(post.createTime)
                  : '날짜 정보 없음'}
              </p>
            </div>
          </div>
          <span className="my-2 block w-full h-[1px] bg-gray-200"></span>
        </div>

        {post?.writer === nickname && (
          <div className="flex space-x-2 whitespace-nowrap">
            <button
              onClick={() =>
                navigate(`/club/${id}/board/${post?.category}/${postId}/edit`)
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
        {post?.images?.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.name}
            className="h-auto mb-2"
          />
        ))}
      </div>
      <p className="text-sm mb-4">{post?.content}</p>

      {/* 댓글 목록 렌더링 */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">댓글</h2>
        {comments.map((comment, index) => (
          <div key={index} className="mb-4 ">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary">
                  {comment.writer}
                </p>
                <p className="text-sm">{comment.comment}</p>
                <p className="text-xs text-gray-400">
                  {comment.dateTime ? formatDate(comment.dateTime) : ''}
                </p>
              </div>
              {comment.writer === nickname && (
                <>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 text-sm"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
            <span className="block w-full h-[1px] bg-gray-200 mt-2"></span>
          </div>
        ))}
      </div>

      {/* 댓글 작성 영역 */}
      <div className="mt-6 flex space-x-2">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          className="w-full p-2 border rounded"
          placeholder="댓글을 입력하세요"
          rows={1} // 텍스트 영역의 높이를 기본 높이로 유지
        />
        <button
          onClick={handleCommentSubmit}
          className="p-2 bg-primary hover:bg-green-600 text-white rounded flex-shrink-0 h-full"
        >
          댓글 작성
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
