<script setup>
const props = defineProps({
  padding: {
    type: String,
    default: "28px",
  },
  maxWidth: {
    type: String,
    default: "100%",
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
      maxWidth: maxWidth
    }"
  >
    <slot name="content" />
  </div>
</template>
