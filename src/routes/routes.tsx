import { default as Login, default as Signup } from '@/pages/Auth/Login';
import BoardList from '@/pages/board/BoardList';
import PostDetail from '@/pages/board/PostDetail';
import MemberList from '@/pages/ClubPage/MemberList';
import CreateClub from '@/pages/Create/CreateClub';
import CreateMeeting from '@/pages/Create/CreateMeeting';
import Main from '@/pages/Main/Main';
import MyPage from '@/pages/MyPage/MyPage';
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
    children: [
      {
        path: 'board/:type',
        element: <BoardList />,
      },
      {
        path: 'board/:type/:id',
        element: <PostDetail />,
      },
      {
        path: 'members',
        element: <MemberList />,
      },
      {
        path: 'meetingList',
        element: (
          <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
            모임 목록 컴포넌트
          </div>
        ),
      },
      {
        path: 'createMeeting',
        element: (
          <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
            모임 생성 컴포넌트
          </div>
        ),
      },
      {
        path: 'meetingListSettings',
        element: (
          <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
            모임 목록 설정 컴포넌트
          </div>
        ),
      },
      {
        path: 'manageClub',
        element: (
          <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
            동아리 관리 컴포넌트
          </div>
        ),
      },
      {
        path: 'memberRequests',
        element: (
          <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
            멤버 신청 목록 컴포넌트
          </div>
        ),
      },
      {
        path: 'manageMembers',
        element: (
          <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
            멤버 관리 컴포넌트
          </div>
        ),
      },
      {
        path: 'chat',
        element: (
          <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
            채팅 컴포넌트
          </div>
        ),
      },
    ],
  },
  {
    path: '/create-club',
    element: <CreateClub />,
  },
  {
    path: '/create-meeting',
    element: <CreateMeeting />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
