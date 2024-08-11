import { CompatClient, Frame, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// STOMP 클라이언트 생성 및 연결 함수
export const createStompClient = (url: string, token: string): CompatClient => {
  const socket = new SockJS(url);
  const stompClient = Stomp.over(socket);

  // 자동 재연결 설정
  stompClient.reconnect_delay = 5000;

  stompClient.connect(
    { Authorization: `Bearer ${token}` },
    (frame: Frame) => {
      console.log('Connected: ' + frame);
    },
    (error: string) => {
      console.error('STOMP connection error:', error);
    },
  );

  return stompClient;
};

// 메시지 구독 함수
export const subscribeToChatRoom = (
  client: CompatClient,
  chatRoomId: string,
  onMessageReceived: (messageBody: string) => void,
) => {
  client.subscribe(`/subscription/chatroom/${chatRoomId}`, (message) => {
    onMessageReceived(message.body);
  });
};
