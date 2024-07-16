import SetLocation from '@/pages/SetLocation/SetLocation';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/setlocation',
    element: <SetLocation />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
