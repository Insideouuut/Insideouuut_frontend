import { checkNickname, enterUserInfo } from '@/api/authApi';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/userStore';
import { UserInfoFormInput, UserInfoRequest } from '@/types/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const defaultData: UserInfoFormInput = {
  nickname: '',
  phoneNumber: '',
  birth: '',
  gender: 'MALE',
  interests: [],
  location: '',
};

const userInfoSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(8, '닉네임은 최대 8자입니다.'),
  phoneNumber: z
    .string()
    .min(10, '전화번호를 입력해주세요.')
    .max(13, '전화번호를 확인해주세요.'),
  birth: z.string().min(1, '생년월일을 입력해주세요.'),
  gender: z.enum(['MALE', 'FEMALE']),
  interests: z
    .array(z.string())
    .min(1, '관심사를 최소 하나 이상 선택해주세요.'),
  location: z.string().min(1, '내 지역을 입력해주세요.'),
});

const UserInfoForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserInfoFormInput>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: defaultData,
  });
  const setUser = useUserStore((state) => state.setUser);
  const [checkedNickname, setCheckedNickname] = useState(false);

  const onSubmit = async (data: UserInfoFormInput) => {
    if (!checkedNickname) {
      alert('닉네임 중복 확인을 해주세요.');
      return;
    }
    const userInfoData: UserInfoRequest = {
      nickName: data.nickname,
      phoneNumber: data.phoneNumber,
      birthDate: data.birth,
      gender: data.gender,
      category: data.interests,
      location: data.location,
    };
    const token = localStorage.getItem('accessToken');

    try {
      const response = await enterUserInfo(userInfoData, token);
      if (response.status.code === 200) {
        alert('사용자 정보 입력에 성공했습니다.');
        setUser(userInfoData);
        navigate('/main');
      } else {
        alert(response.status.message);
      }
    } catch (error) {
      console.error('사용자 정보 입력 중 오류 발생:', error);
      alert('사용자 정보 입력 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const formatPhoneNumber = (value: string) => {
    value = value.replace(/[^0-9]/g, '');

    if (value.length < 4) {
      return value;
    } else if (value.length < 7) {
      return `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length < 11) {
      return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    } else {
      return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
  };

  const clickCheckNickname = async (nickname: string) => {
    try {
      const response = await checkNickname(nickname);
      const statusCode = response.data.status.code;
      console.log('nickname response:', response);

      if (statusCode === 200) {
        alert('사용가능한 닉네임입니다.');
        setCheckedNickname(true);
      } else if (statusCode === 400 || statusCode === 409) {
        alert(response.data.status.message);
        setCheckedNickname(false);
      }
    } catch (error) {
      alert('닉네임 중복 확인 중 에러가 발생했습니다. 다시 시도해주세요.');
      console.error('Nickname checked Error:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-12 min-h-full w-full max-w-[700px] p-8"
    >
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto flex flex-col gap-6 w-3/4 h-full">
          <div className="flex flex-col h-full gap-12">
            <div className="grid gap-2 justify-items-start">
              <Label htmlFor="nickname">닉네임</Label>
              <Controller
                name="nickname"
                control={control}
                render={({ field }) => (
                  <div className="flex w-full gap-2">
                    <Input
                      id="nickname"
                      type="text"
                      placeholder="닉네임"
                      {...field}
                    />
                    <Button
                      type="button"
                      onClick={() => clickCheckNickname(field.value)}
                    >
                      중복확인
                    </Button>
                  </div>
                )}
              />
              {errors.nickname && (
                <span className="text-red-500 text-sm">
                  {errors.nickname.message}
                </span>
              )}
            </div>

            <div className="grid gap-2 justify-items-start">
              <Label htmlFor="phoneNumber">전화번호</Label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phoneNumber"
                    type="text"
                    placeholder="010-0000-0000"
                    {...field}
                    onChange={(e) =>
                      field.onChange(formatPhoneNumber(e.target.value))
                    }
                  />
                )}
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <div className="grid gap-2 justify-items-start">
              <Label htmlFor="birth">생년월일</Label>
              <Controller
                name="birth"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), 'yyyy-MM-dd')
                        ) : (
                          <span>날짜 선택</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          const formattedDate = date
                            ? format(date, 'yyyy-MM-dd')
                            : '';
                          field.onChange(formattedDate);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.birth && (
                <span className="text-red-500 text-sm">
                  {errors.birth.message}
                </span>
              )}
            </div>

            <div className="grid gap-2 justify-items-start">
              <Label>성별</Label>
              <div className="flex gap-4">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      className="flex items-center gap-4"
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="MALE" id="male" />
                        <Label htmlFor="male">남성</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="FEMALE" id="female" />
                        <Label htmlFor="female">여성</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
              {errors.gender && (
                <span className="text-red-500 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>

            <div className="grid gap-2 justify-items-start">
              <Label htmlFor="interests">관심사</Label>
              <Controller
                name="interests"
                control={control}
                render={({ field }) => (
                  <ToggleGroup
                    type="multiple"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <ToggleGroupItem value="SOCIAL">사교/취미</ToggleGroupItem>
                    <ToggleGroupItem value="SPORTS">운동</ToggleGroupItem>
                    <ToggleGroupItem value="STUDY">스터디</ToggleGroupItem>
                  </ToggleGroup>
                )}
              />
              {errors.interests && (
                <span className="text-red-500 text-sm">
                  {errors.interests.message}
                </span>
              )}
            </div>

            <div className="grid gap-2 justify-items-start">
              <Label htmlFor="location">내 지역</Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    id="location"
                    type="text"
                    placeholder="내 지역"
                    {...field}
                  />
                )}
              />
              {errors.location && (
                <span className="text-red-500 text-sm">
                  {errors.location.message}
                </span>
              )}
            </div>

            <div className="grow"></div>

            <Button type="submit" className="w-full hover:bg-green-600">
              사용자 정보 입력하기
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserInfoForm;
