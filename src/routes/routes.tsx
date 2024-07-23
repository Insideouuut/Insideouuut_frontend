import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';

import Main from '@/pages/Main/Main';

import CreateClub from '@/pages/Create/CreateClub';
import CreateMeeting from '@/pages/Create/CreateMeeting';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ClubPage from '../pages/ClubPage/ClubPage';
import GroupJoin from '../pages/GroupJoinPage/GroupJoinPage';
import Landing from '../pages/LandingPage/LandingPage';
import SearchPage from '../pages/SearchPage/SearchPage';
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
    path: '/groupjoin',
    element: <GroupJoin />,
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
    path: '/main',
    element: <Main />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/club',
    element: <ClubPage />,
  },
  {
    path: '/create-club',
    element: <CreateClub />,
  },
  {
    path: '/create-meeting',
    element: <CreateMeeting />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
