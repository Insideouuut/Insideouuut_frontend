import {
  ApiResponseClubPostDto,
  ClubCommentListResponseDto,
  ClubPostDto,
} from '@/api/Apis';
import axiosInstance from '@/api/axiosConfig';
import { useUserStore } from '@/store/userStore';
import { formatDate } from '@/utils/timeUtils';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostDetail: React.FC = () => {
  const { id, postId } = useParams<{ id: string; postId: string }>(); // TypeScript에서 id와 postId의 타입 명시
  const navigate = useNavigate();
  const [post, setPost] = useState<ClubPostDto | null>(null);
  const [comments, setComments] = useState<ClubCommentListResponseDto[]>([]);
  const [comment, setComment] = useState<string>('');

  const { profileImage, name } = useUserStore((state) => ({
    profileImage:
      state.imageUrl ||
      'https://w7.pngwing.com/pngs/665/132/png-transparent-user-defult-avatar.png',
    name: state.name,
  }));

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // 게시글 가져오기
        const postResponse = await axiosInstance.get<ApiResponseClubPostDto>(
          `/api/clubs/${id}/posts/${postId}`,
        );
        const postDetail = postResponse.data.results?.[0];
        console.log(postDetail);

        if (postDetail) {
          setPost(postDetail);
        }

        // 댓글 가져오기
        const commentsResponse = await axiosInstance.get(
          `/api/clubs/${id}/posts/${postId}/comments`,
        );
        if (commentsResponse.data.results) {
          setComments(commentsResponse.data.results.flat());
        }
      } catch (error) {
        console.error('Failed to fetch post details or comments:', error);
        setPost(null);
        setComments([]);
      }
    };

    fetchPostAndComments();
  }, [id, postId]);

  const handleDeletePost = async () => {
    try {
      const response = await axiosInstance.delete(
        `/api/clubs/${id}/posts/${postId}`,
      );

      if (response.status === 200) {
        navigate(`/club/${id}/board/${post?.category}`);
      } else {
        console.error(
          'Failed to delete post. Server responded with:',
          response,
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
      const response = await axiosInstance.post(
        `/api/clubs/${id}/posts/${postId}/comments`,
        data,
      );

      if (response.status === 200) {
        setComment('');
        const commentsResponse = await axiosInstance.get(
          `/api/clubs/${id}/posts/${postId}/comments`,
        );
        if (commentsResponse.data.results) {
          setComments(commentsResponse.data.results.flat());
        }
      }
    } catch (error) {
      console.error('Failed to save comment:', error);
    }
  };

  const handleDeleteComment = async (commentId?: number) => {
    if (!commentId) return;

    try {
      const response = await axiosInstance.delete(
        `/api/clubs/${id}/posts/${postId}/comments/${commentId}`,
      );

      if (response.status === 200) {
        const commentsResponse = await axiosInstance.get(
          `/api/clubs/${id}/posts/${postId}/comments`,
        );
        if (commentsResponse.data.results) {
          setComments(commentsResponse.data.results.flat());
        }
      } else {
        console.error(
          'Failed to delete comment. Server responded with:',
          response,
        );
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
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
        <div className="flex w-full flex-col mb-4">
          <h1 className="text-2xl font-bold mb-2">{post?.title}</h1>
          <div className="flex items-center">
            <img
              src={profileImage}
              alt={name}
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

        {post?.writer === name && (
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
              {comment.writer === name && (
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

      <div className="mt-6 flex space-x-2">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          className="w-full p-2 border rounded"
          placeholder="댓글을 입력하세요"
          rows={1}
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
