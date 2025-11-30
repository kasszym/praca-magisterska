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
    class="section-card"
    :style="{
      padding: padding,
      maxWidth: maxWidth
    }"
  >
    <slot name="content" />
  </div>
</template>
<style scoped>
.section-card {
  background: white;
  border: 1px solid var(--grey);
  border-radius: var(--border-radius);
}
</style>