import { reissueToken } from '@/api/authApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Reissue = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const reissue = async () => {
      try {
        const response = await reissueToken();

        const statusCode = response.data.status.code;
        const statusMessage = response.data.status.message;
        const token = response.headers['authorization'];

        if (statusCode === 200) {
          localStorage.setItem('accessToken', token);
          navigate('/isFirstLoginWithKakao');
        } else {
          navigate('/login');
          alert(statusMessage);
        }
      } catch (error) {
        navigate('/login');
        console.error('reissueToken:', error);
        alert('Failed to reissue token: ' + error);
      }
    };

    reissue();
  }, [navigate]);
  return <div>Reissuing token...</div>;
};

export default Reissue;
