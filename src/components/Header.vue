<script setup>
import ButtonComponent from "./common/ButtonComponent.vue";
import TheSeparator from "./common/TheSeparator.vue";
</script>
<template>
  <header class="bg-white">
    <div class="container-fluid px-3">
      <div
        class="d-flex align-items-center justify-content-between mx-auto gap-3"
        style="max-width: var(--app-width); height: 72px"
      >
        <div class="d-flex align-items-center">
          <img
            src="../assets/logo-vetura.png"
            alt="Voltura Motors logo"
            height="41"
          />
          <span
            class="ms-2 fw-bold"
            style="font-size: var(--fs-l); color: var(--navy)"
          >
            Voltura Motors
          </span>
        </div>
        <ButtonComponent
          width="189px"
          title="Zaplanuj jazdę testową"
          background-color="var(--green)"
          background-color-hover="var(--dark-green)"
        />
      </div>
    </div>

    <TheSeparator />
  </header>
</template>
