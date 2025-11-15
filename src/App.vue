<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import StepOne from "./components/Steps/StepOne.vue";
import StepTwo from "./components/Steps/StepTwo.vue";
import StepThree from "./components/Steps/StepThree.vue";
import Steps from "./components/Steps/Steps.vue";
import Footer from "./components/Footer.vue";

const activeStep = ref(1);

const handleStepUpdate = (stepId) => {
  activeStep.value = stepId;
};
const tabs = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
};
</script>

<template>
  <div>
    <Header />
    <main
      class="container-fluid px-3"
      style="margin: 32px auto 18px auto"
    >
      <div class="app-container mx-auto d-flex flex-column gap-4 gap-md-5">
        <Steps
          :active="activeStep"
          @update="handleStepUpdate"
        >
          <template #default> <component :is="tabs[activeStep]" /></template>
        </Steps>
      </div>
    </main>
    <Footer />
  </div>
</template>
<style scoped>
.app-container {
  max-width: var(--app-width) !important;
  width: 100%;
}
</style>
