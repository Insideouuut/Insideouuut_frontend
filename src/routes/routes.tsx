import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Example from '../pages/Example';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/example',
    element: <Example />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
