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
    class="section-card"
    :style="{ padding: padding }"
  >
    <slot name="content" />
  </div>
</template>
<style scoped>
.section-card {
  border: 1px solid var(--grey);
  border-radius: 8px;
}
</style>
