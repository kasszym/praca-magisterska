import { useState, useCallback } from 'react';
import api from '../config/api';
import { useIntentMatcher } from './useIntentMatcher';
import { useResponseGenerator } from './useResponseGenerator';
import type { ChatMessage } from '../types';

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { matchIntent, extractCarName } = useIntentMatcher();
  const { generateResponse } = useResponseGenerator();

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen && messages.length === 0) {
      initChat();
    }
  }, [isOpen, messages.length]);

  const initChat = async () => {
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
      const response = await api.post('/chatbot/conversation', {
        session_id: newSessionId,
      });

      setConversationId(response.data.conversation_id);

      if (response.data.messages && response.data.messages.length > 0) {
        setMessages(
          (response.data.messages as ChatMessage[]).map((msg) => ({
            id: Number(msg.id),
            text: msg.message,
            sender: msg.sender as 'user' | 'bot',
            timestamp: new Date(msg.created_at || Date.now()),
          }))
        );
      } else {
        addMessage('Witaj! Jestem konsultantem Aureon Motors. Jak mogę Ci pomóc?', 'bot');
      }
    } catch (error: any) {
      console.error('Error creating conversation:', error);
      addMessage('Witaj! Jestem konsultantem Aureon Motors. Jak mogę Ci pomóc?', 'bot');
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    if (!conversationId) {
      console.error('No conversation ID');
      return;
    }

    addMessage(text, 'user');
    setIsTyping(true);

    try {
      await api.post('/chatbot/message', {
        conversation_id: conversationId,
        sender: 'user',
        message: text,
      });

      setTimeout(async () => {
        const intent = matchIntent(text);

        if (!intent) {
          const fallbackResponse =
            'Przepraszam, nie rozumiem. Możesz zapytać o ceny, zasięg, kolory, specyfikację lub dostępność naszych samochodów.';
          addMessage(fallbackResponse, 'bot');

          await api.post('/chatbot/message', {
            conversation_id: conversationId,
            sender: 'bot',
            message: fallbackResponse,
          });

          setIsTyping(false);
          return;
        }

        let response = intent.response_template;

        if (intent.requires_data) {
          const carName = extractCarName(text);
          response = await generateResponse(intent.name, carName);
        }

        addMessage(response, 'bot');

        await api.post('/chatbot/message', {
          conversation_id: conversationId,
          sender: 'bot',
          message: response,
        });

        setIsTyping(false);
      }, 1000);
    } catch (error: any) {
      console.error('Error sending message:', error);
      addMessage('Przepraszam, wystąpił błąd. Spróbuj ponownie.', 'bot');
      setIsTyping(false);
    }
  };

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const message: Message = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const closeConversation = () => {
    setIsOpen(false);
  };

  return {
    messages,
    isTyping,
    isOpen,
    sendMessage,
    toggleChat,
    closeConversation,
  };
};
