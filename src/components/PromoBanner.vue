<script setup>
import ButtonComponent from "./common/ButtonComponent.vue";
</script>

<template>
  <div
    class="promo-banner d-flex justify-content-between align-items-center p-4 text-white"
  >
    <span
      class="fw-bold"
      style="font-size: 22px"
      >Poczuj przyszłość jazdy z Voltura.</span
    >

    <ButtonComponent
      title="Umów się na jazdę próbną"
      width="256px"
      background-color="#fff"
      color="var(--main-color)"
      class="me-2"
      font-size="var(--fs-s)"
    />
  </div>
</template>

<style scoped>
.promo-banner {
  background: var(--main-color);
  border-radius: var(--border-radius);
  height: 120px;
}
</style>
