import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link to="/example">
        <Button>라우터 체크 페이지</Button>
      </Link>
      <Link to="/landing">
        <Button>Landing Page</Button>
      </Link>
    </>
  );
};

export default App;
