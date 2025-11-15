<script setup>
import Card from "../common/SectionCard.vue";
import Summary from "./Summary.vue";
import MainForm from "./MainForm.vue";
</script>

<template>
  <div class="step-two-container">
    <Card>
      <template #content>
        <MainForm />
      </template>
    </Card>
    <Card class="step-two-summary">
      <template #content>
        <Summary />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.step-two-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  align-items: start;
}

.step-two-summary {
  min-width: 0;
  position: sticky;
  top: 1.5rem;
  align-self: start;
}

@media (max-width: 1024px) {
  .step-two-container {
    grid-template-columns: 1fr;
  }

  .step-two-summary {
    order: -1;
    position: static;
    top: auto;
  }
}

</style>
