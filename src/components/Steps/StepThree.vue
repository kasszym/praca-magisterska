<script setup>
import Summary from "./Summary.vue";
import Card from "../common/SectionCard.vue";
</script>

<template>
  <div class="step-three-container">
    <Card>
      <template #content>
        <div class="step-three-content">
          <div class="step-three-placeholder">
            <h3>Step Three Content</h3>
            <p>Content for step three will go here</p>
          </div>
        </div>
      </template>
    </Card>

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

.step-three-placeholder {
  padding: 24px;
  background: white;
  border-radius: var(--border-radius);
}

.step-three-placeholder h3 {
  font-size: var(--fs-xl);
  color: var(--navy);
  margin-bottom: 16px;
}

.step-three-placeholder p {
  color: var(--dark-grey);
  font-size: var(--fs-s);
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
