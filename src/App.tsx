import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import './App.css';
function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link to="/example">
        <Button>라우터 체크 페이지</Button>
      </Link>
    </>
  );
}

export default App;
