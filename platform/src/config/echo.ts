import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_KEY || '',
  wsHost: import.meta.env.VITE_WS_HOST || 'localhost',
  wsPort: Number(import.meta.env.VITE_WS_PORT || 6001),
  wssPort: Number(import.meta.env.VITE_WS_PORT || 6001),
  forceTLS: import.meta.env.VITE_WS_TLS === 'true',
  encrypted: import.meta.env.VITE_WS_TLS === 'true',
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
});

export default echo;
