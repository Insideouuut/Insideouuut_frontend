import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockPosts } from './mockPosts';

interface Comment {
  author: string;
  content: string;
}

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  createdAt: string;
  category: string;
  profileImageUrl: string;
  images: { name: string; url: string }[];
  comments: Comment[];
}

const currentUser = 'CurrentUser'; // 현재 로그인한 사용자

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const foundPost = mockPosts.find((post) => post.id === parseInt(id!));
    setPost(foundPost || null);
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedPost = {
        ...post!,
        comments: [
          ...post!.comments,
          { author: currentUser, content: newComment },
        ],
      };
      setPost(updatedPost);
      setNewComment('');
    }
  };

  const handleDeleteComment = (index: number) => {
    const updatedComments = post!.comments.filter((_, i) => i !== index);
    setPost({ ...post!, comments: updatedComments });
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
      <div className="flex items-center mb-4">
        <img
          src={post.profileImageUrl}
          alt={post.author}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <p className="font-bold">{post.author}</p>
          <p className="text-sm text-gray-500">{post.createdAt}</p>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div className="mb-4">
        {post.images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.name}
            className="h-auto mb-2"
          />
        ))}
      </div>
      <p className="text-sm mb-4">{post.description}</p>
      <div className="border-t border-gray-200 pt-4">
        <h2 className="text-md font-bold mb-2">댓글</h2>
        <ul>
          {post.comments.map((comment, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">{comment.author}</p>
                <p className="text-sm">{comment.content}</p>
              </div>
              {comment.author === currentUser && (
                <button
                  onClick={() => handleDeleteComment(index)}
                  className="text-red-500 text-sm"
                >
                  삭제
                </button>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="댓글을 입력하세요"
          />
          <button
            onClick={handleAddComment}
            className="mt-2 p-2 bg-primary hover:bg-green-600 text-white rounded"
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
