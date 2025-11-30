import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js';

interface UseWebSocketReturn {
  connect: (sessionId: string) => void;
  disconnect: () => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string) => void;
  isConnected: boolean;
  connectionError: string | null;
}

export const useWebSocket = (): UseWebSocketReturn => {
  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const connect = (sessionId: string) => {
    try {
      pusherRef.current = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY || '', {
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || 'mt1',
        wsHost: window.location.hostname,
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
      });

      channelRef.current = pusherRef.current.subscribe(`chatbot.${sessionId}`);
      
      pusherRef.current.connection.bind('connected', () => {
        setIsConnected(true);
        setConnectionError(null);
      });

      pusherRef.current.connection.bind('error', (err: any) => {
        setConnectionError(err.message || 'WebSocket connection error');
        setIsConnected(false);
      });

      pusherRef.current.connection.bind('disconnected', () => {
        setIsConnected(false);
      });

    } catch (err: any) {
      setConnectionError(err.message || 'Failed to initialize WebSocket');
      setIsConnected(false);
    }
  };

  const disconnect = () => {
    if (channelRef.current) {
      channelRef.current.unbind_all();
      pusherRef.current?.unsubscribe(`chatbot.${channelRef.current.name}`);
    }
    if (pusherRef.current) {
      pusherRef.current.disconnect();
    }
    setIsConnected(false);
  };

  const on = (event: string, callback: (data: any) => void) => {
    if (channelRef.current) {
      channelRef.current.bind(event, callback);
    }
  };

  const off = (event: string) => {
    if (channelRef.current) {
      channelRef.current.unbind(event);
    }
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return {
    connect,
    disconnect,
    on,
    off,
    isConnected,
    connectionError,
  };
};
