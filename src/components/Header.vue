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
          <svg
            width="41"
            height="41"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Aureon Motors car icon"
            title="Aureon Motors"
          >
            <path
              d="M3 13l1.5-4A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.2L21 13v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5z"
              fill="currentColor"
            />
            <circle
              cx="7.5"
              cy="15.5"
              r="1.5"
              fill="currentColor"
            />
            <circle
              cx="16.5"
              cy="15.5"
              r="1.5"
              fill="currentColor"
            />
          </svg>
          <span
            class="ms-2 fw-bold"
            style="font-size: var(--fs-l); color: var(--navy)"
          >
            Aureon Motors
          </span>
        </div>
        <ButtonComponent
          width="189px"
          title="Zaplanuj jazdę testową"
          background-color="var(--pink)"
          background-color-hover="var(--dark-pink)"
        />
      </div>
    </div>

    <TheSeparator />
  </header>
</template>
