<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '../composables/auth';
import { ShoppingCart, Calendar, TrendCharts } from '@element-plus/icons-vue';
import axios from 'axios';

const { getToken } = useAuth();
const orders = ref([]);
const loading = ref(true);

const fetchOrders = async () => {
  try {
    loading.value = true;
    const token = getToken();
    const response = await axios.get('http://127.0.0.1:8000/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    orders.value = response.data.orders || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
  } finally {
    loading.value = false;
  }
};

const formatPrice = (price) => {
  return Number(price || 0).toLocaleString('pl-PL');
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Oczekuje',
    processing: 'W realizacji',
    completed: 'Zrealizowane',
    cancelled: 'Anulowane'
  };
  return labels[status] || status;
};

const getStatusClass = (status) => {
  const classes = {
    pending: 'status-pending',
    processing: 'status-processing',
    completed: 'status-completed',
    cancelled: 'status-cancelled'
  };
  return classes[status] || 'status-pending';
};

onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <main class="orders-page">
    <div class="container">
      <div class="page-header">
        <div class="header-content">
          <el-icon :size="32" color="var(--main-color)">
            <ShoppingCart />
          </el-icon>
          <div>
            <h1 class="page-title">Twoje zamówienia</h1>
            <p class="page-subtitle">Przeglądaj historię swoich zakupów</p>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <el-icon class="is-loading" :size="48" color="var(--main-color)">
          <TrendCharts />
        </el-icon>
        <p>Ładowanie zamówień...</p>
      </div>

      <div v-else-if="orders.length === 0" class="empty-state">
        <el-icon :size="64" color="var(--grey)">
          <ShoppingCart />
        </el-icon>
        <h3>Brak zamówień</h3>
        <p>Nie masz jeszcze żadnych zamówień</p>
        <router-link to="/" class="cta-button">
          Przejdź do sklepu
        </router-link>
      </div>

      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <div class="order-header">
            <div class="order-number">
              <span class="label">Zamówienie #{{ order.id }}</span>
              <span :class="['status-badge', getStatusClass(order.status)]">
                {{ getStatusLabel(order.status) }}
              </span>
            </div>
            <div class="order-date">
              <el-icon :size="16">
                <Calendar />
              </el-icon>
              <span>{{ formatDate(order.created_at) }}</span>
            </div>
          </div>

          <div class="order-body">
            <div class="order-section">
              <h4 class="section-title">Samochód</h4>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Model</span>
                  <span class="info-value">{{ order.car_name }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Wersja</span>
                  <span class="info-value">{{ order.car_version }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Kolor</span>
                  <span class="info-value">{{ order.color_name }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Cena pojazdu</span>
                  <span class="info-value price">{{ formatPrice(order.car_price) }} zł</span>
                </div>
              </div>

              <div v-if="order.additionals && order.additionals.length > 0" class="addons-list">
                <span class="addons-label">Dodatki:</span>
                <div class="addon-tags">
                  <span v-for="addon in order.additionals" :key="addon.id" class="addon-tag">
                    {{ addon.title }}
                  </span>
                </div>
              </div>
            </div>

            <div class="order-section">
              <h4 class="section-title">Dostawa i weryfikacja</h4>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Dostawa</span>
                  <span class="info-value">{{ order.delivery_method_label }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Weryfikacja</span>
                  <span class="info-value">{{ order.verification_method === 'online' ? 'Online' : 'U kuriera' }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="order-footer">
            <div class="total-section">
              <span class="total-label">Całkowita kwota</span>
              <span class="total-value">{{ formatPrice(order.total_price) }} zł</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.orders-page {
  min-height: calc(100vh - 200px);
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 40px 0 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  margin-bottom: 40px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--navy);
  margin: 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--dark-grey);
  margin: 4px 0 0 0;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  gap: 16px;
}

.empty-state h3 {
  font-size: 24px;
  font-weight: 700;
  color: var(--navy);
  margin: 16px 0 8px;
}

.empty-state p {
  font-size: 16px;
  color: var(--dark-grey);
  margin: 0 0 24px;
}

.cta-button {
  display: inline-block;
  padding: 12px 32px;
  background: var(--main-color);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: var(--dark-pink);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(255, 105, 180, 0.3);
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.order-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e5e5;
  transition: all 0.3s ease;
}


.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-bottom: 1px solid #e5e5e5;
}

.order-number {
  display: flex;
  align-items: center;
  gap: 12px;
}

.order-number .label {
  font-size: 18px;
  font-weight: 700;
  color: var(--navy);
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-processing {
  background: #cfe2ff;
  color: #084298;
}

.status-completed {
  background: #d1e7dd;
  color: #0f5132;
}

.status-cancelled {
  background: #f8d7da;
  color: #842029;
}

.order-date {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--dark-grey);
}

.order-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.order-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--navy);
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #e5e5e5;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 13px;
  color: var(--dark-grey);
  font-weight: 500;
}

.info-value {
  font-size: 15px;
  color: var(--navy);
  font-weight: 600;
}

.info-value.price {
  color: var(--main-color);
  font-size: 16px;
}

.addons-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.addons-label {
  font-size: 13px;
  color: var(--dark-grey);
  font-weight: 600;
}

.addon-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.addon-tag {
  padding: 6px 12px;
  border: 1px solid var(--main-color);
  color: var(--main-color);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
}

.order-footer {
  padding: 20px 24px;
  background: var(--navy);
  border-top: 1px solid #e5e5e5;
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: 16px;
  color: white;
  font-weight: 600;
}

.total-value {
  font-size: 28px;
  color: white;
  font-weight: 800;
  letter-spacing: -0.5px;
}

@media (max-width: 768px) {
  .orders-page {
    padding: 24px 0 60px;
  }

  .page-title {
    font-size: 24px;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .total-value {
    font-size: 24px;
  }
}
</style>
