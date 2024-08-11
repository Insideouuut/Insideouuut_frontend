import axiosInstance from '@/api/axiosConfig';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const { id, postId } = useParams<{ id: string; postId: string }>(); // 클럽 ID와 게시글 ID를 가져옴
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState('');
  const isEditMode = !!postId; // postId가 존재하면 수정 모드임

  useEffect(() => {
    if (isEditMode) {
      const fetchPostData = async () => {
        try {
          const response = await axiosInstance.get(
            `/api/clubs/${id}/posts/${postId}`,
          );
          const post = response.data.results[0];

          setTitle(post.title);
          setDescription(post.content);
          setCategory(post.category);

          // 기존 이미지 처리
          const existingImagePreviews = post.images.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (image: any) => image.url,
          );
          setImagePreviews(existingImagePreviews);
        } catch (error) {
          console.error('Failed to load post data:', error);
        }
      };
      fetchPostData();
    }
  }, [id, postId, isEditMode]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!category) {
      alert('게시판을 선택해주세요.');
      return;
    }

    if (images.length === 0 && !isEditMode) {
      setImageError('이미지를 추가해주세요.');
      return;
    }

    const token = localStorage.getItem('accessToken');

    const clubPostRequestDto = {
      postTitle: title,
      category: category,
      postContent: description,
    };

    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(clubPostRequestDto)], {
        type: 'application/json',
      }),
    );

    images.forEach((image) => {
      formData.append('imageFiles', image);
    });

    try {
      if (isEditMode) {
        // 수정 모드일 때는 PATCH 요청
        const response = await axiosInstance.patch(
          `/api/clubs/${id}/posts/${postId}`,
          formData,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('Post updated:', response.data);
      } else {
        // 새 글 작성 모드일 때는 POST 요청
        const response = await axiosInstance.post(
          `/api/clubs/${id}/posts`,
          formData,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('Post created:', response.data);
      }

      navigate(`/club/${id}/board/${category}`);
    } catch (error) {
      console.error('Failed to submit post:', error);
      alert('게시글 처리에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...filePreviews]);
    setImages([...images, ...files]);
  };

  const handleRemoveImage = (index: number): void => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200 bg-white">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? '게시글 수정' : '새 글 작성'}
      </h1>
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
          {imageError && (
            <p className="text-red-500 text-sm mt-1">{imageError}</p>
          )}
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
            {isEditMode ? '수정 완료' : '작성 완료'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
