import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Example from '../pages/Example';
import Landing from '../pages/LandingPage/LandingPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/example',
    element: <Example />,
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
