<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  open: { type: Boolean, default: false },
});
const isOpen = ref(props.open);
watch(
  () => props.open,
  (v) => (isOpen.value = v)
);

function toggle() {
  isOpen.value = !isOpen.value;
}

const beforeEnter = (el) => {
  el.style.height = "0";
  el.style.opacity = "0";
};
const enter = (el) => {
  el.style.transition = "all 200ms ease";
  el.style.height = el.scrollHeight + "px";
  el.style.opacity = "1";
};
const afterEnter = (el) => {
  el.style.height = "auto";
};
const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
};
const leave = (el) => {
  void el.offsetHeight;
  el.style.transition = "all 200ms ease";
  el.style.height = "0";
  el.style.opacity = "0";
};
const afterLeave = (el) => {
  el.style.height = "0";
};
</script>

<template>
  <div
    class="rounded-3 transition-surface"
    :class="isOpen ? 'is-open' : 'is-closed'"
  >
    <button
      type="button"
      class="w-100 d-flex justify-content-between align-items-center px-3 py-3 pb-3 rounded-3 border-0 bg-transparent focus-shadow-none gap-3"
      @click="toggle"
    >
      <span
        class="fw-semibold text-start"
        style="font-size: var(--fs-base, 16px)"
      >
        {{ title }}
      </span>
      <span class="flex-shrink-0 d-flex align-items-center">
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :style="{
            transition: 'transform 200ms ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transformOrigin: 'center',
          }"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="var(--black100)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div
        v-show="isOpen"
        class="overflow-hidden"
      >
        <div class="px-3 pt-3 pb-3 bg-white rounded-bottom-3">
          <span style="color: var(--black100)">{{ description }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.transition-surface {
  transition: background-color 200ms ease, border-color 200ms ease,
    box-shadow 200ms ease;
}

.focus-shadow-none:focus {
  box-shadow: none;
}
.is-open {
  border: 1px solid var(--dark-grey);
  background-color: #fff;
}
.is-closed {
  border: 1px solid var(--grey100);
  background-color: var(--grey);
}
</style>
