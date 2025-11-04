<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: "var(--main-color)",
  },
  color: {
    type: String,
    default: "#FFFFFF",
  },
  width: {
    type: String,
    default: "195px",
  },
  height: {
    type: String,
    default: "44px",
  }
});
</script>
<template>
  <el-button
    class="button-component"
    :style="{
      background: backgroundColor,
      color: color,
      width: width,
      height: height
    }"
    >{{ title }}</el-button
  >
</template>
<style scoped>
.button-component {
  border: none;
  border-radius: 12px;
  font-size: var(--fs-xs);
  font-weight: 700;
}
</style>
