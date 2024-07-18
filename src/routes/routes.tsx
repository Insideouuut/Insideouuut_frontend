import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import GroupJoin from '../pages/GroupJoinPage/GroupJoinPage';
import Landing from '../pages/LandingPage/LandingPage';
import SetLocation from '../pages/SetLocation/SetLocation';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/landing',
    element: <Landing />,
  },
  {
    path: '/setlocation',
    element: <SetLocation />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/groupjoin',
    element: <GroupJoin />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
