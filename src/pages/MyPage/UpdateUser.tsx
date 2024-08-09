import { Api, ApiResponseMyProfileResponse } from '@/api/Apis';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useUserStore } from '@/store/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
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
  const [locations, setLocations] = useState<string[]>([]);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);

  const onSubmit = async (data: ProfileFormValues) => {
    console.log('Submitted Data:', data); // 데이터 확인
    try {
      await apiInstance.api.updateUserProfile({
        nickname: data.nickname,
        password: data.password,
        interests: data.interests,
      });
      setUser(data);
      setIsUpdated(true);
    } catch (error) {
      console.error('프로필 업데이트 중 오류가 발생했습니다.', error);
    }
  };
  useEffect(() => {
    // 로컬 스토리지에서 동네 목록 가져오기
    const storedNeighborhoods = localStorage.getItem('neighborhoods');
    if (storedNeighborhoods) {
      setLocations(JSON.parse(storedNeighborhoods));
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response: ApiResponseMyProfileResponse =
          await apiInstance.api.getMyProfile();

        console.log(response); // 가져온 데이터를 콘솔에 출력

        // response.results가 존재하고 배열이 아닐 경우 대비
        const userProfile =
          response.results && Array.isArray(response.results)
            ? response.results[0]
            : {};

        // 프로필 데이터를 useUserStore에 저장
        setUser({
          nickname: userProfile.nickname || '',
          phoneNumber: userProfile.phoneNumber || '',
          location: userProfile.locations?.[0] || '', // locations를 사용하여 location 설정
          interests:
            userProfile.interests?.map((interest) => interest.toString()) || [], // interests를 문자열 배열로 변환
          email: userProfile.email || '', // 이메일
          imageUrl: userProfile.profileImage || '', // 프로필 이미지 URL
        });

        // Set default values in the form
        setValue('nickname', userProfile.nickname || '');
        setValue('phoneNumber', userProfile.phoneNumber || '');
        setValue('location', userProfile.locations?.[0] || '');
        setValue(
          'interests',
          userProfile.interests?.map((interest) => interest.toString()) || [],
        );
      } catch (error) {
        console.error('Failed to fetch profile:', error); // 에러 처리
      }
    };

    fetchProfile(); // 함수 호출
  }, [setUser, setValue]);

  const checkNicknameAvailability = async () => {
    try {
      const response = await apiInstance.api.checkNickname({ nickname });
      const statusCode = response.status?.code;

      if (statusCode === 200) {
        alert('사용가능한 닉네임입니다.');
        setIsNicknameAvailable(true);
      } else if (statusCode === 400 || statusCode === 409) {
        alert(response.status?.message);
        setIsNicknameAvailable(false);
      }
    } catch (error) {
      alert('닉네임 중복 확인 중 에러가 발생했습니다. 다시 시도해주세요.');
      console.error('Nickname checked Error:', error);
    }
  };

  const handleInterestChange = (value: string) => {
    const newInterests = interests.includes(value)
      ? interests.filter((interest) => interest !== value)
      : [...interests, value];
    setValue('interests', newInterests);
    setUser({ interests: newInterests });
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
              className="mt-7 h-10 bg-primary text-white px-3 py-1 rounded"
              onClick={checkNicknameAvailability}
            >
              중복 확인
            </button>
            {isNicknameAvailable !== null && (
              <span
                className={`text-sm mt-7 ${isNicknameAvailable ? 'text-green-500' : 'text-red-500'}`}
              >
                {isNicknameAvailable
                  ? '사용 가능한 닉네임입니다.'
                  : '이미 사용 중인 닉네임입니다.'}
              </span>
            )}
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
            {location ? (
              <div className="items-center justify-center flex flex-col">
                <div className="mt-7 text-primary text-xs">인증 완료</div>
                <Popover>
                  <PopoverTrigger className="text-sm hover:text-primary">
                    동네 범위 보기
                  </PopoverTrigger>
                  <PopoverContent>
                    <ul className="pl-5">
                      {locations.map((neighborhood, index) => (
                        <li key={index}>{neighborhood}</li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <button
                type="button"
                className="mt-7 h-10 bg-primary text-white px-3 py-1 rounded"
                onClick={() => navigate('/setlocation')}
              >
                인증하러 가기
              </button>
            )}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              전화번호
            </label>
            <input
              id="phoneNumber"
              type="text"
              {...register('phoneNumber')}
              className="mt-1 block border border-gray-200 p-2 rounded-md w-full"
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
              {['SOCIAL', 'SPORTS', 'STUDY'].map((interest) => (
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
