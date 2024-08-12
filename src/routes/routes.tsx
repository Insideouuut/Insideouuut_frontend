import IsFirstKakaoLogin from '@/pages/Auth/IsFirstKakaoLogin';
import Login from '@/pages/Auth/Login';
import Reissue from '@/pages/Auth/Reissue';
import Signup from '@/pages/Auth/Signup';
import UserInfo from '@/pages/Auth/UserInfo';
import ClubMemberList from '@/pages/ClubPage/ClubMemberList';
import MeetingMemberList from '@/pages/ClubPage/MeetingMemberList';
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

const boardRoutes = {
  path: 'board',
  children: [
    {
      path: ':type',
      element: <BoardList />,
    },
    {
      path: ':type/:postId',
      element: <PostDetail />,
    },
    {
      path: ':type/:postId/edit',
      element: <PostForm />,
    },
    {
      path: 'new',
      element: <PostForm />,
    },
  ],
};

const clubRoutes = {
  path: '/club/:id',
  element: <ClubPage />,
  children: [
    boardRoutes,
    {
      path: 'members',
      element: <ClubMemberList />,
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
      element: <Mymeeting />,
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
      path: 'chatRooms/:chatRoomId',
      element: <Chat />,
    },
  ],
};

const meetingRoutes = {
  path: '/meeting/:id',
  element: <ClubPage />, // ClubPage를 재활용하여 미팅 페이지를 사용
  children: [
    boardRoutes,
    {
      path: 'members',
      element: <MeetingMemberList />,
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
      element: <Mymeeting />,
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
      path: 'chatRooms/:chatRoomId',
      element: <Chat />,
    },
  ],
};

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
  clubRoutes, // 클럽 라우트 추가
  meetingRoutes, // 미팅 라우트 추가
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
