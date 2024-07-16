import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import SetLocation from '@/pages/SetLocation/SetLocation';
import Example from '../pages/Example';
import Landing from '../pages/LandingPage/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/setlocation',
    element: <SetLocation />,
  },
  {
    path: '/landing',
    element: <Landing />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
