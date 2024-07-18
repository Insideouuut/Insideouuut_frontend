import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Landing from '../pages/LandingPage/LandingPage';
import SetLocation from '../pages/SetLocation/SetLocation';
import GroupJoin from '../pages/GroupJoinPage/GroupJoinPage';
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
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
