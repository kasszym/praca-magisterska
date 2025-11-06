<script setup>
import ButtonComponent from "./common/ButtonComponent.vue";
</script>

<template>
  <div
    class="promo-banner d-flex flex-column flex-sm-row justify-content-between align-items-center text-white gap-3 gap-sm-0 p-4"
  >
    <span
      class="fw-bold text-center text-sm-start"
      style="font-size: 22px;"
    >
      Poczuj przyszłość jazdy z Voltura.
    </span>

    <ButtonComponent
      title="Umów się na jazdę próbną"
      width="256px"
      background-color="#fff"
      color="var(--main-color)"
      class="me-0 me-sm-2"
      font-size="var(--fs-s)"
    />
  </div>
</template>

<style scoped>
.promo-banner {
  background: var(--main-color);
  border-radius: var(--border-radius);
  height: auto; 
  min-height: 120px;
}
</style>
