<script setup>
import { ref } from "vue";
import TheSeparator from "../common/TheSeparator.vue";
const emit = defineEmits(["login", "toggle"]);

const email = ref("");
const password = ref("");

const submit = () => {
  emit("login", { email: email.value, password: password.value });
};
</script>

<template>
  <div class="Login">
    <div style="display: flex; flex-direction: column; gap: 12px">
      <input
        v-model="email"
        placeholder="E-mail"
        class="modal-input"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Hasło"
        class="modal-input"
      />
      <TheSeparator style="margin: 1rem 0 !important" />
      <div>
        <button class="oauth-btn">
          <img
            src="../../assets/google.png"
            style="width: 20px; height: 20px"
            alt="Google Logo"
          />
          <span>Kontynuuj z <strong>Google</strong></span>
        </button>
      </div>
      <div>
        <button
          @click="submit"
          class="primary-btn"
        >
          Zaloguj się
        </button>
      </div>
      <div style="text-align: center; margin-top: 8px">
        <button
          class="link-btn"
          @click="$emit('toggle', 'register')"
        >
          Nie masz konta?
          <span style="text-decoration: underline; font-weight: 600"
            >Zarejestruj się</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 40rem;
  margin: auto;
}
.modal-input {
  padding: 10px 12px;
  border: 1px solid var(--grey100);
  border-radius: 8px;
  width: 100%;
}
.oauth-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--grey100);
  background: #fff;
  cursor: pointer;
  width: 100%;
  justify-content: center;
}
.primary-btn {
  padding: 10px 14px;
  background: var(--main-color);
  color: #fff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  width: 100%;
}
.link-btn {
  background: transparent;
  border: none;
  color: var(--main-color);
  cursor: pointer;
}
</style>
