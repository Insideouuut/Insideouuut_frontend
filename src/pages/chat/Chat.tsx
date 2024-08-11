import { Api, ChatResponseDTO } from '@/api/Apis';
import axiosInstance from '@/api/axiosConfig';
import { useUserStore } from '@/store/userStore';
import { Client } from '@stomp/stompjs';
import { MoveUp } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Bubble from './Bubble';
const apiInstance = new Api();

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const { nickname, imageUrl } = useUserStore();
  const [messages, setMessages] = useState<ChatResponseDTO[]>([]);
  const [readMessages, setReadMessages] = useState<ChatResponseDTO[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<ChatResponseDTO[]>([]);
  const unreadRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState('');
  const token = localStorage.getItem('accessToken') || '';
  const clientRef = useRef<Client | null>(null);

  const headersRef = useRef({
    Authorization: token,
  });

  const connectWebSocket = useCallback(() => {
    const socket = new SockJS(`${axiosInstance.defaults.baseURL}/ws-stomp`);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log('[STOMP] ' + str),
      // reconnectDelay: 5000,
      // heartbeatIncoming: 4000,
      // heartbeatOutgoing: 4000,
      connectHeaders: headersRef.current,
      onConnect: () => {
        console.log('[STOMP] Connected');

        client.subscribe(`/sub/chatRoom/${id}`, (messageOutput) => {
          const message = JSON.parse(messageOutput.body);
          console.log('Received message from server:', message);
          setMessages((prevMessages) => [...prevMessages, message]);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current?.active) {
        clientRef.current.deactivate();
        console.log('Disconnected from WebSocket');
      }
    };
  }, [id]);

  useEffect(() => {
    connectWebSocket();

    console.log('Headers:', headersRef.current);
    console.log(`클라이언트 상태: ${clientRef.current?.active}`);
  }, [connectWebSocket]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatResponseDTO = {
      id: Number(id),
      sender: { nickname },
      content: newMessage,
      sendTime: new Date().toISOString(),
    };

    // 연결 상태 확인
    if (clientRef.current?.active) {
      clientRef.current.publish({
        destination: `/pub/chatRoom/${id}`,
        body: JSON.stringify(message),
        headers: {
          Authorization: token,
        },
      });
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    } else {
      console.error('WebSocket client is not connected');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  // 초기 메시지 불러오기
  const fetchInitialMessages = async (id: string) => {
    try {
      const response = await apiInstance.api.getInitialMessages(Number(id));
      console.log('Initial messages:', response);
      if (response?.results) {
        setReadMessages(response.results[0]?.readMessages || []);
        setUnreadMessages(response.results[0]?.unreadMessages || []);
      }
    } catch (error) {
      console.log('Failed to fetch initial messages:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInitialMessages(id);
    }
  }, [id]);

  useEffect(() => {
    if (unreadRef.current) {
      unreadRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [unreadMessages]);

  return (
    <div className="flex flex-col p-6 w-[820px] border-2 border-gray-200 bg-white rounded-lg">
      <h1 className="text-xl font-bold mb-4">채팅방</h1>
      <div className="flex flex-col flex-grow overflow-auto mb-4">
        {messages.map((msg, index) => (
          <Bubble
            key={index}
            isCurrentUser={msg.sender === nickname}
            message={msg.content || ''}
            sender={
              typeof msg.sender === 'string'
                ? msg.sender
                : msg.sender?.nickname || ''
            }
            sendTime={
              msg.sendTime
                ? new Date(msg.sendTime).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''
            }
            senderImage={msg.sender === nickname ? imageUrl : undefined}
          />
        ))}
        {readMessages.map((msg, index) => (
          <Bubble
            key={`read-${index}`}
            isCurrentUser={msg.sender?.nickname === nickname}
            message={msg.content || ''}
            sender={msg.sender?.nickname || ''}
            sendTime={
              msg.sendTime
                ? new Date(msg.sendTime).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''
            }
            senderImage={
              msg.sender?.nickname === nickname ? imageUrl : undefined
            }
          />
        ))}
        {unreadMessages.map((msg, index) => (
          <div key={`unread-${index}`} ref={index === 0 ? unreadRef : null}>
            <Bubble
              isCurrentUser={msg.sender?.nickname === nickname}
              message={msg.content || ''}
              sender={msg.sender?.nickname || ''}
              sendTime={
                msg.sendTime
                  ? new Date(msg.sendTime).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''
              }
              senderImage={
                msg.sender?.nickname === nickname ? imageUrl : undefined
              }
            />
          </div>
        ))}
      </div>
      <div className="flex mt-4 space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-gray-100 py-2 px-4 text-sm border rounded-2xl"
          placeholder="메시지를 입력하세요"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-primary text-white rounded-full"
        >
          <MoveUp />
        </button>
      </div>
    </div>
  );
};

export default Chat;
