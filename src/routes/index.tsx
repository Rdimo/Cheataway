import type { RouteObject } from 'react-router-dom';
import Home from '@/pages/home';
import NotFound from '@/pages/404';
import Invite from '@/pages/invite';
import Projects from '@/pages/Projects';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'invite',
    element: <Invite />,
  },
  {
    path: 'projects',
    element: <Projects />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
