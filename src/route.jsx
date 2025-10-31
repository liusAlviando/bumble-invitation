import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Basic from './layouts/Basic';
import HomeLayout from './layouts/HomeLayout';
import Loader from './components/Loader';

const Welcome = lazy(() => import('./pages/Welcome'));
const Home = lazy(() => import('./pages/Home'));
const Location = lazy(() => import('./pages/Location'));

const Profile = lazy(() => import('./pages/Profile'));
const Liked = lazy(() => import('./pages/Liked'));
const Chats = lazy(() => import('./pages/Chats'));
const Present = lazy(() => import('./pages/Present'));



const RouterIndex = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Basic />,
      children: [
        {
          path: '/',
          element: <Welcome />,
        },
      ],
    },
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/location',
          element: <Location />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/liked',
          element: <Liked />,
        },
        {
          path: '/chats',
          element: <Chats />,
        },
        {
          path: '/present',
          element: <Present />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Loader />}>
      {routes}
    </Suspense>
  );
};

export default RouterIndex;
