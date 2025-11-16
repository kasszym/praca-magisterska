<script setup>
import ButtonComponent from "./common/ButtonComponent.vue";
import TheSeparator from "./common/TheSeparator.vue";
import Modal from './common/Modal.vue';
import Registration from './common/Registration.vue';
import Login from './common/Login.vue';
import { ref } from 'vue';

const isModalOpen = ref(false);
const view = ref('register');
const modalHeader = ref('Zarejestruj się');

const handleRegister = (user) => {
  isModalOpen.value = false;
};

const handleLogin = (user) => {
  isModalOpen.value = false;
};

const handleToggle = (target) => {
  view.value = target;
  modalHeader.value = target === 'register' ? 'Zarejestruj się' : 'Zaloguj się';
};
</script>
<template>
  <header class="bg-white">
    <div class="container-fluid px-3">
      <div
        class="d-flex align-items-center justify-content-between mx-auto gap-3"
        style="max-width: var(--app-width); height: 72px"
      >
        <div class="d-flex align-items-center">
          <svg
            width="41"
            height="41"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Aureon Motors car icon"
            title="Aureon Motors"
          >
            <path
              d="M3 13l1.5-4A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.2L21 13v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5z"
              fill="currentColor"
            />
            <circle
              cx="7.5"
              cy="15.5"
              r="1.5"
              fill="currentColor"
            />
            <circle
              cx="16.5"
              cy="15.5"
              r="1.5"
              fill="currentColor"
            />
          </svg>
          <span
            class="ms-2 fw-bold"
            style="font-size: var(--fs-l); color: var(--navy)"
          >
            Aureon Motors
          </span>
        </div>
        <ButtonComponent
          width="189px"
          title="Logowanie i rejestracja"
          background-color="var(--pink)"
          background-color-hover="var(--dark-pink)"
          @handle-click="isModalOpen = true"
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
</style>
