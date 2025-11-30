<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import ButtonComponent from "../common/ButtonComponent.vue";
import { useSummary } from "../../composables/useSummary";
import { useOrder } from "../../composables/order";
import { useAuth } from "../../composables/auth";
import { ElMessage } from "element-plus";
import { Lock, Van, Box, Message, ShoppingCart } from '@element-plus/icons-vue';

const emits = defineEmits(["deliverySelected", "showLoginModal"]);
const router = useRouter();

const { selectedCar, personalData, setDeliveryInfo, setVerificationInfo } = useSummary();
const { createOrder, isLoading } = useOrder();
const { isAuthenticated } = useAuth();

const deliveryMethod = ref("inpost");

const deliveryOptions = [
  {
    id: "inpost",
    label: "Inpost",
    eta: "1-2 dni robocze",
    price: 12.99,
    displayPrice: "12,99 zł",
    icon: "box",
  },
  {
    id: "fedex",
    label: "Kurier FedEx",
    eta: "1-2 dni robocze",
    price: 19.99,
    displayPrice: "19,99 zł",
    icon: "truck",
  },
  {
    id: "poczta",
    label: "Poczta Polska",
    eta: "2-5 dni robocze",
    price: 9.99,
    displayPrice: "9,99 zł",
    icon: "mail",
  },
];

const selectMethod = (id) => {
  deliveryMethod.value = id;
};

const verificationMethod = ref("online");
const verificationOptions = [
  {
    id: "online",
    label: "Weryfikacja online",
    price: 0,
    displayPrice: "0 zł",
    description: "Potwierdź swoją tożsamość za pomocą przelewu bankowego.",
  },
  {
    id: "courier",
    label: "Weryfikacja u kuriera",
    price: 20,
    displayPrice: "20 zł",
    description:
      "Zamów kuriera, który przywiezie umowę do podpisu oraz potwierdzi Twoją tożsamość.",
  },
];

watch(deliveryMethod, (newMethod) => {
  const selectedDelivery = deliveryOptions.find(opt => opt.id === newMethod);
  if (selectedDelivery) {
    setDeliveryInfo({
      method: selectedDelivery.id,
      label: selectedDelivery.label,
      eta: selectedDelivery.eta,
      price: selectedDelivery.price,
    });
  }
}, { immediate: true });

watch(verificationMethod, (newMethod) => {
  const selectedVerification = verificationOptions.find(opt => opt.id === newMethod);
  if (selectedVerification) {
    setVerificationInfo({
      method: selectedVerification.id,
      label: selectedVerification.label,
      price: selectedVerification.price,
    });
  }
}, { immediate: true });

const submit = async () => {
  if (!deliveryMethod.value) {
    ElMessage({
      message: "Wybierz metodę dostawy",
      type: "warning",
    });
    return;
  }

  if (!isAuthenticated()) {
    ElMessage({
      message: "Musisz być zalogowany, aby złożyć zamówienie",
      type: "warning",
      duration: 3000,
    });
    emits("showLoginModal");
    return;
  }

  if (!selectedCar.value) {
    ElMessage({
      message: "Wybierz samochód przed złożeniem zamówienia",
      type: "warning",
    });
    return;
  }

  if (!personalData.value) {
    ElMessage({
      message: "Uzupełnij dane osobowe przed złożeniem zamówienia",
      type: "warning",
    });
    return;
  }

  const selectedDelivery = deliveryOptions.find(opt => opt.id === deliveryMethod.value);
  const selectedVerification = verificationOptions.find(opt => opt.id === verificationMethod.value);

  const deliveryPrice = Number(selectedDelivery?.price) || 0;
  const verificationPrice = Number(selectedVerification?.price) || 0;
  const carPrice = Number(selectedCar.value.price) || 0;
  
  const addonsTotal = Number(selectedCar.value.addons?.reduce((sum, addon) => sum + (Number(addon.price) || 0), 0)) || 0;
  
  const totalPrice = Number(carPrice + deliveryPrice + verificationPrice);

  const orderData = {
    car_id: selectedCar.value.car_id,
    car_name: selectedCar.value.name,
    car_version: selectedCar.value.version,
    color_id: selectedCar.value.color_id,
    color_name: selectedCar.value.color,
    car_price: Number(carPrice),
    addons: selectedCar.value.addons || [],
    addons_total: Number(addonsTotal),
    
    first_name: personalData.value.firstName,
    last_name: personalData.value.lastName,
    pesel: personalData.value.pesel,
    email: personalData.value.email,
    phone: personalData.value.phone,
    
    street: personalData.value.street,
    house_number: personalData.value.houseNumber,
    apartment_number: personalData.value.apartmentNumber || null,
    post_code: personalData.value.postCode,
    city: personalData.value.city,
    

    invoice_email: personalData.value.invoiceEmailOption === 'different' 
      ? personalData.value.invoiceEmail 
      : personalData.value.email,
    
    correspondence_street: personalData.value.correspondenceAddressOption === 'different' 
      ? personalData.value.correspondenceStreet 
      : null,
    correspondence_house_number: personalData.value.correspondenceAddressOption === 'different' 
      ? personalData.value.correspondenceHouseNumber 
      : null,
    correspondence_apartment_number: personalData.value.correspondenceAddressOption === 'different' 
      ? (personalData.value.correspondenceApartmentNumber || null) 
      : null,
    correspondence_post_code: personalData.value.correspondenceAddressOption === 'different' 
      ? personalData.value.correspondencePostCode 
      : null,
    correspondence_city: personalData.value.correspondenceAddressOption === 'different' 
      ? personalData.value.correspondenceCity 
      : null,
    
    delivery_method: deliveryMethod.value,
    delivery_method_label: selectedDelivery?.label,
    delivery_eta: selectedDelivery?.eta,
    delivery_price: deliveryPrice,
    verification_method: verificationMethod.value,
    verification_price: verificationPrice,
    
    total_price: totalPrice,
  };

  try {
    const result = await createOrder(orderData);
    
    if (result) {
      ElMessage({
        message: "Zamówienie zostało złożone pomyślnie!",
        type: "success",
        duration: 2000,
      });
      
      // Navigate to order summary page
      setTimeout(() => {
        router.push('/order-summary');
      }, 1000);
    }
  } catch (error) {
    ElMessage({
      message: error.message || "Wystąpił błąd podczas składania zamówienia",
      type: "error",
      duration: 3000,
    });
  }
};

