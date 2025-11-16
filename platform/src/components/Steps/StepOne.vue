<script setup>
import IntroComponent from "../MainPageComponents/IntroComponent.vue";
import CarRanges from "../CarRange/CarRanges.vue";
import PromoBanner from "../PromoBanner.vue";
import InfoComponent from "../InfoComponent/InfoComponent.vue";
import OutroComponent from "../OutroComponent.vue";
</script>
<template>
  <div class="app-container mx-auto d-flex flex-column gap-4 gap-md-5">
    <IntroComponent />
    <CarRanges />
    <PromoBanner />
    <InfoComponent />
    <OutroComponent />
  </div>
</template>
