import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 API 호출 코드를 추가하여 글을 작성합니다.
    console.log({ category, title, description });
    navigate(`/club/board/${category}`);
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200 bg-white">
      <h1 className="text-2xl font-bold mb-4">새 글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="게시판" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="freeBoard">자유 게시판</SelectItem>
              <SelectItem value="noticeBoard">공지 게시판</SelectItem>
              <SelectItem value="reviewBoard">후기 게시판</SelectItem>
              <SelectItem value="questionBoard">질문 게시판</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="title"
            value={title}
            placeholder="글 제목"
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 placeholder:text-sm placeholder-gray-300 block border border-gray-200 p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="본문 내용 작성"
            className="mt-1 h-[400px] placeholder:text-sm placeholder-gray-300 block border border-gray-200 p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="hover:bg-green-600">
            작성 완료
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
