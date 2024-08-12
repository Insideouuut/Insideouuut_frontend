import { Api, ChatResponseDTO } from '@/api/Apis';
import axiosInstance from '@/api/axiosConfig';
import { useUserStore } from '@/store/userStore';
import { Client } from '@stomp/stompjs';
import { MoveUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Bubble from './Bubble';

// WebSocket 클라이언트를 컴포넌트 외부에 선언하여 중복 연결을 방지
let socketClient: Client | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let subscription: any = null; // 구독을 추적하는 변수

const apiInstance = new Api();

const Chat = () => {
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const { nickname, imageUrl } = useUserStore();
  const [messages, setMessages] = useState<ChatResponseDTO[]>([]);
  const [lastMessageId, setLastMessageId] = useState<number | null>(null); // 마지막 메시지 ID를 추적
  const unreadRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState('');
  const token = localStorage.getItem('accessToken') || '';

  const headersRef = useRef({
    Authorization: token,
  });

  // WebSocket 연결 함수
  const connectWebSocket = () => {
    if (socketClient && socketClient.active) {
      console.log('[Chat] WebSocket is already connected');
      return; // 이미 연결되어 있으면 다시 연결하지 않음
    }

    console.log('[Chat] Connecting WebSocket...');
    const socket = new SockJS(`${axiosInstance.defaults.baseURL}/ws-stomp`);
    socketClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log('[STOMP] ' + str),
      connectHeaders: headersRef.current,
      onConnect: () => {
        console.log('[STOMP] Connected');

        // 기존 구독이 있다면 해제
        if (subscription) {
          subscription.unsubscribe();
        }

        // 새로운 구독 설정
        subscription = socketClient?.subscribe(
          `/sub/chatRoom/${chatRoomId}`,
          (messageOutput) => {
            const message = JSON.parse(messageOutput.body) as ChatResponseDTO;
            console.log('Received message from server:', message);

            handleReceivedMessage(message);
          },
        );
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      onWebSocketClose: () => {
        console.log('[STOMP] WebSocket connection closed');
      },
    });

    socketClient.activate();
  };

  const enterChatRoom = async () => {
    try {
      console.log('[Chat] Entering chat room:', chatRoomId);
      await apiInstance.api.enterChatRoom(Number(chatRoomId));
      await fetchInitialMessages(chatRoomId!); // 채팅방 입장 후 초기 메시지를 불러옴
    } catch (error) {
      console.error('Failed to enter chat room:', error);
    }
  };

  const exitChatRoom = async () => {
    try {
      console.log('[Chat] Exiting chat room:', chatRoomId);
      await apiInstance.api.exitChatRoom(Number(chatRoomId));
    } catch (error) {
      console.error('Failed to exit chat room:', error);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatResponseDTO = {
      content: newMessage,
      sender: { nickname: nickname || '' },
      sendTime: new Date().toISOString(), // 메시지를 보낼 때 sendTime을 설정
    };

    // 클라이언트에서 먼저 메시지를 UI에 추가 (서버 응답 전)
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');

    if (socketClient?.active) {
      socketClient.publish({
        destination: `/pub/chatRoom/${chatRoomId}`,
        body: JSON.stringify(message),
        headers: {
          Authorization: token,
        },
      });
    } else {
      console.error('WebSocket client is not connected');
    }
  };

  // 서버로부터 수신된 메시지를 처리하는 함수
  const handleReceivedMessage = (message: ChatResponseDTO) => {
    setMessages((prevMessages) => {
      // 서버에서 수신한 메시지가 클라이언트에서 보낸 메시지와 동일한 경우 업데이트
      const existingMessageIndex = prevMessages.findIndex(
        (msg) =>
          msg.content === message?.content &&
          msg.sender?.nickname === message.sender?.nickname,
      );

      if (existingMessageIndex !== -1) {
        const updatedMessages = [...prevMessages];
        updatedMessages[existingMessageIndex] = message; // 서버에서 수신한 메시지로 업데이트
        return updatedMessages;
      }

      return [...prevMessages, message]; // 새로운 메시지 추가
    });
  };

  // 초기 메시지 로드
  const fetchInitialMessages = async (chatRoomId: string) => {
    try {
      const response = await apiInstance.api.getInitialMessages(
        Number(chatRoomId),
      );
      if (response?.results) {
        const readMsgs = response.results[0]?.readMessages || [];
        const unreadMsgs = response.results[0]?.unreadMessages || [];

        setMessages([...readMsgs, ...unreadMsgs]);

        if (unreadMsgs.length > 0) {
          setLastMessageId(unreadMsgs[unreadMsgs.length - 1].id || null);
        } else if (readMsgs.length > 0) {
          setLastMessageId(readMsgs[readMsgs.length - 1].id || null);
        }
      }
    } catch (error) {
      console.error('Failed to fetch initial messages:', error);
    }
  };

  // 이후 메시지 로드
  const fetchNextMessages = async () => {
    if (lastMessageId === null) return;

    try {
      const response = await apiInstance.api.getNextMessages(
        Number(chatRoomId),
        {
          messageId: lastMessageId,
        },
      );
      if (response?.results) {
        const newMessages = response.results.flat();

        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        setLastMessageId(newMessages[newMessages.length - 1].id || null);
      }
    } catch (error) {
      console.error('Failed to fetch next messages:', error);
    }
  };

  // 이전 메시지 로드
  const fetchPreviousMessages = async () => {
    if (messages.length === 0) return;

    try {
      const firstMessageId = Number(messages[0].id);
      const response = await apiInstance.api.getPreviousMessages(
        Number(chatRoomId),
        {
          messageId: firstMessageId,
        },
      );
      if (response?.results) {
        const previousMessages = response.results.flat();

        setMessages((prevMessages) => [...previousMessages, ...prevMessages]);
      }
    } catch (error) {
      console.error('Failed to fetch previous messages:', error);
    }
  };

  // 스크롤 핸들링
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;

      if (scrollTop === 0) {
        fetchPreviousMessages();
      } else if (scrollTop + clientHeight >= scrollHeight) {
        fetchNextMessages();
      }
    }
  };

  useEffect(() => {
    const initializeChat = async () => {
      await enterChatRoom();
      connectWebSocket();
    };

    initializeChat();

    return () => {
      if (socketClient?.active) {
        socketClient.deactivate();
        console.log('[Chat] Disconnected from WebSocket');
      }
      exitChatRoom(); // 채팅방에서 퇴장
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (unreadRef.current) {
      unreadRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  // 엔터키로 메시지 전송
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div
      className="flex flex-col p-6 w-[820px] border-2 border-gray-200 bg-white rounded-lg overflow-y-auto"
      style={{ maxHeight: '80vh' }} // 채팅방 전체 높이를 설정합니다.
    >
      <h1 className="text-xl font-bold mb-4">채팅방</h1>
      <div
        className="flex flex-col flex-grow overflow-auto mb-4"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {[...messages].map((msg, index) => (
          <Bubble
            key={index}
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
        <div ref={unreadRef}></div> {/* Unread message indicator */}
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
