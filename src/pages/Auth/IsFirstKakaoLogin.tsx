import { isFirstLoginWithKakao } from '@/api/authApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IsFirstKakaoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isFirstLogin = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await isFirstLoginWithKakao(token);
        const statusCode = response.status;
        const statusMessage = response.statusText;

        if (statusCode === 200) {
          if (response.data.status.code === 404) {
            navigate('/userinfo');
          } else {
            navigate('/main');
          }
        } else {
          alert(statusMessage);
        }
      } catch (error) {
        console.error('isFirstLoginWithKakao:', error);
        alert('Failed to check first login with Kakao: ' + error);
      }
    };
    isFirstLogin();
  }, [navigate]);

  return <div>Checking first login with Kakao...</div>;
};

export default IsFirstKakaoLogin;
