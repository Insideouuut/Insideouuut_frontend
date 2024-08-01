import { signup } from '@/api/authApi';
import animationData from '@/assets/lottie/hi.json';
import Header from '@/components/Header';
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
import { SignupForm, SignupRequest } from '@/types/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import Lottie from 'lottie-react';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const defaultData: SignupForm = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  nickname: '',
  phoneNumber: '',
  birth: '',
  gender: 'MALE',
  interests: [],
  location: '',
};

const signupSchema = z
  .object({
    email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(/[a-z]/, '비밀번호는 최소 한 개의 소문자를 포함해야 합니다.')
      .regex(/[A-Z]/, '비밀번호는 최소 한 개의 대문자를 포함해야 합니다.')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        '비밀번호는 최소 한 개의 특수문자를 포함해야 합니다.',
      ),
    confirmPassword: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해주세요.' }),
    name: z.string().min(1, '이름을 입력하세요.'),
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultData,
  });

  const onSubmit = async (data: SignupForm) => {
    const signupData: SignupRequest = {
      email: data.email,
      password: data.password,
      name: data.name,
      nickName: data.nickname,
      phoneNumber: data.phoneNumber,
      birthDate: data.birth,
      gender: data.gender,
      category: data.interests,
      location: data.location,
    };

    try {
      const response = await signup(signupData);
      if (response.status.code === 200) {
        alert('회원가입에 성공했습니다.');
        navigate('/login');
      } else {
        alert(response.status.message);
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleNextStep = async () => {
    let isValid;
    if (step === 1) {
      isValid = await trigger(['email', 'password', 'confirmPassword']);
    } else if (step === 2) {
      isValid = await trigger(['name', 'nickname', 'phoneNumber', 'birth']);
    } else if (step === 3) {
      isValid = await trigger(['gender', 'interests', 'location']);
    }

    if (isValid) {
      setStep(step + 1);
    }
  };
  const handlePrevStep = () => {
    setStep(step - 1);
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

  return (
    <div className="max-h-screen">
      <Header
        toggleProfileModal={() => null}
        toggleNotificationModal={() => null}
        isLoggedIn={false}
        handleLoginLogout={() => null}
        profileRef={null}
        hasNotifications={false}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]"
      >
        <div className="flex items-center justify-center">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: '80%' }}
          />
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="mx-auto flex flex-col gap-6 w-3/4 h-full">
            {step === 1 && (
              <>
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-bold">회원가입</h1>

                  <div className="flex gap-2">
                    <span className="bg-primary w-8 h-2 rounded-lg"></span>
                    <span className="bg-gray-300 w-8 h-2 rounded-lg"></span>
                    <span className="bg-gray-300 w-8 h-2 rounded-lg"></span>
                  </div>
                </div>

                <div className="flex flex-col h-full gap-8">
                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="email">이메일</Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="email"
                          type="email"
                          placeholder="modong@example.com"
                          {...field}
                        />
                      )}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="password">비밀번호</Label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="password"
                          type="password"
                          placeholder="비밀번호"
                          {...field}
                        />
                      )}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-sm">
                        {errors.password.message}
                      </span>
                    )}
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="비밀번호 확인"
                          {...field}
                        />
                      )}
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>

                  <div className="grow"></div>

                  <Button
                    onClick={handleNextStep}
                    className="w-full hover:bg-green-600"
                  >
                    다음 단계로
                  </Button>

                  <div className="flex gap-1">
                    <span className="text-xs text-gray-500">
                      이미 계정이 있으신가요?{' '}
                    </span>
                    <Link to="/login" className="text-green-600 text-xs">
                      로그인하기
                    </Link>
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-bold">회원가입</h1>
                  <div className="flex gap-2">
                    <span className="bg-primary w-8 h-2 rounded-lg"></span>
                    <span className="bg-primary w-8 h-2 rounded-lg"></span>
                    <span className="bg-gray-300 w-8 h-2 rounded-lg"></span>
                  </div>
                </div>

                <div className="flex flex-col h-full gap-8">
                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="name">이름</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="name"
                          type="text"
                          placeholder="이름"
                          {...field}
                        />
                      )}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="nickname">닉네임</Label>
                    <Controller
                      name="nickname"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="nickname"
                          type="text"
                          placeholder="닉네임"
                          {...field}
                        />
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
                                date > new Date() ||
                                date < new Date('1900-01-01')
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

                  <div className="grow"></div>

                  <div>
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="w-full mb-2"
                    >
                      이전 단계로
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="w-full hover:bg-green-600"
                    >
                      다음 단계로
                    </Button>
                  </div>

                  <div className="flex gap-1">
                    <span className="text-xs text-gray-500">
                      이미 계정이 있으신가요?{' '}
                    </span>
                    <Link to="/login" className="text-green-600 text-xs">
                      로그인하기
                    </Link>
                  </div>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-bold">회원가입</h1>
                  <div className="flex gap-2">
                    <span className="bg-primary w-8 h-2 rounded-lg"></span>
                    <span className="bg-primary w-8 h-2 rounded-lg"></span>
                    <span className="bg-primary w-8 h-2 rounded-lg"></span>
                  </div>
                </div>

                <div className="flex flex-col h-full gap-8">
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
                          <ToggleGroupItem value="사교/취미">
                            사교/취미
                          </ToggleGroupItem>
                          <ToggleGroupItem value="운동">운동</ToggleGroupItem>
                          <ToggleGroupItem value="스터디">
                            스터디
                          </ToggleGroupItem>
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

                  <div>
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="w-full mb-2"
                    >
                      이전 단계로
                    </Button>
                    <Button type="submit" className="w-full hover:bg-green-600">
                      회원가입하기
                    </Button>
                  </div>

                  <div className="flex gap-1">
                    <span className="text-xs text-gray-500">
                      이미 계정이 있으신가요?{' '}
                    </span>
                    <Link to="/login" className="text-green-600 text-xs">
                      로그인하기
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
