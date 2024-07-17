import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  birth: string;
  gender: string;
  interests: string[];
  location: string;
  mbti: string;
}

const defaultData: SignupData = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  nickname: '',
  phoneNumber: '',
  birth: '',
  gender: 'male',
  interests: [],
  location: '',
  mbti: '',
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
    gender: z.enum(['male', 'female']),
    interests: z
      .array(z.string())
      .min(1, '관심사를 최소 하나 이상 선택해주세요.'),
    location: z.string().min(1, '내 지역을 입력해주세요.'),
    mbti: z.string().min(1, 'MBTI를 선택해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupData>(defaultData);
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultData,
  });

  const onSubmit = (data: SignupData) => {
    console.log('회원가입 데이터:', data);
    console.log('폼데이터:', formData);
    // 서버로 데이터 전송 및 성공 처리 등을 수행
    alert('회원가입이 완료되었습니다.');
    navigate('/landing');
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleInterestChange = (value: string) => {
    setFormData((prevData) => {
      const newInterests = prevData.interests.includes(value)
        ? prevData.interests.filter((interest) => interest !== value)
        : [...prevData.interests, value];
      setValue('interests', newInterests);
      return { ...prevData, interests: newInterests };
    });
  };

  return (
    <div className="max-h-full">
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
        className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]"
      >
        <div className="hidden bg-muted lg:block">
          <img
            src="https://placehold.co/400"
            alt="Placeholder"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="mx-auto flex flex-col gap-6 w-3/4 h-2/3">
            {step === 1 && (
              <>
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-bold">회원가입</h1>

                  <div className="flex gap-2">
                    <span className="bg-green-500 w-8 h-2 rounded-lg"></span>
                    <span className="bg-gray-300 w-8 h-2 rounded-lg"></span>
                    <span className="bg-gray-300 w-8 h-2 rounded-lg"></span>
                  </div>
                </div>

                <div className="flex flex-col h-full gap-8">
                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="modong@example.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="비밀번호"
                      {...register('password')}
                    />
                    {errors.password && (
                      <span className="text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="비밀번호 확인"
                      {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>

                  <div className="grow"></div>

                  <Button onClick={handleNextStep} className="w-full">
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
                    <span className="bg-green-500 w-8 h-2 rounded-lg"></span>
                    <span className="bg-green-500 w-8 h-2 rounded-lg"></span>
                    <span className="bg-gray-300 w-8 h-2 rounded-lg"></span>
                  </div>
                </div>

                <div className="flex flex-col h-full gap-8">
                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="이름"
                      {...register('name')}
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="nickname">닉네임</Label>
                    <Input
                      id="nickname"
                      type="text"
                      placeholder="닉네임"
                      {...register('nickname')}
                    />
                    {errors.nickname && (
                      <span className="text-red-500">
                        {errors.nickname.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="phoneNumber">전화번호</Label>
                    <Input
                      id="phoneNumber"
                      type="text"
                      placeholder="010-0000-0000"
                      {...register('phoneNumber')}
                    />
                    {errors.phoneNumber && (
                      <span className="text-red-500">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="birth">생년월일</Label>
                    <Input
                      id="birth"
                      type="date"
                      placeholder="생년월일"
                      {...register('birth')}
                    />
                    {errors.birth && (
                      <span className="text-red-500">
                        {errors.birth.message}
                      </span>
                    )}
                  </div>

                  <div className="grow"></div>

                  <div>
                    <Button onClick={handleNextStep} className="w-full">
                      다음 단계로
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="w-full mt-2"
                    >
                      이전 단계로
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
                    <span className="bg-green-500 w-8 h-2 rounded-lg"></span>
                    <span className="bg-green-500 w-8 h-2 rounded-lg"></span>
                    <span className="bg-green-500 w-8 h-2 rounded-lg"></span>
                  </div>
                </div>

                <div className="flex flex-col h-full gap-8">
                  <div className="grid gap-2 justify-items-start">
                    <p>성별</p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <Input
                          id="male"
                          type="radio"
                          value="male"
                          {...register('gender')}
                          className="w-4 accent-green-500"
                          onChange={() => setValue('gender', 'male')}
                        />
                        <Label htmlFor="male" className="w-fit">
                          남성
                        </Label>
                      </div>
                      <div className="flex items-center gap-1">
                        <Input
                          id="female"
                          type="radio"
                          value="female"
                          {...register('gender')}
                          className="w-4 accent-green-500"
                          onChange={() => setValue('gender', 'female')}
                        />
                        <Label htmlFor="female">여성</Label>
                      </div>
                    </div>
                    {errors.gender && (
                      <span className="text-red-500">
                        {errors.gender.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="interests">관심사</Label>
                    <ToggleGroup type="multiple">
                      <ToggleGroupItem
                        value="사교/취미"
                        onClick={() => handleInterestChange('사교/취미')}
                      >
                        사교/취미
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="운동"
                        onClick={() => handleInterestChange('운동')}
                      >
                        운동
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="스터디"
                        onClick={() => handleInterestChange('스터디')}
                      >
                        스터디
                      </ToggleGroupItem>
                    </ToggleGroup>
                    {errors.interests && (
                      <span className="text-red-500">
                        {errors.interests.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="location">내 지역</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="내 지역"
                      {...register('location')}
                    />
                    {errors.location && (
                      <span className="text-red-500">
                        {errors.location.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-2 justify-items-start">
                    <Label htmlFor="mbti">MBTI/외향형 or 내향형</Label>
                    <Select onValueChange={(value) => setValue('mbti', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="MBTI/외향형 or 내향형" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>EN</SelectLabel>
                          <SelectItem value="ENFJ">ENFJ</SelectItem>
                          <SelectItem value="ENFP">ENFP</SelectItem>
                          <SelectItem value="ENTJ">ENTJ</SelectItem>
                          <SelectItem value="ENTP">ENTP</SelectItem>
                          <SelectLabel>ES</SelectLabel>
                          <SelectItem value="ESFJ">ESFJ</SelectItem>
                          <SelectItem value="ESFP">ESFP</SelectItem>
                          <SelectItem value="ESTJ">ESTJ</SelectItem>
                          <SelectItem value="ESTP">ESTP</SelectItem>
                          <SelectLabel>IN</SelectLabel>
                          <SelectItem value="INFJ">INFJ</SelectItem>
                          <SelectItem value="INFP">INFP</SelectItem>
                          <SelectItem value="INTJ">INTJ</SelectItem>
                          <SelectItem value="INTP">INTP</SelectItem>
                          <SelectLabel>IS</SelectLabel>
                          <SelectItem value="ISFJ">ISFJ</SelectItem>
                          <SelectItem value="ISFP">ISFP</SelectItem>
                          <SelectItem value="ISTJ">ISTJ</SelectItem>
                          <SelectItem value="ISTP">ISTP</SelectItem>
                          <SelectLabel>외향/내향</SelectLabel>
                          <SelectItem value="외향형">외향형</SelectItem>
                          <SelectItem value="내향형">내향형</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.mbti && (
                      <span className="text-red-500">
                        {errors.mbti.message}
                      </span>
                    )}
                  </div>

                  <div className="grow"></div>

                  <div>
                    <Button type="submit" className="w-full">
                      회원가입하기
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="w-full mt-2"
                    >
                      이전 단계로
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
