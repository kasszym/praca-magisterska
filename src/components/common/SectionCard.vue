<script setup>
const props = defineProps({
  padding: {
    type: String,
    default: "28px",
  },
});
</script>
<template>
  <div
    class="card border bg-white"
    :style="{
      padding: padding,
      borderColor: 'var(--grey)',
      borderRadius: 'var(--border-radius)',
    }"
  >
    <slot name="content" />
  </div>
</template>
