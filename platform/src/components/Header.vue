<script setup>
import ButtonComponent from "./common/ButtonComponent.vue";
import TheSeparator from "./common/TheSeparator.vue";
import Modal from './common/Modal.vue';
import Registration from './common/Registration.vue';
import Login from './common/Login.vue';
import { ref } from 'vue';
import { useAuth } from '../composables/auth';

const { logout, isAuthenticated } = useAuth();

const isModalOpen = ref(false);
const view = ref('register');
const modalHeader = ref('Zarejestruj się');
const isLoggedIn = ref(isAuthenticated());

const handleRegister = (user) => {
  isModalOpen.value = false;
  isLoggedIn.value = true;
};

const handleLogin = (user) => {
  isModalOpen.value = false;
  isLoggedIn.value = true;
};

const handleToggle = (target) => {
  view.value = target;
  modalHeader.value = target === 'register' ? 'Zarejestruj się' : 'Zaloguj się';
};

const handleLogout = async () => {
  await logout();
  isLoggedIn.value = false;
};

const openLoginModal = () => {
  view.value = 'login';
  modalHeader.value = 'Zaloguj się';
  isModalOpen.value = true;
};

defineExpose({
  openLoginModal
});
</script>
<template>
  <header class="bg-white">
    <div class="container-fluid px-3">
      <div
        class="d-flex align-items-center justify-content-between mx-auto gap-3"
        style="max-width: var(--app-width); height: 72px"
      >
        <div class="logo-container">
          <div class="logo-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Aureon Motors"
            >
              <path
                d="M6 16l2-5a2 2 0 0 1 1.9-1.3h12.2a2 2 0 0 1 1.9 1.3l2 5v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H10v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-6z"
                fill="currentColor"
              />
              <circle cx="11" cy="19" r="1.5" fill="currentColor" />
              <circle cx="21" cy="19" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <span class="logo-text">Aureon <span class="logo-light">Motors</span></span>
        </div>
        <ButtonComponent
          v-if="!isLoggedIn"
          width="189px"
          title="Logowanie i rejestracja"
          background-color="var(--pink)"
          background-color-hover="var(--dark-pink)"
          @handle-click="isModalOpen = true"
        />
        <ButtonComponent
          v-else
          width="120px"
          title="Wyloguj się"
          background-color="var(--pink)"
          background-color-hover="var(--dark-pink)"
          @handle-click="handleLogout"
        />
        <Modal v-model:isOpen="isModalOpen" :header="modalHeader" width="600px">
          <template #content>
            <Registration v-if="view === 'register'" @register="handleRegister" @toggle="handleToggle" />
            <Login v-else @login="handleLogin" @toggle="handleToggle" />
          </template>
        </Modal>
      </div>
    </div>

    <TheSeparator />
  </header>
</template>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.logo-container:hover {
  opacity: 0.8;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--main-color);
  border-radius: 10px;
  color: white;
  transition: all 0.3s ease;
}

.logo-container:hover .logo-icon {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
}

.logo-text {
  font-size: 20px;
  font-weight: 800;
  color: var(--navy);
  letter-spacing: -0.5px;
}

.logo-light {
  font-weight: 400;
  color: var(--dark-grey);
}

.modal-input{
  padding: 10px 12px;
  border: 1px solid var(--grey100);
  border-radius: 8px;
  width: 100%;
}
.oauth-btn{
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--grey100);
  background: #fff;
  cursor: pointer;
}
.link-btn{
  background: transparent;
  border: none;
  color: var(--main-color);
  cursor: pointer;
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 18px;
  }
}
</style>
