import React, { useState, useRef, useEffect } from 'react';
import { FaGem, FaTimes, FaPaperPlane, FaComments } from 'react-icons/fa';
import { useChatbot } from '../../hooks/useChatbot';
import type { Message } from '../../hooks/useChatbot';
import './ChatWidget.css';

const ChatWidget: React.FC = () => {
  const { messages, isTyping, isOpen, sendMessage, toggleChat } = useChatbot();
  const [inputMessage, setInputMessage] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const message = inputMessage;
    setInputMessage('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      {!isOpen ? (
        <div className="chat-button" onClick={toggleChat}>
          <FaComments size={28} />
          <div className="chat-button-pulse"></div>
        </div>
      ) : (
        <div className="chat-widget">
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-header-icon">
                <FaGem />
              </div>
              <div className="chat-header-text">
                <h3>Konsultant Aureon</h3>
                <p className="chat-status">
                  <span className="status-dot"></span>
                  Online
                </p>
              </div>
            </div>
            <button className="chat-close-btn" onClick={toggleChat}>
              <FaTimes size={20} />
            </button>
          </div>

          <div ref={messagesContainerRef} className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.sender === 'bot' && (
                  <div className="message-avatar">
                    <FaGem />
                  </div>
                )}
                <div className="message-content">
                  <div className="message-bubble">
                    <p className="message-text">{message.text}</p>
                  </div>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message bot-message">
                <div className="message-avatar">
                  <FaGem />
                </div>
                <div className="message-content">
                  <div className="message-bubble typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              type="text"
              placeholder="Napisz wiadomość..."
              className="chat-input"
            />
            <button
              className="chat-send-btn"
              disabled={!inputMessage.trim()}
              onClick={handleSend}
            >
              <FaPaperPlane size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
