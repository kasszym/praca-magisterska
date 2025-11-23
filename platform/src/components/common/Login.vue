<script setup>
import { ref, onMounted } from "vue";
import ButtonComponent from "./ButtonComponent.vue";
import { useAuth } from "../../composables/auth";

const emit = defineEmits(["login", "toggle"]);

const { login, isLoading } = useAuth();

const formRef = ref(null);
const form = ref({ email: "", password: "" });

const rules = ref({
  email: [
    { required: true, message: "E-mail jest wymagany", trigger: "blur" },
    { type: "email", message: "Nieprawidłowy format e-mail", trigger: "blur" }
  ],
  password: [{ required: true, message: "Hasło jest wymagane", trigger: "blur" }]
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

const submit = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const result = await login(
        {
          email: form.value.email,
          password: form.value.password,
        },
        formRef.value
      );

      if (result) {
        emit("login", result.user);
      }
    }
  });
};

onMounted(() => {
  const inputs = document.querySelectorAll('.login .el-input__inner');
  inputs.forEach((inp) => {
    try {
      const content = inp.closest('.el-form-item__content');
      if (content && inp.value && inp.value.length > 0) content.classList.add('has-value');
    } catch (e) {}
  });
});
</script>

<template>
  <div class="login">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="0">
      <div class="form-fields">
        <el-form-item prop="email">
          <label class="form-label">E-mail</label>
          <el-input v-model="form.email" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
        </el-form-item>

        <el-form-item prop="password">
          <label class="form-label">Hasło</label>
          <el-input v-model="form.password" type="password" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
        </el-form-item>
      </div>

      <div class="divider-container">
        <div class="divider-line"></div>
        <span class="divider-text">lub</span>
        <div class="divider-line"></div>
      </div>

      <div class="oauth-section">
        <button class="oauth-btn" type="button">
          <img src="../../assets/google.png" alt="Google Logo" class="oauth-icon" />
          <span>Kontynuuj z Google</span>
        </button>
      </div>

      <div class="submit-section">
        <ButtonComponent 
          width="100%" 
          @handle-click="submit" 
          :title="isLoading ? 'Logowanie...' : 'Zaloguj się'"
        />
      </div>

      <div class="footer-section">
        <p class="footer-text">
          Nie masz konta?
          <button class="link-btn" @click="$emit('toggle', 'register')" type="button">
            Zarejestruj się
          </button>
        </p>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  margin: auto;
  padding: 1rem 0;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-bottom: 2rem;
}

.divider-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2.5rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: var(--grey);
}

.divider-text {
  font-size: var(--fs-xs);
  color: var(--dark-grey);
  white-space: nowrap;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.oauth-section {
  margin-bottom: 1.5rem;
}

.oauth-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--grey);
  background: #fff;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  font-size: var(--fs-s);
  color: var(--black);
  font-weight: 500;
  font-family: var(--font-inter);
}

.oauth-btn:hover {
  border-color: var(--grey100);
  background: var(--light-blue);
}

.oauth-btn:active {
  transform: scale(0.998);
}

.oauth-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.submit-section {
  margin-bottom: 2rem;
}

.footer-section {
  text-align: center;
  padding-top: 1rem;
}

.footer-text {
  margin: 0;
  font-size: var(--fs-s);
  color: var(--dark-grey);
  font-family: var(--font-inter);
}

.link-btn {
  background: transparent;
  border: none;
  color: var(--main-color);
  cursor: pointer;
  font-size: var(--fs-s);
  padding: 0;
  margin-left: 0.25rem;
  font-weight: 600;
  transition: color 0.2s ease;
  font-family: var(--font-inter);
  text-decoration: none;
}

.link-btn:hover {
  color: var(--main-hover-color);
  text-decoration: underline;
}

/* Enhanced form item spacing */
:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-form-item__content) {
  transition: all 0.15s ease;
}

/* Cleaner input styling */
:deep(.el-input__wrapper) {
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  border-radius: 10px;
}

:deep(.el-input__wrapper:hover) {
  border-color: var(--grey100);
}

:deep(.el-input__wrapper.is-focus) {
  border-color: var(--main-color);
  box-shadow: 0 0 0 2px rgba(84, 8, 99, 0.08);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .login {
    padding: 0.5rem 0;
  }

  .form-fields {
    gap: 1.5rem;
    margin-bottom: 1.75rem;
  }

  .divider-container {
    margin: 2rem 0;
  }

  .submit-section {
    margin-bottom: 1.5rem;
  }
}
</style>
