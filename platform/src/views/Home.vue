<script setup>
import { ref } from "vue";
import StepOne from "../components/Steps/StepOne.vue";
import StepTwo from "../components/Steps/StepTwo.vue";
import StepThree from "../components/Steps/StepThree.vue";
import Steps from "../components/Steps/Steps.vue";

const activeStep = ref(1);

const handleStepUpdate = (stepId) => {
  activeStep.value = stepId;
};

const handleShowLoginModal = () => {
  emit('showLoginModal');
};

const emit = defineEmits(['showLoginModal']);

const tabs = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
};
</script>

<template>
  <main class="container-fluid px-3" style="margin: 32px auto 18px auto">
    <Steps :active="activeStep" @update="handleStepUpdate">
      <template #default>
        <component :is="tabs[activeStep]" @showLoginModal="handleShowLoginModal" />
      </template>
    </Steps>
  </main>
</template>
