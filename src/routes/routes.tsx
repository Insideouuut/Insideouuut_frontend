import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import BoardList from '@/pages/board/BoardList';
import PostDetail from '@/pages/board/PostDetail';
import PostForm from '@/pages/board/PostForm';
import Chat from '@/pages/chat/Chat';
import ChatRoom from '@/pages/chat/ChatRoom';
import MemberList from '@/pages/ClubPage/MemberList';
import CreateClub from '@/pages/Create/CreateClub';
import CreateMeeting from '@/pages/Create/CreateMeeting';
import Main from '@/pages/Main/Main';
import MyPage from '@/pages/MyPage/MyPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ClubManagement from '../pages/ClubPage/ClubManagement';
import ClubPage from '../pages/ClubPage/ClubPage';
import MeetingList from '../pages/ClubPage/MeetingList';
import MemberApproval from '../pages/ClubPage/MemberApproval';
import MemberManagement from '../pages/ClubPage/MemberManagement';
import GroupJoin from '../pages/GroupJoinPage/GroupJoinPage';
import Landing from '../pages/LandingPage/LandingPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import SetLocation from '../pages/SetLocation/SetLocation';
import CreateMeetinginClub from '../pages/ClubPage/CreateMeetinginClub';
import Mymeeting from '../pages/ClubPage/MyMeeting';

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
        element: (
          <CreateMeetinginClub/>
        ),
      },
      {
        path: 'meetingListSettings',
        element: (
          <Mymeeting/>
        ),
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
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
