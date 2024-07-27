// src/hooks/useStompClient.ts

import { ChatMessage, StompSubscription } from '@/global';
import { Client, Message } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

const useStompClient = (url: string) => {
  const [client, setClient] = useState<Client | null>(null);
  const [subscriptions, setSubscriptions] = useState<StompSubscription[]>([]);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: url,
      connectHeaders: {
        login: 'user', // 필요 시 수정
        passcode: 'password', // 필요 시 수정
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      // 여기에 구독 추가
      // 예: subscribe('/sub/chatRoom/{roomId}', callbackFunction);
    };

    stompClient.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    stompClient.activate();

    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [url]);

  const subscribe = (
    destination: string,
    callback: (message: Message) => void,
  ) => {
    if (client) {
      const subscription = client.subscribe(destination, callback);
      setSubscriptions((prev) => [
        ...prev,
        { id: subscription.id, unsubscribe: () => subscription.unsubscribe() },
      ]);
    }
  };

  const sendMessage = (destination: string, message: ChatMessage) => {
    if (client) {
      client.publish({ destination, body: JSON.stringify(message) });
    }
  };

  return { subscribe, sendMessage, subscriptions };
};

export default useStompClient;
