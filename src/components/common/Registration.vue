<script setup>
import TheSeparator from "../common/TheSeparator.vue";
import { ref, onMounted } from "vue";
import ButtonComponent from "./ButtonComponent.vue";
const emit = defineEmits(["register", "toggle"]);

const formRef = ref(null);
const form = ref({ name: "", email: "", password: "" });

const rules = ref({
  name: [{ required: true, message: "Imię i nazwisko jest wymagane", trigger: "blur" }],
  email: [
    { required: true, message: "E-mail jest wymagany", trigger: "blur" },
    { type: "email", message: "Nieprawidłowy format e-mail", trigger: "blur" },
  ],
  password: [{ required: true, message: "Hasło jest wymagane", trigger: "blur" }],
});

function markHasValue(e) {
  const target = e && e.target ? e.target : e;
  const content = target.closest && target.closest('.el-form-item__content') ? target.closest('.el-form-item__content') : target.parentElement && target.parentElement.closest('.el-form-item__content');
  if (!content) return;
  if (e && e.type === 'focus') {
    content.classList.add('focused');
  } else if (e && e.type === 'blur') {
    content.classList.remove('focused');
  }

  if (target.value && String(target.value).length > 0) content.classList.add('has-value');
  else content.classList.remove('has-value');
}

const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit('register', { name: form.value.name, email: form.value.email, password: form.value.password });
    }
  });
};

onMounted(() => {
  const inputs = document.querySelectorAll('.registration .el-input__inner');
  inputs.forEach((inp) => {
    try {
      const content = inp.closest('.el-form-item__content');
      if (content && inp.value && inp.value.length > 0) content.classList.add('has-value');
    } catch (e) {}
  });
});
</script>

<template>
  <div class="registration">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="0">
      <el-form-item prop="name">
        <label class="form-label">Imię i nazwisko</label>
        <el-input v-model="form.name" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
      </el-form-item>

      <el-form-item prop="email">
        <label class="form-label">E-mail</label>
        <el-input v-model="form.email" type="email" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
      </el-form-item>

      <el-form-item prop="password">
        <label class="form-label">Hasło</label>
        <el-input v-model="form.password" type="password" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
      </el-form-item>

      <TheSeparator style="margin: 1rem 0 !important;"/>

      <div>
        <button class="oauth-btn">
          <img src="../../assets/google.png" style="width: 20px; height: 20px" alt="Google Logo" />
          <span>Kontynuuj z <span style="font-weight: 600">Google</span> </span>
        </button>
      </div>

      <div style="margin-top: 12px">
        <ButtonComponent width="100%" @handle-click="submit" title="Zarejestruj się" />
      </div>

      <div style="text-align: center; margin-top: 8px">
        <button class="link-btn" @click="$emit('toggle', 'login')">Czy masz już konto? Zaloguj się</button>
      </div>
    </el-form>
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
