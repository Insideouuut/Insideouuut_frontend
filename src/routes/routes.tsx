// src/routes/Routes.tsx

import IsFirstKakaoLogin from '@/pages/Auth/IsFirstKakaoLogin';
import Login from '@/pages/Auth/Login';
import Reissue from '@/pages/Auth/Reissue';
import Signup from '@/pages/Auth/Signup';
import UserInfo from '@/pages/Auth/UserInfo';
import MemberList from '@/pages/ClubPage/MemberList';
import Main from '@/pages/Main/Main';
import BoardList from '@/pages/board/BoardList';
import PostDetail from '@/pages/board/PostDetail';
import PostForm from '@/pages/board/PostForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ClubManagement from '../pages/ClubPage/ClubManagement';
import ClubPage from '../pages/ClubPage/ClubPage';
import CreateMeetinginClub from '../pages/ClubPage/CreateMeetinginClub';
import MeetingList from '../pages/ClubPage/MeetingList';
import MemberApproval from '../pages/ClubPage/MemberApproval';
import MemberManagement from '../pages/ClubPage/MemberManagement';
import Mymeeting from '../pages/ClubPage/MyMeeting';
import CreateClub from '../pages/CreateModong/CreateClub';
import CreateMeeting from '../pages/CreateModong/CreateMeeting';
import GroupJoin from '../pages/GroupJoinPage/GroupJoinPage';
import Landing from '../pages/LandingPage/LandingPage';
import MyPage from '../pages/MyPage/MyPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import SetLocation from '../pages/SetLocation/SetLocation';
import Chat from '../pages/chat/Chat';
import ChatRoom from '../pages/chat/ChatRoom';

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
    path: '/groupjoin/:clubId',
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
    path: '/userinfo',
    element: <UserInfo />,
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
    path: '/club/:id',
    element: <ClubPage />, // Club-specific paths
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
        path: 'board/:type/:id/edit',
        element: <PostForm />,
      },
      {
        path: 'board/new',
        element: <PostForm />,
      },
      {
        path: 'members',
        element: <MemberList />,
      },
      {
        path: 'meetingList',
        element: <MeetingList />,
      },
      {
        path: 'createMeeting',
        element: <CreateMeetinginClub />,
      },
      {
        path: 'meetingListSettings',
        element: <Mymeeting />, // Handle meetingListSettings specifically for clubs
      },
      {
        path: 'manageClub',
        element: <ClubManagement />,
      },
      {
        path: 'memberRequests',
        element: <MemberApproval />,
      },
      {
        path: 'manageMembers',
        element: <MemberManagement />,
      },
      {
        path: 'chatRooms/:clubId/:roomId',
        element: <Chat />,
      },
    ],
  },
  {
    path: '/meeting/:id',
    element: <ClubPage />, // Meeting-specific paths, reusing the ClubPage component
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
        path: 'board/:type/:id/edit',
        element: <PostForm />,
      },
      {
        path: 'board/new',
        element: <PostForm />,
      },
      {
        path: 'members',
        element: <MemberList />,
      },
      {
        path: 'meetingList',
        element: <MeetingList />,
      },
      {
        path: 'createMeeting',
        element: <CreateMeetinginClub />,
      },
      {
        path: 'meetingListSettings',
        element: <Mymeeting />, // Handle meetingListSettings specifically for meetings
      },
      {
        path: 'manageClub',
        element: <ClubManagement />,
      },
      {
        path: 'memberRequests',
        element: <MemberApproval />,
      },
      {
        path: 'manageMembers',
        element: <MemberManagement />,
      },
      {
        path: 'chatRooms/:meetingId/:roomId',
        element: <Chat />,
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
  {
    path: '/chatroom',
    element: <ChatRoom />,
  },
  {
    path: '/reissue',
    element: <Reissue />,
  },
  {
    path: '/isFirstLoginWithKakao',
    element: <IsFirstKakaoLogin />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
