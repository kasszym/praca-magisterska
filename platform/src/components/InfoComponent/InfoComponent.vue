<script setup>
import SingleInfo from "./SingleInfo.vue";
import infoJson from "./info.json";
</script>

<template>
  <div class="d-flex flex-column gap-3">
    <SingleInfo
      v-for="(info, index) in infoJson"
      :key="index"
      :title="info.title"
      :description="info.description"
    />
  </div>
</template>
