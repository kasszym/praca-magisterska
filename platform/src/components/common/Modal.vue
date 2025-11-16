<script setup>
import { computed } from "vue";
import TheSeparator from "../common/TheSeparator.vue";

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["update:isOpen"]);

const visible = computed({
  get: () => props.isOpen,
  set: (v) => emit("update:isOpen", v),
});
</script>
<template>
  <el-dialog v-model="visible">
    <template #header
      ><span
        style="color: var(--navy); font-size: var(--fs-l); font-weight: 700"
      >
        {{ header }}
      </span>
    </template>
    <TheSeparator />
    <div class="py-3 px-4">
      <slot name="content" />
    </div>
    <TheSeparator />
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
<style>
.el-dialog {
  --el-dialog-border-radius: none;
  --el-dialog-padding-primary: 0;
  --el-dialog-margin-top: 5vh;
  --el-dialog-width: 1120px;
}
.el-dialog__header {
  padding: 20px 24px;
}
.el-dialog__footer {
  display: block;
  padding: 28px 20px 38px;
}
@media (max-width: 1120px) {
  .el-dialog {
    --el-dialog-width: 100%;
    --el-dialog-margin-top: 0;
  }
}
</style>
