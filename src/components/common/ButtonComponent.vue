<script setup>
import { ref } from "vue";
const emit = defineEmits(["handleClick"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: "var(--main-color)",
  },
  backgroundColorHover: {
    type: String,
    default: "var(--main-hover-color)",
  },
  color: {
    type: String,
    default: "#FFFFFF",
  },
  colorHover: {
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
  },
  fontSize: {
    type: String,
    default: "var(--fs-xs)",
  },
  fontWeight: {
    type: Number,
    default: 700,
  },
  border: {
    type: String,
    default: "none",
  },
  borderHover: {
    type: String,
    default: "none",
  },
});
const isHover = ref(false);
</script>
<template>
  <el-button
    class="button-component"
    :style="{
      background: isHover ? backgroundColorHover : backgroundColor,
      color: isHover ? colorHover : color,
      width: width,
      height: height,
      fontSize: fontSize,
      fontWeight: fontWeight,
      border: isHover ? borderHover : border,
    }"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    @click="emit('handleClick')"
    >{{ title }}</el-button
  >
</template>
<style scoped>
.button-component {
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease;
}
</style>
