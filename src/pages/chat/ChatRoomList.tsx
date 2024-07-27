import { Link } from 'react-router-dom';
import { mockChatRooms } from './chatMockData';

const ChatRoomList = () => {
  return (
    <div className="flex p-6 bg-gray-50 rounded-lg w-[820px] border-2 border-gray-200">
      <ul>
        {mockChatRooms.map((room) => (
          <li key={room.id}>
            <Link to={`/rooms/${room.id}`}>{room.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
