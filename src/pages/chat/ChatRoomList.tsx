import { dummyData } from '@/components/dummyData';
import { Link, useParams } from 'react-router-dom';
import { mockChatRooms, mockMessages } from './chatMockData';

const ChatRoomList = () => {
  const { clubId } = useParams<{ clubId: string }>(); // URL에서 clubId 값을 가져옴

  // dummyData에서 clubId에 해당하는 클럽을 찾음. 실제 구현은 api로 값을 불러와서 진행
  const club = dummyData.find((club) => club.id === Number(clubId));

  // 최신 메시지를 찾는 함수
  const getLatestMessage = (roomId: string) => {
    const messages = mockMessages.filter((msg) => msg.roomId === roomId);
    if (messages.length === 0) return null;
    return messages.reduce((latest, msg) =>
      new Date(msg.sendTime) > new Date(latest.sendTime) ? msg : latest,
    );
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <h1 className="mb-2 text-xl font-bold">{club?.name} 채팅방</h1>{' '}
      <span className="mb-6 block w-full h-[1px] bg-gray-200"></span>
      <div>
        <ul>
          {mockChatRooms.map((room) => {
            const latestMessage = getLatestMessage(room.id);
            return (
              <li
                key={room.id}
                className="mb-4 flex items-center p-3 space-x-4 rounded-lg border-2 border-gray-100"
              >
                {latestMessage?.senderImage ? (
                  <Link
                    to={`/rooms/${room.id}`}
                    className="text-primary hover:cursor text-md font-semibold"
                  >
                    <img
                      src={latestMessage.senderImage}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </Link>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl">
                    {latestMessage?.sender[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <Link
                    to={`/rooms/${room.id}`}
                    className="text-primary hover:cursor text-md font-semibold"
                  >
                    {room.name}

                    <p className="text-xs text-gray-600">
                      {latestMessage
                        ? `${latestMessage.content}`
                        : 'No messages yet.'}
                    </p>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatRoomList;
