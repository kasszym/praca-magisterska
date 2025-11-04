<script setup>
import ButtonComponent from "./common/ButtonComponent.vue";
import TheSeparator from "./common/TheSeparator.vue";
</script>
<template>
  <header class="bg-white">
    <div
      class="container-fluid d-flex align-items-center justify-content-between"
      style="max-width: var(--app-width); height: 72px; padding: 0 16px"
    >
      <div class="d-flex align-items-center">
        <img
          src="../assets/logo-vetura.png"
          alt="Voltura Motors logo"
          height="41"
        />
        <span
          class="ms-1 fw-bold"
          style="font-size: var(--fs-l); color: var(--navy)"
        >
          Voltura Motors
        </span>
      </div>

      <ButtonComponent
        width="189px"
        title="Zaplanuj jazdę testową"
        background-color="var(--dark-green)"
      />
    </div>

    <TheSeparator />
  </header>
</template>

<style scoped></style>
