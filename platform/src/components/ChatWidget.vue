<script setup>
import { ref, nextTick, watch } from "vue";
import { useChatbot } from "../composables/useChatbot";
import { ChatDotRound, Close, Promotion } from "@element-plus/icons-vue";

const {
  messages,
  isTyping,
  isOpen,
  sendMessage,
  toggleChat,
  closeConversation,
} = useChatbot();

const inputMessage = ref("");
const messagesContainer = ref(null);

const handleSend = async () => {
  if (!inputMessage.value.trim()) return;

  const message = inputMessage.value;
  inputMessage.value = "";
  await sendMessage(message);
  await nextTick();
  scrollToBottom();
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

watch(
  messages,
  async () => {
    await nextTick();
    scrollToBottom();
  },
  { deep: true }
);

const formatTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
};

const handleClose = () => {
  toggleChat();
};
</script>

<template>
  <div>
    <div
      v-if="!isOpen"
      class="chat-button"
      @click="toggleChat"
    >
      <el-icon :size="28">
        <ChatDotRound />
      </el-icon>
      <div class="chat-button-pulse"></div>
    </div>

    <div v-else>
      <div class="chat-widget">
        <div class="chat-header">
          <div class="chat-header-content">
            <div class="chat-header-icon">
              <i class="fa-solid fa-gem"></i>
            </div>
            <div class="chat-header-text">
              <h3>Konsultant Aureon</h3>
              <p class="chat-status">
                <span class="status-dot"></span>
                Online
              </p>
            </div>
          </div>
          <button
            class="chat-close-btn"
            @click="handleClose"
          >
            <el-icon :size="20">
              <Close />
            </el-icon>
          </button>
        </div>

        <div
          ref="messagesContainer"
          class="chat-messages"
        >
          <div
            v-for="message in messages"
            :key="message.id"
            :class="[
              'chat-message',
              message.sender === 'user' ? 'user-message' : 'bot-message',
            ]"
          >
            <div
              v-if="message.sender === 'bot'"
              class="message-avatar"
            >
              <i class="fa-solid fa-gem"></i>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <p class="message-text">{{ message.text }}</p>
              </div>
              <span class="message-time">{{
                formatTime(message.timestamp)
              }}</span>
            </div>
          </div>

          <div
            v-if="isTyping"
            class="chat-message bot-message"
          >
            <div class="message-avatar">
              <i class="fa-solid fa-gem"></i>
            </div>
            <div class="message-content">
              <div class="message-bubble typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-input-area">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Napisz wiadomość..."
            class="chat-input"
            @keypress.enter="handleSend"
          />
          <button
            class="chat-send-btn"
            :disabled="!inputMessage.trim()"
            @click="handleSend"
          >
            <el-icon :size="20">
              <Promotion />
            </el-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 64px;
  height: 64px;
  background: linear-gradient(
    135deg,
    var(--main-color) 0%,
    var(--dark-pink) 100%
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(247, 168, 208, 0.4);
  z-index: 9999;
  color: white;
}

.chat-button:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 32px rgba(247, 168, 208, 0.5);
  transition: 0.3s all;
}

.chat-button-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--main-color);
  opacity: 0.3;
}

.chat-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 400px;
  height: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  overflow: hidden;
}

.chat-header {
  background: linear-gradient(
    135deg,
    var(--main-color) 0%,
    var(--dark-pink) 100%
  );
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.chat-header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-header-icon {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.chat-header-text h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}

.chat-status {
  margin: 4px 0 0 0;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0.9;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
}

.chat-close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-message {
  display: flex;
  gap: 10px;
}

.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(
    135deg,
    var(--main-color) 0%,
    var(--dark-pink) 100%
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  flex-shrink: 0;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 70%;
}

.user-message .message-content {
  align-items: flex-end;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 16px;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.bot-message .message-bubble {
  background: white;
  border: 1px solid #e5e7eb;
  border-bottom-left-radius: 4px;
}

.user-message .message-bubble {
  background: var(--main-color);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.message-time {
  font-size: 11px;
  color: var(--dark-grey);
  padding: 0 8px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: var(--dark-grey);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.chat-input-area {
  padding: 16px 20px;
  background: white;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
}

.chat-send-btn {
  width: 44px;
  height: 44px;
  background: linear-gradient(
    135deg,
    var(--main-color) 0%,
    var(--dark-pink) 100%
  );
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
