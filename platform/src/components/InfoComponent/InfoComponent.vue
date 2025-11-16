<script setup>
import { onMounted } from "vue";
import SingleInfo from "./SingleInfo.vue";
import { useInformations } from "../../composables/informations";
const { isLoadingInformationsList, getInformationsList, informationsList } =
  useInformations();
onMounted(async () => {
  await getInformationsList();
});
</script>

<template>
  <div
    v-loading="isLoadingInformationsList"
    class="d-flex flex-column gap-3"
  >
    <SingleInfo
      v-for="(info, index) in informationsList"
      :key="index"
      :title="info.title"
      :description="info.description"
    />
  </div>
</template>
