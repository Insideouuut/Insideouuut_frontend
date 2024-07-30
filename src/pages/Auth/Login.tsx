import { login } from '@/api/authApi';
import animationData from '@/assets/lottie/hi.json';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { mockUserData } from '@/pages/MyPage/mockUserData'; // import mock user data
import { useUserStore } from '@/store/userStore'; // import zustand store
import { LoginRequest } from '@/types/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/[a-z]/, '비밀번호는 최소 한 개의 소문자를 포함해야 합니다.')
    .regex(/[A-Z]/, '비밀번호는 최소 한 개의 대문자를 포함해야 합니다.')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      '비밀번호는 최소 한 개의 특수문자를 포함해야 합니다.',
    ),
});

const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const { data: responseData, headers } = await login(data);
      const token = headers['access-token'];

      if (responseData.status.code === 200) {
        alert('로그인에 성공했습니다.');
        // Access 토큰을 로컬 스토리지에 저장
        if (typeof token === 'string') {
          localStorage.setItem('accessToken', token);
        }
        // 로그인 성공 시 mockUserData를 zustand 스토어에 저장
        setUser(mockUserData);
        navigate('/main');
      } else {
        console.error(responseData.status.message);
        alert(responseData.status.message);
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto flex flex-col gap-6 w-3/4 h-2/3">
            <div className="grid gap-2 text-center">
              <h1 className="text-xl font-bold">로그인</h1>
            </div>

            <Link to="/auth/kakao">
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                카카오로 로그인하기
              </Button>
            </Link>

            <div className="flex items-center">
              <Separator className="flex-1" />
              <span className="text-gray-300 text-xs w-8">또는</span>
              <Separator className="flex-1" />
            </div>

            <div className="flex flex-col h-full gap-6">
              <div className="grid gap-2 justify-items-start">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="modong@example.com"
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
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
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex justify-between">
                <Link
                  to="/forgot-email-password"
                  className="text-green-600 text-sm"
                >
                  이메일/비밀번호 찾기
                </Link>
                <Link to="/signup" className="text-green-600 text-sm">
                  회원가입
                </Link>
              </div>

              <div className="grow"></div>

              <Button type="submit" className="w-full hover:bg-green-600">
                이메일로 로그인하기
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: '80%' }}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
