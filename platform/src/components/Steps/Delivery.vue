<script setup>
import { ref, watch } from "vue";
import ButtonComponent from "../common/ButtonComponent.vue";
import { useSummary } from "../../composables/useSummary";
import { useOrder } from "../../composables/order";
import { useAuth } from "../../composables/auth";
import { ElMessage } from "element-plus";

const emits = defineEmits(["deliverySelected", "showLoginModal"]);

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

// Watch delivery method and update summary in real-time
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

// Watch verification method and update summary in real-time
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
  
  // Check if user is authenticated
  if (!isAuthenticated()) {
    ElMessage({
      message: "Musisz być zalogowany, aby złożyć zamówienie",
      type: "warning",
      duration: 3000,
    });
    // Emit event to parent to show login modal
    emits("showLoginModal");
    return;
  }

  // Validate that we have all required data
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

  const deliveryPrice = selectedDelivery?.price || 0;
  const verificationPrice = selectedVerification?.price || 0;
  const carPrice = selectedCar.value.price || 0;
  
  const addonsTotal = selectedCar.value.addons?.reduce((sum, addon) => sum + (addon.price || 0), 0) || 0;
  
  const totalPrice = carPrice + deliveryPrice + verificationPrice;

  const orderData = {
    car_id: selectedCar.value.car_id,
    car_name: selectedCar.value.name,
    car_version: selectedCar.value.version,
    color_id: selectedCar.value.color_id,
    color_name: selectedCar.value.color,
    car_price: carPrice,
    addons: selectedCar.value.addons || [],
    addons_total: addonsTotal,
    
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
        duration: 3000,
      });
      
      emits("deliverySelected", {
        delivery: selectedDelivery,
        verification: selectedVerification,
        order: result,
      });
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
    <p style="font-size: var(--fs-xxl); font-weight: 600">
      Dostawa umowy i płatność
    </p>
    <p style="font-size: var(--fs-l); font-weight: 600">Potwierdź dane</p>
    <span style="font-size: var(--fs-base)"
      >Wybierz, jak chcesz potwierdzić swoje dane. Możesz dokonać weryfikacji
      online lub u kuriera. Wybierz sposób weryfikacji i wysłania umowy.
    </span>
    <div class="verification-row">
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
        <div class="verification-left">
          <div class="verification-label">{{ v.label }}</div>
          <div class="verification-price">{{ v.displayPrice }}</div>
          <div class="verification-description">
            {{ v.description }}
          </div>
        </div>
      </div>
    </div>
    <p style="font-size: var(--fs-l); font-weight: 600; margin-top: 24px;"
      >Wybierz sposób dostawy umowy</p
    >
    <div class="delivery-cards">
      <div
        v-for="opt in shownDeliveryOptions()"
        :key="opt.id"
        class="delivery-card"
        :class="{ selected: deliveryMethod === opt.id }"
        @click="selectMethod(opt.id)"
        role="button"
        tabindex="0"
        @keyup.enter="selectMethod(opt.id)"
      >
        <div class="delivery-left">
          <div class="delivery-icon">
            <span v-if="opt.icon === 'box'">📦</span>
            <span v-else-if="opt.icon === 'truck'">🚚</span>
            <span v-else>✉️</span>
          </div>
          <div class="delivery-meta">
            <div class="delivery-label">{{ opt.label }}</div>
            <div class="delivery-eta">{{ opt.eta }}</div>
          </div>
        </div>
        <div class="delivery-price">{{ opt.displayPrice }}</div>
      </div>
    </div>

    <div style="margin-top: 16px">
      <ButtonComponent
        :title="isLoading ? 'Przetwarzanie...' : 'Przejdź do płatności'"
        @handle-click="submit"
        :disabled="isLoading"
      />
    </div>
  </div>
</template>

<style scoped>
.verification-row {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}
.verification-card {
  padding: 14px 18px;
  border: 1px solid var(--grey);
  border-radius: var(--border-radius);
  cursor: pointer;
  min-width: 0;
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.verification-card.selected {
  border: 2px solid var(--dark-pink);
  box-shadow: 0 4px 12px 3px var(--pink);
}
.verification-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.verification-label {
  font-weight: 600;
  color: var(--navy);
}
.verification-price {
  font-size: 13px;
  color: var(--dark-grey);
}

.delivery-cards {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-direction: column;
}
.delivery-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px;
  border: 1px solid var(--grey);
  border-radius: var(--border-radius);
  cursor: pointer;
  min-width: 240px;
  background: #fff;
}
.delivery-card.selected {
  border: 2px solid var(--dark-pink);
  box-shadow: 0 4px 12px 3px var(--pink);
}
.delivery-left {
  display: flex;
  gap: 12px;
  align-items: center;
}
.delivery-icon {
  font-size: 24px;
}
.delivery-meta {
  display: flex;
  flex-direction: column;
}
.delivery-label {
  font-weight: 700;
  color: var(--navy);
}
.delivery-eta {
  font-size: 13px;
  color: var(--dark-grey);
}
.delivery-price {
  font-weight: 700;
  color: var(--main-color);
}

@media (max-width: 1024px) {
  .delivery-cards,
  .verification-row {
    flex-direction: column;
  }
  .delivery-card,
  .verification-card {
    width: 100%;
    min-width: auto;
  }
}
</style>
