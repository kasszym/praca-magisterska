<script setup>
import ButtonComponent from "./common/ButtonComponent.vue";
import TheSeparator from "./common/TheSeparator.vue";
import Modal from './common/Modal.vue';
import Registration from './common/Registration.vue';
import Login from './common/Login.vue';
import { ref } from 'vue';
import { useAuth } from '../composables/auth';
import { useRouter } from 'vue-router';
import { User, ShoppingCart, SwitchButton } from '@element-plus/icons-vue';

const { logout, isAuthenticated } = useAuth();
const router = useRouter();

const isModalOpen = ref(false);
const view = ref('register');
const modalHeader = ref('Zarejestruj się');
const isLoggedIn = ref(isAuthenticated());
const showProfileMenu = ref(false);

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
  showProfileMenu.value = false;
};

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

const goToOrders = () => {
  showProfileMenu.value = false;
  router.push('/orders');
};

const goToHome = () => {
  router.push('/');
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
        <div class="logo-container" @click="goToHome">
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
        <div v-if="!isLoggedIn">
          <ButtonComponent
            width="189px"
            title="Logowanie i rejestracja"
            background-color="var(--pink)"
            background-color-hover="var(--dark-pink)"
            @handle-click="isModalOpen = true"
          />
        </div>
        <div v-else class="user-section">
          <div class="profile-menu-container">
            <button class="profile-button" @click="toggleProfileMenu">
              <el-icon :size="20">
                <User />
              </el-icon>
            </button>
            
            <transition name="dropdown">
              <div v-if="showProfileMenu" class="profile-dropdown">
                <button class="dropdown-item" @click="goToOrders">
                  <el-icon :size="18">
                    <ShoppingCart />
                  </el-icon>
                  <span>Twoje zamówienia</span>
                </button>
                <button class="dropdown-item logout-item" @click="handleLogout">
                  <el-icon :size="18">
                    <SwitchButton />
                  </el-icon>
                  <span>Wyloguj się</span>
                </button>
              </div>
            </transition>
          </div>
        </div>
        <Modal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" :header="modalHeader" width="600px">
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
  box-shadow: 0 4px 12px rgba(247, 168, 208, 0.3);
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

.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-menu-container {
  position: relative;
}

.profile-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--main-color) 0%, var(--dark-pink) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
}

.profile-button:hover {
  transform: scale(1.08);
}

.profile-button:active {
  transform: scale(0.98);
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.08);
  min-width: 220px;
  overflow: hidden;
  z-index: 1000;
  padding: 8px;
}

.dropdown-item {
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: var(--navy);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  margin-bottom: 4px;
}

.dropdown-item:last-child {
  margin-bottom: 0;
}

.dropdown-item:hover {
  color: var(--main-color);
  transform: translateX(4px);
}

.logout-item {
  color: #ff4444;
}

.logout-item:hover {
  color: #ff4444;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top right;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-8px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>

