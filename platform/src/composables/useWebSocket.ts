import { ref, onUnmounted } from 'vue';
import Pusher from 'pusher-js';

const pusher = ref<Pusher | null>(null);
const channel = ref<any>(null);
const isConnected = ref(false);
const connectionError = ref<string | null>(null);

export const useWebSocket = () => {
  const connect = (sessionId: string) => {
    try {
      pusher.value = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY || '', {
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || 'mt1',
        wsHost: window.location.hostname,
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
      });

      channel.value = pusher.value.subscribe(`chatbot.${sessionId}`);
      
      pusher.value.connection.bind('connected', () => {
        isConnected.value = true;
        connectionError.value = null;
      });

      pusher.value.connection.bind('error', (err: any) => {
        connectionError.value = err.message || 'WebSocket connection error';
        isConnected.value = false;
      });

      pusher.value.connection.bind('disconnected', () => {
        isConnected.value = false;
      });

    } catch (err: any) {
      connectionError.value = err.message || 'Failed to initialize WebSocket';
      isConnected.value = false;
    }
  };

  const disconnect = () => {
    if (channel.value) {
      channel.value.unbind_all();
      pusher.value?.unsubscribe(`chatbot.${channel.value.name}`);
    }
    if (pusher.value) {
      pusher.value.disconnect();
    }
    isConnected.value = false;
  };

  const on = (event: string, callback: (data: any) => void) => {
    if (channel.value) {
      channel.value.bind(event, callback);
    }
  };

  const off = (event: string) => {
    if (channel.value) {
      channel.value.unbind(event);
    }
  };

  onUnmounted(() => {
    disconnect();
  });

  return {
    connect,
    disconnect,
    on,
    off,
    isConnected,
    connectionError,
  };
};