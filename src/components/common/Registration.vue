<script setup>
import TheSeparator from "../common/TheSeparator.vue";
import { ref } from "vue";
import ButtonComponent from "./ButtonComponent.vue";
const emit = defineEmits(["register", "toggle"]);

const name = ref("");
const email = ref("");
const password = ref("");

const submit = () => {
  emit("register", {
    name: name.value,
    email: email.value,
    password: password.value,
  });
};
</script>

<template>
  <div class="registration">
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <input
        v-model="name"
        placeholder="Imię i nazwisko"
        class="modal-input"
      />
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
    </div>
    <TheSeparator style="margin: 1rem 0 !important" />
    <div style="display: flex; gap: 8px">
      <button class="oauth-btn">
        <img
          src="../../assets/google.png"
          style="width: 20px; height: 20px"
          alt="Google Logo"
        />
        <span>Kontynuuj z <span style="font-weight: 600">Google</span> </span>
      </button>
    </div>
    <ButtonComponent
      width="100%"
      @handle-click="submit"
      title="Zarejestruj się"
    />
    <div style="text-align: center; margin-top: 8px">
      <button
        class="link-btn"
        @click="$emit('toggle', 'login')"
      >
        Czy masz już konto?
        <span style="text-decoration: underline; font-weight: 600"
          >Zaloguj się</span
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
.registration {
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

.link-btn {
  background: transparent;
  border: none;
  color: var(--main-color);
  cursor: pointer;
}
</style>
