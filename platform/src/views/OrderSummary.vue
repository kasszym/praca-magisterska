<script setup>
import { useRouter } from 'vue-router';
import { CircleCheck } from '@element-plus/icons-vue';

const router = useRouter();

const goToHome = () => {
  router.push('/');
};

const goToOrders = () => {
  router.push('/orders');
};
</script>

<template>
  <main class="order-summary-page">
    <div class="container">
      <div class="success-card">
        <div class="success-icon">
          <el-icon :size="80" color="#4ade80">
            <CircleCheck />
          </el-icon>
        </div>
        
        <h1 class="success-title">Dziękujemy za złożenie zamówienia!</h1>
        <p class="success-subtitle">
          Twoje zamówienie zostało pomyślnie złożone i jest obecnie przetwarzane.
        </p>

        <div class="info-box">
          <h3>Co dalej?</h3>
          <ul class="next-steps">
            <li>
              <span class="step-number">1</span>
              <span class="step-text">Skontaktujemy się z Tobą w celu weryfikacji danych</span>
            </li>
            <li>
              <span class="step-number">2</span>
              <span class="step-text">Przygotujemy dokumenty zgodnie z wybraną opcją dostawy</span>
            </li>
            <li>
              <span class="step-number">3</span>
              <span class="step-text">Twój samochód będzie gotowy do odbioru!</span>
            </li>
          </ul>
        </div>

        <div class="actions">
          <button class="btn-primary" @click="goToOrders">
            Przejdź do moich zamówień
          </button>
          <button class="btn-secondary" @click="goToHome">
            Wróć do strony głównej
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.order-summary-page {
  min-height: calc(100vh - 200px);
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 80px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 24px;
}

.success-card {
  background: white;
  border-radius: 24px;
  padding: 60px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.success-icon {
  margin-bottom: 32px;
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.success-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--navy);
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}

.success-subtitle {
  font-size: 16px;
  color: var(--dark-grey);
  margin: 0 0 40px 0;
  line-height: 1.6;
}

.info-box {
  background: #f9fafb;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 40px;
  text-align: left;
}

.info-box h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--navy);
  margin: 0 0 24px 0;
  text-align: center;
}

.next-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.next-steps li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.step-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--main-color) 0%, var(--dark-pink) 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.step-text {
  flex: 1;
  padding-top: 6px;
  font-size: 15px;
  color: var(--navy);
  line-height: 1.5;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-primary,
.btn-secondary {
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--main-color) 0%, var(--dark-pink) 100%);
  color: white;
  box-shadow: 0 4px 16px rgba(247, 168, 208, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(247, 168, 208, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--navy);
  border: 2px solid #e5e5e5;
}

.btn-secondary:hover {
  border-color: var(--main-color);
  color: var(--main-color);
}

@media (max-width: 768px) {
  .order-summary-page {
    padding: 40px 0;
  }

  .success-card {
    padding: 40px 24px;
  }

  .success-title {
    font-size: 26px;
  }

  .info-box {
    padding: 24px;
  }

  .next-steps li {
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .success-title {
    font-size: 24px;
  }

  .success-subtitle {
    font-size: 14px;
  }

  .info-box h3 {
    font-size: 18px;
  }

  .step-text {
    font-size: 14px;
  }
}
</style>
