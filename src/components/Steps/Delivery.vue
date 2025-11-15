<script setup>
import { ref } from "vue";
import ButtonComponent from "../common/ButtonComponent.vue";

const emits = defineEmits(["deliverySelected"]);

const deliveryMethod = ref("inpost");

const deliveryOptions = [
  {
    id: "inpost",
    label: "Inpost",
    eta: "1-2 dni robocze",
    price: "12,99 zł",
    icon: "box",
  },
  {
    id: "fedex",
    label: "Kurier FedEx",
    eta: "1-2 dni robocze",
    price: "19,99 zł",
    icon: "truck",
  },
  {
    id: "poczta",
    label: "Poczta Polska",
    eta: "2-5 dni robocze",
    price: "9,99 zł",
    icon: "mail",
  },
];

const selectMethod = (id) => {
  deliveryMethod.value = id;
};

const submit = () => {
  if (!deliveryMethod.value) {
    alert("Wybierz metodę dostawy");
    return;
  }
  emits("deliverySelected", deliveryMethod.value);
};
const previousDelivery = ref(deliveryMethod.value);

const verificationMethod = ref("online"); 
const verificationOptions = [
  { id: "online", label: "Weryfikacja online", price: "0 zł" },
  { id: "courier", label: "Weryfikacja u kuriera", price: "20 zł" },
];

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
    <h3>Dostawa umowy i płatność</h3>
    <span
      >Wybierz, jak chcesz potwierdzić swoje dane. Możesz dokonać weryfikacji
      online lub u kuriera. Wybierz sposób weryfikacji i wysłania umowy.
    </span>
    <div>
      here
    </div>
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
          <div class="verification-price">{{ v.price }}</div>
        </div>
      </div>
    </div>

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
        <div class="delivery-price">{{ opt.price }}</div>
      </div>
    </div>

    <div style="margin-top: 16px">
      <ButtonComponent
        title="Przejdź do płatności"
        @handle-click="submit"
      />
    </div>
  </div>
</template>

<style scoped>
.verification-row {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}
.verification-card {
  padding: 12px;
  border: 1px solid var(--grey);
  border-radius: 8px;
  cursor: pointer;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.verification-card.selected {
  border-color: var(--main-color);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}
.verification-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.verification-label {
  font-weight: 600;
}
.verification-price {
  font-size: 12px;
  color: var(--dark-grey);
}

.delivery-cards {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}
.delivery-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--grey);
  border-radius: 8px;
  cursor: pointer;
  min-width: 200px;
}
.delivery-card.selected {
  border-color: var(--main-color);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
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
  font-weight: 600;
}
.delivery-eta {
  font-size: 12px;
  color: var(--dark-grey);
}
.delivery-price {
  font-weight: 700;
  color: var(--navy);
}

@media (max-width: 768px) {
  .delivery-cards {
    flex-direction: column;
  }
  .verification-row {
    flex-direction: column;
  }
}
</style>
