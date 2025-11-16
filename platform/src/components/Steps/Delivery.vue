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
  {
    id: "online",
    label: "Weryfikacja online",
    price: "0 zł",
    description: "Potwierdź swoją tożsamość za pomocą przelewu bankowego.",
  },
  {
    id: "courier",
    label: "Weryfikacja u kuriera",
    price: "20 zł",
    description:
      "Zamów kuriera, który przywiezie umowę do podpisu oraz potwierdzi Twoją tożsamość.",
  },
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
          <div class="verification-price">{{ v.price }}</div>
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
