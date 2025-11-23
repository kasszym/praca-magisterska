<script setup>
import Summary from "./Summary.vue";
import Delivery from "./Delivery.vue";
import Card from "../common/SectionCard.vue";

const emit = defineEmits(["showLoginModal"]);

const handleShowLoginModal = () => {
  emit("showLoginModal");
};
</script>

<template>
  <div class="step-three-container">
    <Delivery @showLoginModal="handleShowLoginModal" />

    <Card class="step-three-summary">
      <template #content>
        <Summary />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.step-three-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  align-items: start;
}

.step-three-summary {
  min-width: 0;
  position: sticky;
  top: 1.5rem;
  align-self: start;
}

@media (max-width: 1024px) {
  .step-three-container {
    grid-template-columns: 1fr;
  }

  .step-three-summary {
    order: -1;
    position: static;
    top: auto;
  }
}
</style>
