import { Api } from '@/api/Apis';
import { useUserStore } from '@/store/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const apiInstance = new Api();

const profileSchema = z
  .object({
    nickname: z
      .string()
      .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
      .max(8, '닉네임은 최대 8자입니다.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    confirmPassword: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해주세요.' }),
    phoneNumber: z
      .string()
      .min(10, '전화번호를 입력해주세요.')
      .max(13, '전화번호를 확인해주세요.'),
    location: z.string().min(1, '내 지역을 입력해주세요.'),
    interests: z
      .array(z.string())
      .min(1, '관심사를 최소 하나 이상 선택해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;

const UpdateUser: React.FC = () => {
  const navigate = useNavigate();
  const {
    email,
    nickname,
    password,
    confirmPassword,
    phoneNumber,
    location,
    interests,
    setUser,
  } = useUserStore();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname,
      password,
      confirmPassword,
      phoneNumber,
      location,

      interests,
    },
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [checkedNickname, setCheckedNickname] = useState(false);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const updateRequest = {
        nickname: data.nickname,
        password: data.password,
      };

      const response = await apiInstance.api.updateUserProfile(updateRequest);
      console.log('API response:', response);

      setUser({
        nickname: data.nickname,
        password: data.password,
      });
      setIsUpdated(true);
    } catch (error) {
      console.error('프로필 업데이트에 실패했습니다', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleInterestChange = (value: string) => {
    const newInterests = interests.includes(value)
      ? interests.filter((interest) => interest !== value)
      : [...interests, value];
    setValue('interests', newInterests);
    setUser({ interests: newInterests });
  };

  const checkNicknameAvailability = async () => {
    if (checkedNickname) console.log('nickname checking');
    try {
      const { nickname } = getValues();
      const response = await apiInstance.api.checkNickname({ nickname });
      if (response.data && response.data.status) {
        const statusCode = response.data.status.code;
        console.log('nickname response:', response);
        if (statusCode === 200) {
          alert('사용가능한 닉네임입니다.');
          setCheckedNickname(true);
        } else if (statusCode === 400 || statusCode === 409) {
          alert(response.data.status.message || '알 수 없는 오류');
          setCheckedNickname(false);
        }
      } else {
        alert('서버 응답에 오류가 있습니다.');
      }
    } catch (error) {
      alert('닉네임 중복 확인 중 에러가 발생했습니다. 다시 시도해주세요.');
      console.error('Nickname checked Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {isUpdated && (
        <div className="mb-4 text-green-500">프로필이 업데이트되었습니다.</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              이메일
            </label>
            <input
              id="email"
              type="text"
              value={email}
              className="mt-1 block w-full bg-gray-100 border border-gray-200 p-2 "
              readOnly
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              <label htmlFor="nickname" className="block text-sm font-medium">
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                {...register('nickname')}
                className="mt-1 block w-full border border-gray-200 p-2 "
              />
              {errors.nickname && (
                <span className="text-red-500">{errors.nickname.message}</span>
              )}
            </div>
            <button
              type="button"
              onClick={checkNicknameAvailability}
              className="mt-7 h-10 bg-primary text-white px-3 py-1 rounded"
            >
              중복 확인
            </button>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="mt-1 block w-full border border-gray-200 p-2 "
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className="mt-1 block w-full border border-gray-200 p-2 "
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              <label htmlFor="location" className="block text-sm font-medium">
                내 지역
              </label>
              <input
                id="location"
                type="text"
                {...register('location')}
                className="mt-1 block w-full border border-gray-200 p-2 "
              />
              {errors.location && (
                <span className="text-red-500">{errors.location.message}</span>
              )}
            </div>
            <button
              type="button"
              className="mt-7 h-10 bg-primary text-white px-3 py-1 rounded"
              onClick={() => navigate('/setlocation')}
            >
              인증하러 가기
            </button>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              전화번호
            </label>
            <input
              id="phoneNumber"
              type="text"
              {...register('phoneNumber')}
              className="mt-1  block border border-gray-200 p-2 rounded-md w-full"
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="interests" className="block text-sm font-medium">
              관심사
            </label>
            <div id="interests" className="flex gap-2 ">
              {['사교/취미', '운동', '스터디'].map((interest) => (
                <button
                  type="button"
                  key={interest}
                  className={`p-2 rounded ${
                    interests.includes(interest)
                      ? 'bg-primary text-white'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => handleInterestChange(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
            {errors.interests && (
              <span className="text-red-500">{errors.interests.message}</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded"
        >
          내 정보 수정하기
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
