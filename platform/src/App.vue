<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import StepOne from "./components/Steps/StepOne.vue";
import StepTwo from "./components/Steps/StepTwo.vue";
import StepThree from "./components/Steps/StepThree.vue";
import Steps from "./components/Steps/Steps.vue";
import Footer from "./components/Footer.vue";

const activeStep = ref(1);
const headerRef = ref(null);

const handleStepUpdate = (stepId) => {
  activeStep.value = stepId;
};

const handleShowLoginModal = () => {
  // Trigger Header's modal
  if (headerRef.value) {
    headerRef.value.openLoginModal();
  }
};

const tabs = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
};
</script>

<template>
  <div>
    <Header ref="headerRef" />
    <main
      class="container-fluid px-3"
      style="margin: 32px auto 18px auto"
    >
      <Steps
        :active="activeStep"
        @update="handleStepUpdate"
      >
        <template #default>
          <component 
            :is="tabs[activeStep]" 
            @showLoginModal="handleShowLoginModal"
          />
        </template>
      </Steps>
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