const previousDelivery = ref(deliveryMethod.value);

const shownDeliveryOptions = () => {
  return verificationMethod.value === "courier"
    ? deliveryOptions.filter((o) => o.id === "fedex")
    : deliveryOptions;
};

const selectVerification = (id) => {
  verificationMethod.value = id;
  if (id === "courier") {
    previousDelivery.value = deliveryMethod.value;
    deliveryMethod.value = "fedex";
  } else {
    deliveryMethod.value = previousDelivery.value || "inpost";
  }
};
</script>

<template>
  <div class="Delivery">
    <div class="delivery-header">
      <h1 class="delivery-title">Dostawa umowy i płatność</h1>
      <p class="delivery-subtitle">Finalizuj swoje zamówienie</p>
    </div>

    <!-- Verification Section -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">
          <el-icon :size="32" color="var(--main-color)">
            <Lock />
          </el-icon>
        </div>
        <div>
          <h2 class="section-title">Weryfikacja tożsamości</h2>
          <p class="section-description">
            Wybierz preferowany sposób potwierdzenia tożsamości
          </p>
        </div>
      </div>

      <div class="verification-grid">
        <div
          v-for="v in verificationOptions"
          :key="v.id"
          class="verification-card"
          :class="{ selected: verificationMethod === v.id }"
          @click="selectVerification(v.id)"
          role="button"
          tabindex="0"
          @keyup.enter="selectVerification(v.id)"
        >
          <div class="card-header">
            <div class="card-radio">
              <div class="radio-outer">
                <div v-if="verificationMethod === v.id" class="radio-inner"></div>
              </div>
            </div>
            <div class="card-info">
              <h3 class="card-title">{{ v.label }}</h3>
              <p class="card-price">{{ v.displayPrice }}</p>
            </div>
          </div>
          <p class="card-description">{{ v.description }}</p>
        </div>
      </div>
    </div>

    <!-- Delivery Section -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">
          <el-icon :size="32" color="var(--main-color)">
            <ShoppingCart />
          </el-icon>
        </div>
        <div>
          <h2 class="section-title">Sposób dostawy umowy</h2>
          <p class="section-description">
            Wybierz jak chcesz otrzymać dokumenty
          </p>
        </div>
      </div>

      <div class="delivery-options">
        <div
          v-for="opt in shownDeliveryOptions()"
          :key="opt.id"
          class="delivery-option"
          :class="{ selected: deliveryMethod === opt.id }"
          @click="selectMethod(opt.id)"
          role="button"
          tabindex="0"
          @keyup.enter="selectMethod(opt.id)"
        >
          <div class="option-radio">
            <div class="radio-outer">
              <div v-if="deliveryMethod === opt.id" class="radio-inner"></div>
            </div>
          </div>
          <div class="option-icon">
            <el-icon :size="28">
              <Box v-if="opt.icon === 'box'" />
              <Van v-else-if="opt.icon === 'truck'" />
              <Message v-else />
            </el-icon>
          </div>
          <div class="option-content">
            <h3 class="option-label">{{ opt.label }}</h3>
            <p class="option-eta">{{ opt.eta }}</p>
          </div>
          <div class="option-price">{{ opt.displayPrice }}</div>
        </div>
      </div>
    </div>

    <div class="submit-section">
      <ButtonComponent
        :title="isLoading ? 'Przetwarzanie...' : 'Sfinalizuj zamówienie'"
        @handle-click="submit"
        :disabled="isLoading"
      />
    </div>
  </div>
