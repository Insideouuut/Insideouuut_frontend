import { MoveUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Bubble from './Bubble';
import { mockMessages } from './chatMockData'; // 임시 채팅 내역 데이터

const Chat = () => {
  const { clubId, roomId } = useParams<{ clubId: string; roomId: string }>();
  const location = useLocation();
  const { nickname, imageUrl } = location.state as {
    nickname: string;
    imageUrl: string;
  };

  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // 여기서 실제 API 호출을 통해 채팅 내역을 불러올 수 있습니다.
    // 예시: fetch(`/api/chatRooms/${clubId}/${roomId}/messages`)
    //   .then(response => response.json())
    //   .then(data => setMessages(data));
  }, [clubId, roomId]);

  // 엔터만 쳐도 메세지가 전송되게
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      sender: nickname,
      content: newMessage,
      sendTime: new Date().toISOString(),
    };

    // 메시지를 상태에 추가
    setMessages([...messages, message]);
    setNewMessage('');

    // 여기서 실제 API 호출을 통해 메시지를 서버에 전송할 수 있습니다.
    // 예시: fetch(`/api/chatRooms/${clubId}/${roomId}/messages`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(message),
    // });
  };

  return (
    <div className="flex flex-col p-6 w-[820px] border-2 border-gray-200 bg-white rounded-lg">
      <h1 className="text-xl font-bold mb-4">채팅방</h1>
      <span className="mb-6 block w-full h-[1px] bg-gray-200"></span>
      <div className="flex flex-col flex-grow overflow-auto mb-4">
        {messages.map((msg, index) => (
          <Bubble
            key={index}
            isCurrentUser={msg.sender === nickname}
            message={msg.content}
            sender={msg.sender}
            sendTime={new Date(msg.sendTime).toLocaleTimeString()}
            senderImage={msg.sender === nickname ? imageUrl : undefined}
          />
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow py-2 px-4 text-sm bg-gray-100 border border-gray-200 rounded-3xl"
          placeholder="메시지를 입력하세요"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-primary text-white rounded-full hover:bg-green-600"
        >
          <MoveUp />
        </button>
      </div>
    </div>
  );
};

export default Chat;
