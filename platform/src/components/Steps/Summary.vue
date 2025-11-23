<script setup>
import { useSummary } from "../../composables/useSummary";
import { computed } from "vue";
import { ShoppingCart, Van, Lock, CircleCheck } from '@element-plus/icons-vue';

const { selectedCar, formatPrice, deliveryInfo, verificationInfo } = useSummary();

const totalPrice = computed(() => {
  if (!selectedCar.value) return 0;
  
  let total = selectedCar.value.price || 0;
  
  if (deliveryInfo.value?.price) {
    total += deliveryInfo.value.price;
  }
  
  if (verificationInfo.value?.price) {
    total += verificationInfo.value.price;
  }
  
  return total;
});
</script>

<template>
  <div class="summary-container">
    <div class="summary-header">
      <el-icon :size="24" color="var(--main-color)">
        <ShoppingCart />
      </el-icon>
      <h3 class="summary-title">Podsumowanie zamówienia</h3>
    </div>
    
    <div v-if="selectedCar" class="summary-content">
      <div class="summary-card">
        <div class="card-icon">
          <el-icon :size="20" color="var(--main-color)">
            <CircleCheck />
          </el-icon>
        </div>
        <div class="card-content">
          <h4 class="card-title">Wybrany samochód</h4>
          
          <div class="info-row">
            <span class="info-label">Model</span>
            <span class="info-value">{{ selectedCar.name }}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Wersja</span>
            <span class="info-value">{{ selectedCar.version }}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Kolor</span>
            <span class="info-value">{{ selectedCar.color }}</span>
          </div>
          
          <div class="info-row price-row">
            <span class="info-label">Cena pojazdu</span>
            <span class="info-price">{{ formatPrice(selectedCar.price) }} zł</span>
          </div>
          
          <div v-if="selectedCar.addons && selectedCar.addons.length > 0" class="addons-section">
            <div class="addons-header">Dodatki:</div>
            <div v-for="(addon, index) in selectedCar.addons" :key="index" class="addon-item">
              <span class="addon-name">{{ addon.title }}</span>
              <span class="addon-price">+{{ formatPrice(addon.price) }} zł</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="deliveryInfo" class="summary-card">
        <div class="card-icon">
          <el-icon :size="20" color="var(--main-color)">
            <Van />
          </el-icon>
        </div>
        <div class="card-content">
          <h4 class="card-title">Dostawa</h4>
          
          <div class="info-row">
            <span class="info-label">Sposób</span>
            <span class="info-value">{{ deliveryInfo.label }}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Czas dostawy</span>
            <span class="info-value">{{ deliveryInfo.eta }}</span>
          </div>
          
          <div class="info-row price-row">
            <span class="info-label">Koszt</span>
            <span class="info-price">{{ formatPrice(deliveryInfo.price) }} zł</span>
          </div>
        </div>
      </div>

      <div v-if="verificationInfo" class="summary-card">
        <div class="card-icon">
          <el-icon :size="20" color="var(--main-color)">
            <Lock />
          </el-icon>
        </div>
        <div class="card-content">
          <h4 class="card-title">Weryfikacja</h4>
          
          <div class="info-row">
            <span class="info-label">Sposób</span>
            <span class="info-value">{{ verificationInfo.label }}</span>
          </div>
          
          <div class="info-row price-row">
            <span class="info-label">Koszt</span>
            <span class="info-price">{{ formatPrice(verificationInfo.price) }} zł</span>
          </div>
        </div>
      </div>

      <div class="total-section">
        <div class="total-row">
          <span class="total-label">Cena całkowita</span>
          <span class="total-value">{{ formatPrice(totalPrice) }} zł</span>
        </div>
      </div>
    </div>

    <div v-else class="summary-empty">
      <el-icon :size="48" color="var(--grey)">
        <ShoppingCart />
      </el-icon>
      <p>Wybierz samochód, aby zobaczyć podsumowanie</p>
    </div>
  </div>
</template>

<style scoped>

.summary-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e5e5;
}

.summary-title {
  font-size: 20px;
  color: var(--navy);
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.3px;
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e5e5;
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;
}

.summary-card:not(:last-of-type)::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 20px;
  right: 20px;
  height: 1px;
  background: linear-gradient(to right, transparent, #e5e5e5 20%, #e5e5e5 80%, transparent);
}

.summary-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  opacity: 0.3;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  font-size: 16px;
  color: var(--navy);
  font-weight: 700;
  margin: 0 0 12px 0;
  padding-bottom: 0;
}

/* Info Rows */
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
}

.info-label {
  font-size: 13px;
  color: var(--dark-grey);
  font-weight: 500;
}

.info-value {
  font-size: 14px;
  color: var(--navy);
  font-weight: 600;
  text-align: right;
}

.price-row {
  margin-top: 4px;
  padding-top: 0;
}

.info-price {
  font-size: 15px;
  color: var(--main-color);
  font-weight: 700;
}

.addons-section {
  margin-top: 8px;
  padding-top: 0;
}

.addons-header {
  font-size: 13px;
  color: var(--dark-grey);
  font-weight: 600;
  margin-bottom: 8px;
}

.addon-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 6px;
}

.addon-item:last-child {
  margin-bottom: 0;
}

.addon-name {
  font-size: 13px;
  color: var(--navy);
  font-weight: 500;
}

.addon-price {
  font-size: 13px;
  color: var(--main-color);
  font-weight: 700;
  white-space: nowrap;
}

.total-section {
  background: white;
  border: 2px solid var(--navy);
  border-radius: 12px;
  padding: 20px;
  margin-top: 8px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.total-label {
  font-size: 15px;
  color: var(--navy);
  font-weight: 700;
}

.total-value {
  font-size: 24px;
  color: var(--main-color);
  font-weight: 800;
  letter-spacing: -0.5px;
}

.summary-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  color: var(--dark-grey);
  gap: 16px;
}

.summary-empty p {
  font-size: 14px;
  margin: 0;
  color: var(--dark-grey);
}

@media (max-width: 768px) {
  .summary-container {
    position: relative;
    top: 0;
    margin-top: 24px;
  }
  
  .summary-card {
    padding: 16px;
  }
  
  .total-section {
    padding: 16px;
  }
  
  .total-value {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .summary-container {
    padding: 16px;
  }
  
  .summary-header {
    margin-bottom: 16px;
  }
  
  .summary-title {
    font-size: 18px;
  }
  
  .card-title {
    font-size: 15px;
  }
  
  .info-label,
  .info-value {
    font-size: 12px;
  }
}
</style>
