import { ref, computed } from 'vue';
import { useWebSocket } from './useWebSocket';
import { useIntentMatcher } from './useIntentMatcher';
import { useResponseGenerator } from './useResponseGenerator';
import API from '../config/api';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const messages = ref<Message[]>([]);
const conversationId = ref<number | null>(null);
const sessionId = ref<string>('');
const isTyping = ref(false);
const isOpen = ref(false);

export const useChatbot = () => {
  const { connect, on, isConnected } = useWebSocket();
  const { matchIntent, extractCarName } = useIntentMatcher();
  const { generateResponse, isLoading } = useResponseGenerator();

  const toggleChat = () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value && messages.value.length === 0) {
      initChat();
    }
  };

  const initChat = async () => {
    sessionId.value = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      const response = await API.post('/chatbot/conversation', {
        session_id: sessionId.value,
      });
      
      conversationId.value = response.data.conversation_id;
      
      if (response.data.messages && response.data.messages.length > 0) {
        messages.value = response.data.messages.map((msg: any) => ({
          id: msg.id,
          text: msg.message,
          sender: msg.sender,
          timestamp: new Date(msg.created_at),
        }));
      } else {
        addMessage('Witaj! Jestem konsultantem Aureon Motors. Jak mogę Ci pomóc?', 'bot');
      }
    } catch (error: any) {
      console.error('Error creating conversation:', error);
      addMessage('Witaj! Jestem konsultantem Aureon Motors. Jak mogę Ci pomóc?', 'bot');
    }
    
    connect(sessionId.value);

    on('MessageSent', (data: any) => {
      if (data.sender === 'bot') {
        addMessage(data.message, 'bot');
        isTyping.value = false;
      }
    });
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    if (!conversationId.value) {
      console.error('No conversation ID');
      return;
    }

    addMessage(text, 'user');
    isTyping.value = true;

    try {
      await API.post('/chatbot/message', {
        conversation_id: conversationId.value,
        sender: 'user',
        message: text,
      });

      setTimeout(async () => {
        const intent = matchIntent(text);
        
        if (!intent) {
          const fallbackResponse = 'Przepraszam, nie rozumiem. Możesz zapytać o ceny, zasięg, kolory, specyfikację lub dostępność naszych samochodów.';
          addMessage(fallbackResponse, 'bot');
          
          await API.post('/chatbot/message', {
            conversation_id: conversationId.value,
            sender: 'bot',
            message: fallbackResponse,
          });
          
          isTyping.value = false;
          return;
        }

        let response = intent.response_template;

        if (intent.requires_data) {
          const carName = extractCarName(text);
          response = await generateResponse(intent.name, carName);
        }

        addMessage(response, 'bot');
        
        await API.post('/chatbot/message', {
          conversation_id: conversationId.value,
          sender: 'bot',
          message: response,
        });
        
        isTyping.value = false;
      }, 1000);

    } catch (error: any) {
      console.error('Error sending message:', error);
      addMessage('Przepraszam, wystąpił błąd. Spróbuj ponownie.', 'bot');
      isTyping.value = false;
    }
  };

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const message: Message = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date(),
    };
    messages.value.push(message);
  };

  const clearChat = () => {
    messages.value = [];
    conversationId.value = null;
  };

  const closeConversation = () => {
    isOpen.value = false;
  };

  const messageCount = computed(() => messages.value.length);

  return {
    messages,
    isTyping,
    isOpen,
    isConnected,
    isLoading,
    messageCount,
    initChat,
    sendMessage,
    clearChat,
    toggleChat,
    closeConversation,
  };
};