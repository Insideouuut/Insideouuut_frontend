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
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  // const { id } = useParams<{ id: string }>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      alert('게시판을 선택해주세요.');
      return;
    }

    // 여기에 API 호출 코드를 추가하여 글을 작성합니다.
    console.log({ category, title, description, images });
    navigate(`/club/board/${category}`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200 bg-white">
      <h1 className="text-2xl font-bold mb-4">새 글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Select onValueChange={setCategory} value={category} required>
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
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`preview-${index}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
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