</template>

<style scoped>
.Delivery {
  max-width: 900px;
  margin: 0 auto;
}

.delivery-header {
  margin-bottom: 48px;
  text-align: left;
}

.delivery-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--navy);
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.delivery-subtitle {
  font-size: 16px;
  color: var(--dark-grey);
  margin: 0;
  font-weight: 400;
}

.section {
  margin-bottom: 40px;
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
}

.section-header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 24px;
}

.section-icon {
  line-height: 1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--navy);
  margin: 0 0 4px 0;
}

.section-description {
  font-size: 14px;
  color: var(--dark-grey);
  margin: 0;
  line-height: 1.5;
}

/* Verification Cards */
.verification-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.verification-card {
  padding: 24px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fafafa;
  position: relative;
  overflow: hidden;
}

.verification-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--main-color);
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.verification-card:hover {
  border-color: var(--main-color);
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.verification-card.selected {
  border-color: var(--main-color);
  background: linear-gradient(135deg, #fff 0%, #fff5f8 100%);
  box-shadow: 0 8px 24px rgba(255, 105, 180, 0.15);
}

.verification-card.selected::before {
  transform: scaleX(1);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.card-radio {
  flex-shrink: 0;
  padding-top: 2px;
}

.radio-outer {
  width: 20px;
  height: 20px;
  border: 2px solid #d0d0d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.verification-card.selected .radio-outer,
.delivery-option.selected .radio-outer {
  border-color: var(--main-color);
  background: var(--main-color);
}

.radio-inner {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--navy);
  margin: 0 0 4px 0;
}

.card-price {
  font-size: 14px;
  font-weight: 600;
  color: var(--main-color);
  margin: 0;
}

.card-description {
  font-size: 14px;
  color: var(--dark-grey);
  line-height: 1.6;
  margin: 0;
  padding-left: 32px;
}

/* Delivery Options */
.delivery-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.delivery-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fafafa;
}

.delivery-option:hover {
  border-color: var(--main-color);
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.delivery-option.selected {
  border-color: var(--main-color);
  background: linear-gradient(135deg, #fff 0%, #fff5f8 100%);
  box-shadow: 0 4px 16px rgba(255, 105, 180, 0.15);
}

.option-radio {
  flex-shrink: 0;
}

.option-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  color: var(--dark-grey);
  transition: all 0.3s ease;
}

.delivery-option.selected .option-icon {
  background: linear-gradient(135deg, var(--pink) 0%, var(--main-color) 100%);
  border-color: var(--main-color);
  color: white;
}

.option-content {
  flex: 1;
}

.option-label {
  font-size: 16px;
  font-weight: 700;
  color: var(--navy);
  margin: 0 0 4px 0;
}

.option-eta {
  font-size: 13px;
  color: var(--dark-grey);
  margin: 0;
}

.option-price {
  font-size: 18px;
  font-weight: 700;
  color: var(--main-color);
  flex-shrink: 0;
}

/* Submit Section */
.submit-section {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 2px solid #f0f0f0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section {
    padding: 24px 20px;
  }

  .delivery-title {
    font-size: 26px;
  }

  .section-title {
    font-size: 20px;
  }

  .verification-grid {
    grid-template-columns: 1fr;
  }

  .delivery-option {
    flex-wrap: wrap;
  }

  .option-icon {
    width: 40px;
    height: 40px;
  }

  .option-icon :deep(.el-icon) {
    font-size: 20px;
  }

  .option-price {
    width: 100%;
    text-align: right;
    margin-top: 8px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
  }
}

@media (max-width: 480px) {
  .delivery-header {
    margin-bottom: 32px;
  }

  .delivery-title {
    font-size: 24px;
  }

  .section {
    padding: 20px 16px;
    margin-bottom: 24px;
  }

  .section-header {
    flex-direction: column;
    gap: 12px;
  }

  .section-icon :deep(.el-icon) {
    font-size: 24px;
  }

  .card-description {
    padding-left: 0;
    margin-top: 8px;
  }
}
</style>
