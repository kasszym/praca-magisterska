<script setup>
import { useSummary } from "../../composables/useSummary";
import { computed } from "vue";

const { selectedCar, formatPrice, deliveryInfo, verificationInfo } = useSummary();

const totalPrice = computed(() => {
  if (!selectedCar.value) return 0;
  
  let total = selectedCar.value.price || 0;
  
  // Add delivery price if available
  if (deliveryInfo.value?.price) {
    total += deliveryInfo.value.price;
  }
  
  // Add verification price if available
  if (verificationInfo.value?.price) {
    total += verificationInfo.value.price;
  }
  
  return total;
});
</script>

<template>
  <div class="summary-container">
    <h3 class="summary-title">Podsumowanie</h3>
    
    <div v-if="selectedCar" class="summary-content">
      <div class="summary-section">
        <h4 class="summary-section-title">Wybrany samochód</h4>
        <div class="summary-item">
          <span class="summary-label">Model:</span>
          <span class="summary-value">{{ selectedCar.name }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Wersja:</span>
          <span class="summary-value">{{ selectedCar.version }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Kolor:</span>
          <span class="summary-value">{{ selectedCar.color }}</span>
        </div>
        
        <div v-if="selectedCar.addons && selectedCar.addons.length > 0" class="summary-addons">
          <span class="summary-label">Dodatki:</span>
          <ul class="summary-addons-list">
            <li v-for="(addon, index) in selectedCar.addons" :key="index">
              {{ addon.title }} - {{ formatPrice(addon.price) }} zł
            </li>
          </ul>
        </div>
      </div>

      <!-- Delivery Information Section -->
      <div v-if="deliveryInfo" class="summary-section">
        <h4 class="summary-section-title">Dostawa</h4>
        <div class="summary-item">
          <span class="summary-label">Sposób dostawy:</span>
          <span class="summary-value">{{ deliveryInfo.label }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Czas dostawy:</span>
          <span class="summary-value">{{ deliveryInfo.eta }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Koszt dostawy:</span>
          <span class="summary-value">{{ formatPrice(deliveryInfo.price) }} zł</span>
        </div>
      </div>

      <!-- Verification Information Section -->
      <div v-if="verificationInfo" class="summary-section">
        <h4 class="summary-section-title">Weryfikacja</h4>
        <div class="summary-item">
          <span class="summary-label">Sposób weryfikacji:</span>
          <span class="summary-value">{{ verificationInfo.label }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Koszt weryfikacji:</span>
          <span class="summary-value">{{ formatPrice(verificationInfo.price) }} zł</span>
        </div>
      </div>

      <div class="summary-section summary-price">
        <div class="summary-item">
          <span class="summary-label">Cena całkowita:</span>
          <span class="summary-value summary-price-value">
            {{ formatPrice(totalPrice) }} zł
          </span>
        </div>
      </div>
    </div>

    <div v-else class="summary-empty">
      <p>Brak wybranego samochodu</p>
    </div>
  </div>
</template>

<style scoped>


.summary-title {
  font-size: var(--fs-xl);
  color: var(--navy);
  font-weight: 600;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--grey);
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.summary-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-section-title {
  font-size: var(--fs-l);
  color: var(--navy);
  font-weight: 600;
  margin-bottom: 8px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--grey);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  font-size: var(--fs-s);
  color: var(--dark-grey);
  font-weight: 500;
  flex-shrink: 0;
}

.summary-value {
  font-size: var(--fs-s);
  color: var(--navy);
  font-weight: 600;
  text-align: right;
}

.summary-addons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.summary-addons-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.summary-addons-list li {
  font-size: var(--fs-xs);
  color: var(--navy);
  padding-left: 16px;
  position: relative;
}

.summary-addons-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--dark-grey);
}

.summary-price {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid var(--navy);
}

.summary-price-value {
  font-size: var(--fs-l);
  color: var(--main-color);
}

.summary-empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--dark-grey);
  font-size: var(--fs-s);
}

@media (max-width: 768px) {
  .summary-container {
    position: relative;
    top: 0;
    margin-top: 24px;
  }
}
</style>

